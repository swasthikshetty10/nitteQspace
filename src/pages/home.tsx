import { Head } from "next/document";
import Image from "next/image";
import React from "react";
import { Carousel, Avatar, Badge } from "flowbite-react";
import { BiComment, BiUpvote, BiDownvote } from "react-icons/bi";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { FaShare } from "react-icons/fa";
import { HiCheck, HiClock, HiOutlineSave } from "react-icons/hi";
import Post from "@/components/Post";
function Home() {
  return (
    <>
      <div className="glass-wb   w-full max-w-7xl  space-y-14 overflow-y-auto p-5">
        <div className="xs:max-h-[70vh] max-h-[72vh] max-w-4xl space-y-14 sm:max-h-[70vh] md:max-h-[75vh]">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </div>
    </>
  );
}

export default Home;
