import React, { useContext, useState } from "react";
import ToggleLightDark from "./ToggleLightDark";
import Image from "next/image";
import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { DarkLightContext } from "../../context/darkContext";
import { Avatar } from "flowbite-react";

function NavBar() {
  const [dark, setDark] = useContext(DarkLightContext);
  const { data: session, status } = useSession();
  return (
    <nav className="glass-wb group  sticky top-2 left-0  right-0  z-20 mx-auto w-full max-w-7xl  px-3 py-2.5  sm:px-4 lg:top-5">
      <div className="container mx-auto flex transform flex-nowrap items-center justify-between gap-3 duration-300 ease-linear">
        <Link legacyBehavior href="/">
          <a href="#" className="-ml-3 flex w-fit items-center">
            {dark ? (
              <Image
                width={500}
                height={100}
                src="/logo-dark.png"
                className="h-12 w-auto transition duration-1000 ease-in-out sm:h-16 "
                alt="Nitte QSpace dark  Logo"
              />
            ) : (
              <Image
                width={500}
                height={200}
                src="/logo-light.png"
                className="h-12 w-auto transition duration-1000 ease-in-out sm:h-16 "
                alt="Nitte QSpace light  Logo"
              />
            )}
          </a>
        </Link>
        <div className="flex items-center justify-center gap-2 sm:gap-3 lg:order-2">
          <div className="flex items-center gap-3 rounded-lg bg-black bg-opacity-5 p-3 dark:bg-opacity-30  sm:px-3 sm:py-2">
            <input
              className="hidden w-full bg-transparent text-lg outline-none sm:block   "
              placeholder="search"
            />
            <BiSearchAlt className="delay-50 transform cursor-pointer text-xl duration-500 ease-in-out hover:rotate-[360deg] hover:scale-150  " />
          </div>
          {status === "authenticated" && session.user ? (
            <Link href="profile">
              <Avatar
                className="min-w-fit gap-0"
                img={session.user.image ? session.user.image : ""}
                size="md"
                rounded={true}
                bordered={false}
              />
            </Link>
          ) : (
            <Link
              href="login"
              className=" delay-50 flex  transform items-center justify-center gap-3 rounded-lg bg-black bg-opacity-5 px-3 py-2 text-center  text-lg font-semibold backdrop-blur-3xl duration-200 hover:bg-opacity-10 dark:bg-opacity-30 dark:hover:bg-opacity-40 md:text-xl">
              SignIn
            </Link>
          )}
          <ToggleLightDark />
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
