import { profile } from "console";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { BiEditAlt } from "react-icons/bi";
import { signOut } from "next-auth/react";

function Profile() {
  const { data: session, status } = useSession();
  if (status !== "authenticated") {
    return <h1>loading</h1>;
  }
  if (session.user) {
    return (
      <div className="mx-auto mt-5 max-w-7xl space-y-5 sm:mt-10">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="glass-wb flex  w-full flex-col overflow-hidden  md:flex-row ">
            <div className="z-20 order-2 -mt-24  flex  flex-col items-center justify-center gap-2 py-5 md:order-1 md:mt-0 md:max-w-sm md:px-10">
              <div className="overflow-hidden rounded-full ">
                <Image
                  width={100}
                  height={100}
                  src={
                    session.user.image
                      ? `${session.user.image}?height=1000&width=1000`
                      : ""
                  }
                  className="transition duration-500 ease-in-out hover:scale-105 "
                  alt="Profile Pic"
                />
              </div>
              <div className=" text-center ">
                <h3>
                  {session.user.name ? session.user.name : session.user.email}
                </h3>
                <a className="text-sm">
                  {session.user.email ? session.user.email : session.user.name}
                </a>
                <button
                  onClick={() =>
                    signOut({ callbackUrl: `${window.location.origin}/login` })
                  }
                  className="delay-50 mx-auto mt-4 flex w-fit transform items-center justify-center gap-3 rounded-lg bg-black bg-opacity-5 px-3 py-2 text-center  text-lg font-semibold backdrop-blur-3xl duration-200 hover:bg-opacity-10 dark:bg-opacity-30 dark:hover:bg-opacity-40 md:text-xl">
                  SignOut
                </button>
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
          <div className="glass-wb  w-full p-5  lg:max-w-sm">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
            repellat a quo neque, consequuntur quod enim recusandae ducimus
            sapiente ratione magni veritatis doloribus facere laboriosam natus
            commodi, aperiam eum animi.
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:flex-row"></div>
      </div>
    );
  }
}

export default Profile;
