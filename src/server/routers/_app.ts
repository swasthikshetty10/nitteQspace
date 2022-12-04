import { z } from "zod";
import { procedure, router } from "../trpc";
import prisma from "@/lib/prisma";
export const appRouter = router({
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
      const data = await prisma.user.findMany();

      return {
        msg: `hi from server  ${input.hello} ${input.num}`,
        data: data,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
