import * as trpcNext from "@trpc/server/adapters/next";
import { appRouter } from "../../../server/routers/_app";
import { Context } from "../../../server/context";
import prisma from "@/lib/prisma";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: async ({ req, res }) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    const user = await prisma.user.findUnique({
      where: {
        email: session?.user?.email || "",
      },
    });
    if (user && session) {
      session.user = user;
    }
    return {
      session,
      prisma,
    };
  },
});
