import { z } from "zod";
import { procedure, router } from "../trpc";
import { Context } from "../context";
import { TRPCError, initTRPC } from "@trpc/server";
import { userRouter } from "@/server/routers/user";
export const t = initTRPC.context<Context>().create();
export const appRouter = router({
  user: userRouter,
  hello: procedure
    .input(
      z.object({
        text: z.string(),
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input.text}`,
      };
    }),
  test: procedure
    .input(
      z.object({
        num: z.number().optional().default(5),
        hello: z.string(),
      })
    )
    .query(async ({ input }) => {
      return {
        msg: `hi from server  ${input.hello} ${input.num}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
