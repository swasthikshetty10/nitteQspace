import { AppProps } from "next/app";
import "@/styles/globals.css";
import { useEffect, useState } from "react";
import { SessionProvider } from "next-auth/react";
import DarkLightContextProvider from "@/context/darkContext";
import NavBar from "@/components/NavBar";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  //  themes
  const [dark, setDark] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("dark") === "true") {
      setDark(true);
    } else {
      setDark(false);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("dark", dark.toString());
  }, [dark]);
  return (
    <SessionProvider session={session}>
      <DarkLightContextProvider value={[dark, setDark]}>
        <div className={dark ? "dark  text-gray-200" : "text-gray-800"}>
          <NavBar />
          <Component {...pageProps} dark={dark} setDark={setDark} />
        </div>
      </DarkLightContextProvider>
    </SessionProvider>
  );
}

export default MyApp;
