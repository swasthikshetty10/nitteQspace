import { initTRPC, TRPCError } from "@trpc/server";
import { threadId } from "worker_threads";
import { optional, z } from "zod";

import { Context } from "@/server/context";

import { procedure, router } from "../trpc";

export const postRouter = router({
  addQuery: procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        images: z.array(z.string()).optional(),
        anonymous: z.boolean().optional(),
        category: z.number().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authenticated",
        });
      }
      return await ctx.prisma.post.create({
        data: {
          author: {
            connect: {
              email: ctx.session.user?.email || "",
            },
          },
          category: {
            connect: {
              id: input?.category || 1,
            },
          },
          title: input.title,
          content: input.content,
          images: input.images,
          anonymous: input.anonymous,
          published: true,
        },
      });
    }),
  getQuery: procedure
    .input(
      z.object({
        email: z.string().optional(),
        category: z.number().optional(),
        limit: z.number().min(1).max(100).nullish(),
        cursor: z.number().nullish(),
      })
    )
    .query(async ({ input, ctx }) => {
      const limit = input.limit ?? 10;
      const { cursor } = input;
      if (input?.email) {
        const post = await ctx.prisma.post.findMany({
          where: {
            published: true,
            author: {
              email: input.email,
            },
            categoryId: input.category,
          },
          include: {
            author: true,
            category: true,
            _count: {
              select: {
                Thread: true,
              },
            },
          },

          take: limit,
          skip: cursor ? 1 : 0,
          cursor: cursor ? { id: cursor } : undefined,
          orderBy: {
            createdAt: "desc",
          },
        });
        let nextCursor: typeof cursor | undefined = undefined;
        if (post.length > limit) {
          const nextItem = post.pop();
          nextCursor = nextItem?.id;
        }

        return { post, nextCursor };
      }
      const post = await ctx.prisma.post.findMany({
        where: {
          published: true,
          categoryId: input?.category,
        },
        include: {
          author: true,
          category: true,
          _count: {
            select: {
              Thread: true,
            },
          },
        },
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
      });
      let nextCursor: typeof cursor | undefined = undefined;
      if (post.length > limit) {
        const nextItem = post.pop();
        nextCursor = nextItem?.id;
      }

      return { post, nextCursor };
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
      }
    }
    return { count, vote: null };
  }),
  getThreadVotes: procedure.input(z.number()).query(async ({ input, ctx }) => {
    const upCount = await ctx.prisma.vote.count({
      where: {
        threadId: input,
        upvote: true,
      },
    });

    const downCount = await ctx.prisma.vote.count({
      where: {
        threadId: input,
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
          threadId_userId: {
            threadId: input,
            userId: user?.id || "",
          },
        },
      });
      if (vote) {
        return { count, vote };
      }
    }
    return { count, vote: null };
  }),
  getCategories: procedure.query(async ({ ctx }) => {
    const category = await ctx.prisma.category.findMany();
    return category;
  }),
});
