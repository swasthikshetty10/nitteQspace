import Image from "next/image";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiEditAlt } from "react-icons/bi";
import { RiDragDropLine } from "react-icons/ri";

import { trpc } from "@/utils/trpc";

function Profile() {
  const { data: session, status } = useSession();
  const [modal, showModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [status]);

  const user = trpc.user.get.useQuery({ email: session?.user?.email || "" });
  if (!user.data) {
    return <>loading</>;
  }
  return (
    <>
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="glass-wb flex  w-full flex-col overflow-hidden  md:flex-row ">
          <div className="z-20 order-2 -mt-24  flex  flex-col items-center justify-center gap-2 py-5 md:order-1 md:mt-0 md:max-w-sm md:px-10">
            <div className="overflow-hidden rounded-full ">
              <Image
                width={100}
                height={100}
                src={user.data.image || "/images/profile.png"}
                className="transition duration-500 ease-in-out hover:scale-105 "
                alt="Profile Pic"
              />
            </div>
            <div className=" text-center ">
              <h3>{user.data.name}</h3>
              <a className="text-sm">{user.data?.email}</a>
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
              className="absolute top-2 right-2 rounded-full bg-black bg-opacity-50 p-2 text-2xl text-white  hover:bg-opacity-70"
              onClick={() => showModal(true)}>
              <BiEditAlt />
            </button>
          </div>
        </div>
        <div className="glass-wb  w-full p-5  lg:max-w-sm">
          {user.data.bio || (
            <span className="select-none opacity-70">
              You don't have any bio yet! chick on edit profile to update your
              bio
            </span>
          )}
        </div>
      </div>
      <div className="glass-wb flex flex-col items-center justify-center gap-5 p-10 ">
        <h3>You dont have any queries yet!</h3>

        <button className="delay-50 flex w-fit items-center justify-center gap-3 rounded-lg bg-black bg-opacity-5 p-3 text-center text-xl font-semibold backdrop-blur-3xl transition-all duration-200 hover:bg-opacity-10 dark:bg-opacity-30 dark:hover:bg-opacity-40">
          <AiOutlinePlusCircle className="text-2xl" />
          Post Query
        </button>
      </div>
      {modal && <Modal showModal={showModal} data={user.data} />}
    </>
  );
}

export default Profile;

const Modal = ({ showModal, data }: any) => {
  const [loading, setLoading] = useState(false);
  function handleProfileModal() {
    showModal(false);
  }
  const mutation = trpc.user.update.useMutation();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = {
      name: e.target.name.value,
      image: e.target.image.value,
      bio: e.target.bio.value,
    };
    await mutation.mutateAsync(formData);
    setLoading(false);
  };
  return (
    <div className="dark:  fixed -top-4 left-0 z-50 h-screen w-screen  bg-transparent backdrop-blur-md">
      <div className="flex h-full w-full items-center justify-center self-center">
        <form
          onSubmit={handleSubmit}
          className="glass-wb relative m-auto flex h-full w-full flex-col gap-2 bg-slate-300/80 p-10 shadow-2xl transition duration-500 ease-in-out dark:bg-slate-900/70  md:h-fit md:w-2/5">
          <h1 className="text-center font-mono text-lg md:text-xl lg:text-2xl">
            Update Your Profile
          </h1>
          <span
            className="absolute top-5 right-7 cursor-pointer text-2xl md:right-10 md:text-3xl"
            onClick={handleProfileModal}>
            &times;
          </span>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={data.name}
            className="rounded-md border-gray-800 bg-transparent dark:border-gray-500"
          />
          <label htmlFor="bio">Bio:</label>
          <textarea
            name="bio"
            id="bio"
            defaultValue={data.bio}
            className="h-36 resize-none rounded-md bg-transparent "
          />
          <label htmlFor="image">Profile Picture:</label>
          <div className="flex h-14 flex-row items-center justify-center gap-5 rounded-md border border-gray-500">
            <label className="">
              <input type="file" className="hidden" name="image" />
              <span className="cursor-pointer font-semibold underline-offset-2 hover:underline">
                Choose A File
              </span>{" "}
              Or Drop It Here !!
            </label>
          </div>

          <label htmlFor="profilepic">Profile Picture:</label>
          <div className="flex h-32 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-800 bg-transparent dark:border-gray-500  dark:hover:border-gray-700">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <RiDragDropLine className=" text-2xl" />
              <p className="mb-2 text-sm ">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
            </div>
            <input
              id="profilepic"
              name="profilepic"
              type="file"
              className="hidden"
            />
          </div>
          <button className="hover: dark:hover: mt-2 w-2/3 self-center rounded-md border-2 border-gray-800 bg-transparent p-2 font-semibold transition duration-500 ease-in-out hover:bg-gray-800 dark:border-gray-500 dark:hover:bg-gray-300">
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
function useCallBack(arg0: () => Promise<void>): React.EffectCallback {
  throw new Error("Function not implemented.");
}
