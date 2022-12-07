import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { trpc } from "@/utils/trpc";

function Profile() {
  const { data: session, status } = useSession();
  const [modal, showModal] = useState(false);
  const [data, setData] = useState<any>();
  const router = useRouter();
  const data_ = trpc.user.get.useQuery({ email: session?.user?.email || "" });
  useEffect(() => {
    console.log(data_.data);
    setData(data_.data);
  }, [data_]);
  console.log(data_);
  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [status]);
  if (status === "loading") {
    return <h1>loading</h1>;
  }

  function handleDrop(e: any) {
    console.log(e.target);
  }
  if (status === "authenticated" && session.user) {
    console.log(session.user);
    return (
      <>
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
              <button
                className="absolute top-2 right-2 rounded-full bg-black bg-opacity-50 p-2 text-2xl text-white hover:bg-opacity-70"
                onClick={() => showModal(true)}>
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
        <div className="glass-wb flex flex-col items-center justify-center gap-5 p-10 ">
          <h3>You dont have any queries yet!</h3>

          <button className="delay-50 flex w-fit items-center justify-center gap-3 rounded-lg bg-black bg-opacity-5 p-3 text-center text-xl font-semibold backdrop-blur-3xl transition-all duration-200 hover:bg-opacity-10 dark:bg-opacity-30 dark:hover:bg-opacity-40">
            <AiOutlinePlusCircle className="text-2xl" />
            Post Query
          </button>
        </div>
        {modal && <Modal showModal={showModal} />}
      </>
    );
  }
}

export default Profile;

const Modal = ({ showModal }: any) => {
  function handleProfileModal() {
    showModal(false);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = {
      name: e.target.name.value,
      profilepic: e.target.profilepic.value,
      bio: e.target.bio.value,
    };
  };
  return (
    <div className="fixed  -top-4 left-0 z-50 h-screen w-screen bg-transparent backdrop-blur-lg">
      <div className="flex h-full w-full items-center justify-center self-center">
        <form
          onSubmit={handleSubmit}
          className="glass-wb relative m-auto flex h-full w-full flex-col gap-2 p-10 transition duration-500 ease-in-out  md:h-fit md:w-2/5">
          <h1 className="text-center font-mono text-lg text-white md:text-xl lg:text-2xl">
            Update Your Profile
          </h1>
          <span
            className="absolute top-5 right-7 cursor-pointer text-2xl md:right-10 md:text-3xl"
            onClick={handleProfileModal}>
            &times;
          </span>
          <label htmlFor="uname">Username:</label>
          <input
            type="text"
            name="uname"
            id="uname"
            className="rounded-md bg-transparent text-white"
          />
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            className="rounded-md bg-transparent text-white"
          />
          <label htmlFor="bio">Bio:</label>
          <textarea
            name="bio"
            id="bio"
            className="h-36 resize-none rounded-md bg-transparent text-white"
          />
          <label htmlFor="profilepic">Profile Picture:</label>
          <div className="flex h-14 flex-row items-center justify-center gap-5 rounded-md border border-gray-500">
            <label className="text-white">
              <input type="file" className="hidden" name="profilepic" />
              <span className="cursor-pointer font-semibold underline-offset-2 hover:underline">
                Choose A File
              </span>{" "}
              Or Drop It Here !!
            </label>
          </div>
          <button className="mt-2 w-2/3 self-center rounded-md border-2 border-white bg-transparent p-2 text-white transition duration-500 ease-in-out hover:bg-gray-300 hover:text-black">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
