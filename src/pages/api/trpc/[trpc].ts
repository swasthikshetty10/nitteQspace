import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";
import { Context } from "../../../server/context";
import prisma from "@/lib/prisma";
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({
    session: null,
    prisma,
  }),
});
