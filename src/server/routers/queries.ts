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
  addVote: procedure.input(z.number()).mutation(async ({ input, ctx }) => {
    if (!ctx.session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "Not authenticated",
      });
    }
  }),
});
