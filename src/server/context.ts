import * as trpc from "@trpc/server";
import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import prisma from "@/lib/prisma";
export async function createContext({
  req,
  res,
}: trpcNext.CreateNextContextOptions) {
  const session = await unstable_getServerSession(req, res, authOptions);

  return {
    session,
    prisma,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
