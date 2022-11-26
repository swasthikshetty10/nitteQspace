import React, { useState } from "react";
import ToggleLightDark from "./ToggleLightDark";
import Image from "next/image";
import navigations from "./navigations";
import { BiSearchAlt } from "react-icons/bi";
import Link from "next/link";

function NavBar() {
  const [active, setActive] = useState(false);
  return (
    <nav className="bg-transperent group fixed top-0 left-0 z-20 w-full border-b border-gray-200 px-3 py-2.5 backdrop-blur-xl dark:border-gray-600 sm:px-4">
      <div className="container mx-auto flex transform flex-wrap items-center justify-between duration-300 ease-linear">
        <Link legacyBehavior href="/">
          <a href="#" className=" flex items-center">
            <img
              src="/images/logo.png"
              className="mr-1 h-6 transition duration-1000 ease-in-out sm:h-10"
              alt="Nitte QSpace  Logo"
            />
          </a>
        </Link>
        <div className="flex items-center justify-center gap-3 lg:order-2">
          <div className="flex items-center gap-3 rounded-lg bg-black bg-opacity-5 px-3  py-2 dark:bg-opacity-30">
            <input
              className=" bg-transparent text-lg outline-none  "
              placeholder="search"
            />
            <BiSearchAlt className="delay-50 transform cursor-pointer text-xl duration-500 ease-in-out hover:rotate-[360deg] hover:scale-150  " />
          </div>
          <Link
            href="/login"
            className=" delay-50 flex w-full transform items-center justify-center gap-3 rounded-lg bg-black bg-opacity-5 px-3 py-2 text-center  text-lg font-semibold backdrop-blur-3xl duration-200 hover:bg-opacity-10 dark:bg-opacity-30 dark:hover:bg-opacity-40 md:text-xl">
            SignIn
          </Link>

          <ToggleLightDark />
          {/* <button
            onClick={() => {
              setActive(!active);
            }}
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center rounded-lg p-2 text-sm text-slate-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 lg:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            {!active ? (
              <svg
                className="h-6 w-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"></path>
              </svg>
            ) : (
              <ImCross />
            )}
          </button> */}
        </div>
        {/* <div
          className={`${
            active ? "block" : "hidden"
          } w-full items-center justify-between text-center text-lg lg:order-1 lg:flex lg:w-auto`}>
          <ul className="mt-4 flex flex-col rounded-lg border border-sky-300/50 bg-gray-50/50 p-2 backdrop-blur-lg dark:border-gray-700/50 dark:bg-slate-800/50 lg:mt-0 lg:flex-row lg:space-x-8 lg:border-0 lg:bg-transparent lg:text-sm lg:font-medium  lg:dark:bg-transparent">
            {navigations().map((ele: any, idx: any) => (
              <li className="relative" key={idx}>
                <span className="animated-underline block  cursor-pointer rounded py-2   pr-4 pl-3 uppercase tracking-widest text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-slate-200 dark:hover:bg-gray-700 dark:hover:text-white lg:p-0 lg:text-lg lg:after:bg-sky-700 lg:hover:bg-transparent lg:hover:text-sky-700 lg:dark:after:bg-white lg:dark:hover:bg-transparent lg:dark:hover:text-white">
                  {ele.name}
                </span>
              </li>
            ))}
            <li>
              <span className="animated-underline inline-flex w-full cursor-pointer items-center justify-center  gap-1 rounded  py-2 pr-4 pl-3   uppercase tracking-widest  text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-slate-200 dark:hover:bg-gray-700 dark:hover:text-white lg:hidden lg:p-0 lg:text-lg lg:after:bg-sky-700 lg:hover:bg-transparent lg:hover:text-sky-700 lg:dark:after:bg-white lg:dark:hover:bg-transparent lg:dark:hover:text-white">
                Resume
              </span>
            </li>
          </ul>
        </div> */}
      </div>
    </nav>
  );
}
export default NavBar;
