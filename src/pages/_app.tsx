import { AppProps } from "next/app";
import "@/styles/globals.css";
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
              : "bg-gradient-to-br from-sky-100 via-emerald-50 to-pink-50   text-gray-800 "
          } relative h-screen w-screen space-y-2 overflow-x-hidden overflow-y-hidden px-2 sm:px-5 md:space-y-5 `}>
          <NavBar />
          <div className=" flex h-full  flex-col-reverse justify-between gap-5   md:flex-row ">
            <SideBar />
            <div className="isolate mx-auto h-full w-full max-w-7xl  space-y-5 overflow-y-auto scroll-smooth pb-44 md:pb-0 ">
              <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
                <svg
                  className="relative left-[calc(50%-11rem)] -z-10  h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] opacity-40 dark:opacity-100 sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9089FC" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <Component {...pageProps} dark={dark} setDark={setDark} />
              <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
                <svg
                  className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 opacity-5 dark:opacity-100 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse">
                      <stop stopColor="#9089FC" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </DarkLightContextProvider>
    </SessionProvider>
  );
}

export default trpc.withTRPC(MyApp);
