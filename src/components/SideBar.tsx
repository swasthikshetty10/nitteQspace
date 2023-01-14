import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiCategory,BiCog, BiHome } from "react-icons/bi";
import { TbBooks } from "react-icons/tb";
function SideBar() {
  const router = useRouter();
  const Icon = React.forwardRef(
    ({ children, onClick, active, href }: any, ref: any) => {
      return (
        <a
          ref={ref}
          href={href}
          onClick={onClick}
          className={`delay-50 sm:h-auto -m-2 cursor-pointer rounded-full p-2 hover:bg-black/10 dark:hover:bg-black/20 ${
            active ? "bg-black bg-opacity-5 dark:bg-opacity-30" : ""
          }`}>
          {children}
        </a>
      );
    }
  );

  return (
    <div className="fixed  bottom-2 left-0   z-50 flex h-fit  w-full  items-center justify-center px-2 sm:px-5  md:sticky md:mb-0  md:h-full md:w-fit  md:px-0 2xl:fixed 2xl:top-0 2xl:left-5 2xl:bottom-0 ">
      <div className="w-full">
        <div className=" glass-wb  flex flex-1 items-center justify-evenly gap-5 p-3 sm:p-5  text-2xl sm:text-4xl   sm:justify-center md:flex-col md:gap-10">
          <Link href="/home" passHref legacyBehavior>
            <Icon active={router.pathname === "/home"}>
              <BiHome />
            </Icon>
          </Link>
          <Link href="/resources" passHref legacyBehavior>
            <Icon active={router.pathname === "/resources"}>
              <TbBooks />
            </Icon>
          </Link>
          <Link href="/query" passHref legacyBehavior>
            <Icon active={router.pathname === "/query"}>
              <AiOutlinePlusCircle />
            </Icon>
          </Link>
          <Link href="/categories" passHref legacyBehavior>
            <Icon active={router.pathname === "/categories"}>
              <BiCategory />
            </Icon>
          </Link>
          <Link href="/profile" passHref legacyBehavior>
            <Icon active={router.pathname === "/profile"}>
              <BiCog />
            </Icon>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
