import { AppProps } from "next/app";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
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
    <div className={dark ? "dark" : ""}>
      <Component {...pageProps} dark={dark} setDark={setDark} />
    </div>
  );
}

export default MyApp;
