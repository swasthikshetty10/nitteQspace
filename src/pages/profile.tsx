import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { BiEditAlt } from "react-icons/bi";

function Profile() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [status]);
  if (status === "loading") {
    return <h1>loading</h1>;
  }
  function handleProfileModal() {
    if (document.getElementById("profileModal")?.classList.contains("hidden"))
      document.getElementById("profileModal")?.classList.remove("hidden")
    else
      document.getElementById("profileModal")?.classList.add("hidden")
  }
  function handleDrop(e: any) {
    console.log(e.target);
  }
  if (status === "authenticated" && session.user) {
    return (
      <>
        <div className="absolute hidden top-0 left-0 bg-transparent backdrop-blur-lg w-screen h-full z-50" id="profileModal">
          <div className="flex items-center justify-center w-full h-full self-center">
            <form className="m-auto relative flex flex-col gap-2 h-full md:h-fit w-full md:w-2/5 glass-wb hover:scale-105 transition duration-500 ease-in-out p-10">
              <h1 className="text-white text-lg md:text-xl lg:text-2xl text-center font-mono">Update Your Profile</h1>
              <span className="absolute top-5 md:text-3xl text-2xl right-7 md:right-10 cursor-pointer" onClick={handleProfileModal}>&times;</span>
              <label htmlFor="uname">Username:</label>
              <input type="text" name="uname" id="uname" className="bg-transparent text-white rounded-md" />
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" id="name" className="bg-transparent text-white rounded-md" />
              <label htmlFor="email">Email:</label>
              <input type="email" name="email" id="email" className="bg-transparent text-white rounded-md" />
              <label htmlFor="bio">Bio:</label>
              <textarea name="bio" id="bio" className="bg-transparent text-white rounded-md h-36 resize-none" />
              <label htmlFor="profilepic">Profile Picture:</label>
              <div className="flex flex-row items-center justify-center gap-5 h-14 border border-gray-500 rounded-md">
                <label className="text-white">
                  <input type="file" className="hidden" name="profilepic" />
                  <span className="cursor-pointer hover:underline underline-offset-2 font-semibold">Choose A File</span> Or Drop It Here !!
                </label>
              </div>
              <button className="bg-transparent text-white border-2 border-white rounded-md p-2 hover:bg-gray-300 hover:text-black transition duration-500 ease-in-out w-2/3 self-center">Save</button>
            </form>
          </div>
        </div >
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
                    signOut({
                      callbackUrl: `${window.location.origin}/login`,
                      redirect: false,
                    })
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
              <button className="absolute top-2 right-2 rounded-full bg-black bg-opacity-50 p-2 text-2xl text-white hover:bg-opacity-70" onClick={handleProfileModal}>
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
        <div className="flex flex-col gap-5 lg:flex-row">
        </div>
      </>
    );
  }
}

export default Profile;
