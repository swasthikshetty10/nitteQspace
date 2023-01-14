import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

import "@/styles/globals.css";

import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";

import DarkLightContextProvider from "@/context/darkContext";

import { trpc } from "../utils/trpc";
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  //  themes
  const [dark, setDark] = useState(true);
  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);
  return (
    <SessionProvider session={session}>
      <DarkLightContextProvider value={[dark, setDark]}>
        <div
          className={`${
            dark
              ? "dark bg-gradient-to-br from-slate-900 via-slate-800 to-gray-700 text-gray-200 "
              : "bg-gradient-to-br from-sky-100 via-emerald-50 to-pink-50   text-gray-800 "
          } relative h-screen w-screen space-y-2 overflow-x-hidden overflow-y-hidden px-2 sm:px-5 md:space-y-5 `}>
          <NavBar />
          <div className=" flex h-full  flex-col-reverse justify-between gap-5   md:flex-row ">
            <SideBar />
            <div className=" mx-auto h-full w-full max-w-7xl  space-y-5 overflow-y-auto scroll-smooth pb-44 pt-5 md:pb-0 ">
              <Component {...pageProps} dark={dark} setDark={setDark} />
            </div>
          </div>
        </div>
      </DarkLightContextProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
