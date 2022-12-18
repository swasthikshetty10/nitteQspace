import { router, procedure } from "../trpc";
import { z } from "zod";
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "@/server/context";
import { threadId } from "worker_threads";
export const postRouter = router({
  addQuery: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        images: z.array(z.string()).optional(),
        anonymous: z.boolean().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authenticated",
        });
      }
      const post = await ctx.prisma.post.create({
        data: {
          author: {
            connect: {
              email: ctx.session.user?.email || "",
            },
          },
          ...input,
          published: true,
        },
      });
      return post;
    }),
  getQuery: procedure
    .input(z.string().optional())
    .query(async ({ input, ctx }) => {
      const post = await ctx.prisma.post.findMany({
        orderBy: {
          createdAt: "desc",
        },
        where: {
          published: true,
        },
        include: {
          author: true,
        },
      });
      return post;
    }),
  addComment: procedure
    .input(
      z.object({
        postId: z.number().optional(),
        content: z.string(),
        threadId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authenticated",
        });
      }
      if (input.threadId) {
        const comment = await ctx.prisma.thread.create({
          data: {
            author: {
              connect: {
                email: ctx.session.user?.email || "",
              },
            },
            parent: {
              connect: {
                id: input.threadId,
              },
            },
            content: input.content,
            published: true,
          },
        });
        return comment;
      }

      const comment = await ctx.prisma.thread.create({
        data: {
          author: {
            connect: {
              email: ctx.session.user?.email || "",
            },
          },
          Post: {
            connect: {
              id: input.postId || -1,
            },
          },
          content: input.content,
          published: true,
        },
      });
      return comment;
    }),

  getComments: procedure
    .input(
      z.object({
        postId: z.number().optional(),
        threadId: z.number().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      const comments = await ctx.prisma.thread.findMany({
        where: {
          OR: [
            {
              Post: {
                id: input.postId,
              },
            },
            {
              parent: {
                id: input.threadId,
              },
            },
          ],
        },
        include: {
          author: true,
        },
      });
      return comments;
    }),
  addVote: procedure
    .input(
      z.object({
        postId: z.number().optional(),
        threadId: z.number().optional(),
        upVote: z.boolean(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authenticated",
        });
      }
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user?.email || "",
        },
      });
      if (input.postId) {
        const voteExists = await ctx.prisma.vote.findUnique({
          where: {
            postId_userId: {
              postId: input.postId,
              userId: user?.id || "",
            },
          },
        });
        if (voteExists) {
          const vote = await ctx.prisma.vote.update({
            where: {
              postId_userId: {
                postId: input.postId,
                userId: user?.id || "",
              },
            },
            data: {
              upvote: input.upVote,
            },
          });
          return vote;
        } else {
          const vote = await ctx.prisma.vote.create({
            data: {
              user: {
                connect: {
                  email: ctx.session.user?.email || "",
                },
              },
              post: {
                connect: {
                  id: input.postId,
                },
              },
              upvote: input.upVote,
            },
          });
          return vote;
        }
      }
      if (input.threadId) {
        const voteExists = await ctx.prisma.vote.findUnique({
          where: {
            threadId_userId: {
              threadId: input.threadId,
              userId: user?.id || "",
            },
          },
        });
        if (voteExists) {
          const vote = await ctx.prisma.vote.update({
            where: {
              threadId_userId: {
                threadId: input.threadId,
                userId: user?.id || "",
              },
            },
            data: {
              upvote: input.upVote,
            },
          });
          return vote;
        } else {
          const vote = await ctx.prisma.vote.create({
            data: {
              user: {
                connect: {
                  email: ctx.session.user?.email || "",
                },
              },
              thread: {
                connect: {
                  id: input.threadId,
                },
              },
              upvote: input.upVote,
            },
          });
          return vote;
        }
      }
    }),
  unVote: procedure
    .input(
      z.object({
        postId: z.number().optional(),
        threadId: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authenticated",
        });
      }
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user?.email || "",
        },
      });
      if (input.postId) {
        const voteExists = await ctx.prisma.vote.findUnique({
          where: {
            postId_userId: {
              postId: input.postId,
              userId: user?.id || "",
            },
          },
        });
        if (voteExists) {
          const vote = await ctx.prisma.vote.delete({
            where: {
              postId_userId: {
                postId: input.postId,
                userId: user?.id || "",
              },
            },
          });
          return "deleted";
        }
      }
      if (input.threadId) {
        const voteExists = await ctx.prisma.vote.findUnique({
          where: {
            threadId_userId: {
              threadId: input.threadId,
              userId: user?.id || "",
            },
          },
        });
        if (voteExists) {
          const vote = await ctx.prisma.vote.delete({
            where: {
              threadId_userId: {
                threadId: input.threadId,
                userId: user?.id || "",
              },
            },
          });
          return vote;
        }
      }
    }),
  getPostVotes: procedure.input(z.number()).query(async ({ input, ctx }) => {
    const upCount = await ctx.prisma.vote.count({
      where: {
        postId: input,
        upvote: true,
      },
    });

    const downCount = await ctx.prisma.vote.count({
      where: {
        postId: input,
        upvote: false,
      },
    });
    const count = upCount - downCount;
    if (ctx.session) {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: ctx.session.user?.email || "",
        },
      });
      const vote = await ctx.prisma.vote.findUnique({
        where: {
          postId_userId: {
            postId: input,
            userId: user?.id || "",
          },
        },
      });
      if (vote) {
        return { count, vote };
      } else {
        return { count, vote: null };
      }
    }
  }),
  getThreadVotes: procedure.input(z.number()).query(async ({ input, ctx }) => {
    const votes = await ctx.prisma.vote.count({
      where: {
        threadId: input,
      },
    });
    return votes;
  }),
});
