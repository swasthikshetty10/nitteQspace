import { Head } from "next/document";
import Image from "next/image";
import React from "react";
import { Carousel, Avatar, Badge } from "flowbite-react";
import { BiComment, BiUpvote, BiDownvote } from "react-icons/bi";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { FaShare } from "react-icons/fa";
import { HiCheck, HiClock, HiOutlineSave } from "react-icons/hi";

function Post() {
  return (
    <>
      <div className="glass-ws flex w-full  flex-col gap-2 p-3 sm:p-5 ">
        <div className="space-y-2 p-2">
          <div className="flex items-center justify-between ">
            <div className=" text-md flex items-center text-sm font-bold sm:gap-2">
              <Avatar
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded={true}
                color="gray"
                className="scale-75 sm:scale-95"
              />
              <a>Swasthik</a>
            </div>
            <Badge color={"gray"} icon={HiClock}>
              3 days ago
            </Badge>
          </div>
          <div className="inline-flex w-full items-center justify-between gap-5 text-sm  sm:justify-start">
            <h2>Lol! This is a card</h2>
            <a className="h-min rounded-xl bg-slate-800 px-4 py-0.5  font-semibold text-slate-200 dark:bg-slate-100 dark:text-slate-800 md:py-1">
              CSE
            </a>
          </div>
        </div>
        <div className="h-56 w-auto  sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={5000}>
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="..."
            />
          </Carousel>
        </div>
        <div className="flex w-full items-center justify-between p-2 ">
          <div className="flex  items-center gap-5">
            <div className="inline-flex gap-1 ">
              <button className="text-xl opacity-80 hover:opacity-100 sm:text-2xl">
                {true ? <ImArrowUp className="scale-90" /> : <BiUpvote />}
              </button>
              <a className="text-md  font-semibold ">
                1.2k
                <span className="ml-0.5 -mt-2 text-sm font-semibold text-gray-400">
                  votes
                </span>
              </a>
              <button className="text-xl opacity-80 hover:opacity-100 sm:text-2xl">
                {false ? <ImArrowDown className="scale-90" /> : <BiDownvote />}
              </button>
            </div>
            <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
              <BiComment className="text-xl sm:text-2xl" />
              <a className="text-md hidden font-semibold sm:block">Comments</a>
              <a className="text-sm font-semibold text-gray-400">3</a>
            </button>
          </div>

          <div className="flex  items-center gap-3 sm:gap-5">
            <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
              <FaShare className="text-xl sm:text-2xl" />
              <a className="text-md hidden font-semibold sm:block">Share</a>
            </button>
            <button className="flex items-center gap-1 opacity-80 hover:opacity-100">
              <HiOutlineSave className="text-xl sm:text-2xl" />
              <a className="text-md hidden font-semibold sm:block">Save</a>
            </button>
          </div>
        </div>
        <div className="p-2">
          <p>
            lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            tincidunt, nisl nec ultricies lacinia, nisl nunc aliquam nisl, nec
            lacinia nisl nunc vel nisl. Nullam tincidunt, nisl nec ultricies
          </p>
        </div>
      </div>
    </>
  );
}

export default Post;
