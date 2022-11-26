import { profile } from "console";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { BiEditAlt } from "react-icons/bi";

function Profile() {
  const { data: session, status } = useSession();
  if (status !== "authenticated" && session === null) {
    return <h1>loading</h1>;
  } else if (session.user) {
    return (
      <div className="mx-auto mt-5 max-w-7xl sm:mt-10">
        <div>
          <div className="glass-wb flex  w-fit max-w-4xl flex-col overflow-hidden  md:flex-row ">
            <div className="z-20 order-2  -mt-20 flex flex-col items-center justify-center gap-2 py-5 md:order-1 md:mt-0 md:px-10">
              <Image
                width={100}
                height={100}
                src={
                  session.user.image
                    ? `${session.user.image}?height=1000&width=1000`
                    : ""
                }
                className="rounded-full"
                alt="Profile Pic"
              />
              <div className="text-center">
                <h3>
                  {session.user.name ? session.user.name : session.user.email}
                </h3>
                <a className="text-sm">
                  {session.user.email ? session.user.email : session.user.name}
                </a>
              </div>
            </div>
            <div className="relative order-1 h-fit w-auto md:order-2 ">
              <Image
                width={1000}
                height={1000}
                src="/images/cardbg.jpg"
                alt="Thumbnail"
                className="  hover:-z-1 z-0 h-full  w-full -translate-y-5 object-cover transition duration-500 ease-in-out hover:scale-105 md:translate-y-0 md:hover:translate-x-5"
              />
              <button className="absolute top-2 right-2 rounded-full bg-black bg-opacity-50 p-2 text-2xl text-white hover:bg-opacity-70">
                <BiEditAlt />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
