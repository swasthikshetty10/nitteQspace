import { AppProps } from "next/app";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import DarkLightContextProvider from "@/context/darkContext";
import NavBar from "@/components/NavBar";

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
              : "overflow-y-auto overflow-x-hidden bg-gradient-to-br from-sky-100 via-gray-100 to-gray-50   text-gray-800 "
          } h-screen w-screen  px-2 sm:px-5`}>
          <NavBar />
          <Component {...pageProps} dark={dark} setDark={setDark} />
        </div>
      </DarkLightContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
