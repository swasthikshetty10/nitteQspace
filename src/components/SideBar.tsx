import React from "react";
import { BiHome, BiCog, BiCategory } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { TbBooks } from "react-icons/tb";
function SideBar() {
  return (
    <div className="fixed bottom-0 left-0 z-50 mb-2 flex h-fit   w-full items-center justify-center px-2 md:relative md:mb-0  md:h-full md:w-fit  md:px-0 2xl:fixed 2xl:top-0 2xl:left-5 2xl:bottom-0   ">
      <div className=" glass-wb flex flex-1 items-center justify-evenly gap-5 p-5 text-4xl   sm:justify-center md:flex-col md:gap-10">
        <div>
          <BiHome />
        </div>
        <div>
          <TbBooks />
        </div>
        <div>
          <AiOutlinePlusCircle />
        </div>
        <div>
          <BiCategory />
        </div>
        <div>
          <BiCog />
        </div>
      </div>
    </div>
  );
}

export default SideBar;
