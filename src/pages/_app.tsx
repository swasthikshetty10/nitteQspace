import { AppProps } from "next/app";
import "@/styles/globals.css";
import "react-tenor/dist/styles.css";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import DarkLightContextProvider from "@/context/darkContext";
import NavBar from "@/components/NavBar";
import SideBar from "@/components/SideBar";
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
              : "bg-gradient-to-br from-sky-100 via-gray-100 to-gray-50   text-gray-800 "
          } relative h-screen w-screen overflow-y-auto overflow-x-hidden px-2 sm:px-5 `}>
          <NavBar />
          <div className=" mt-5 flex  flex-col-reverse  justify-between gap-5 sm:mt-10 md:flex-row">
            <SideBar />
            <div className="mx-auto w-full max-w-7xl space-y-5">
              <Component {...pageProps} dark={dark} setDark={setDark} />
            </div>
          </div>
        </div>
      </DarkLightContextProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
