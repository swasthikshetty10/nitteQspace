import { router, procedure } from "../trpc";
import { z } from "zod";
import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "@/server/context";
export const userRouter = router({
  update: procedure
    .input(
      z.object({
        name: z.string().optional(),
        email: z.string().optional(),
        image: z.string().optional(),
        bio: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (!ctx.session) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Not authenticated",
        });
      }
      const user = await ctx.prisma.user.update({
        where: {
          email: ctx.session.user?.email || "",
        },
        data: input,
      });
      return user;
    }),
  get: procedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      console.log(input);
      const data = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      return data;
    }),
});
