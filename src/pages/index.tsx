import { Carousel } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";

import Seo from "@/components/Seo";

export default function HomePage() {
  return (
    <>
      <Seo />
      <main className=" flex flex-col  justify-center  gap-10 overflow-y-auto p-5">
        <div className="mx-auto flex  w-full max-w-screen-xl flex-col items-center justify-evenly gap-10 lg:flex-row lg:gap-5">
          <div className="max-w-xl space-y-3  text-center">
            <h1 className="mb-4 flex w-full  items-start justify-center gap-2 text-center  text-4xl font-extrabold text-gray-900 dark:text-white md:text-6xl lg:justify-start lg:text-left  lg:text-7xl">
              <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                NitteQ
              </span>{" "}
              <span className="mr-2 ml-2 rounded bg-blue-100 px-2.5 py-0.5 text-xl font-semibold text-blue-800 dark:bg-blue-200 dark:text-blue-800 sm:text-2xl">
                Space
              </span>
            </h1>
            <h2 className="spacing-x-2 text-md text-center font-semibold sm:text-xl lg:text-left lg:text-2xl">
              Collaborate, learn, and grow with your peers!
            </h2>
            <p className="inline-flex items-center gap-2  text-center text-sm opacity-80 lg:text-left lg:text-lg">
              <span>
                Welcome to the Student Community website! We are a group of
                students who are passionate about learning and growing together.
                Our goal is to provide a space where students can connect with
                each other, share knowledge, and stay informed about events and
                activities on campus.
              </span>
            </p>
            <div className="w-full lg:text-left">
              <Link
                href="/login"
                className="group inline-flex items-center   font-medium text-blue-600 hover:underline dark:text-blue-500 ">
                Register Now
                <svg
                  aria-hidden="true"
                  className="delay-50 ml-1 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
          <Image
            className="float-ease-in-out delay-50 select-none transition-transform duration-500 ease-in-out hover:scale-105 "
            src="/images/hero1.svg"
            alt="Hero"
            width={500}
            height={500}
          />
        </div>
        <div className="mx-auto flex   w-full max-w-screen-xl flex-col items-center justify-evenly gap-10 lg:flex-row-reverse lg:gap-5">
          <div className="max-w-xl space-y-3  text-center">
            <h2 className="spacing-x-2 text-md text-center font-semibold sm:text-xl lg:text-left lg:text-2xl">
              Navigate your studies with confidence
            </h2>
            <p className="inline-flex items-center gap-2  text-center text-sm opacity-80 lg:text-left lg:text-lg">
              <span>
                On our website, you will find a variety of resources and tools
                to help you succeed in your studies. Whether you are looking for
                study tips, help with a specific subject, or just want to
                connect with other students, you will find something here that
                can help.
              </span>
            </p>
            <div className="w-full lg:text-left">
              <Link
                href="/login"
                className="group inline-flex items-center   font-medium text-blue-600 hover:underline dark:text-blue-500 ">
                Checkout resources
                <svg
                  aria-hidden="true"
                  className="delay-50 ml-1 h-5 w-5 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
          <Image
            className="float-ease-in-out delay-50 select-none transition-transform duration-500 ease-in-out hover:scale-105 "
            src="/images/hero2.svg"
            alt="Hero"
            width={500}
            height={500}
          />
        </div>
        <div className="  mx-auto h-[34rem] w-full  max-w-5xl sm:h-[30rem] md:h-96 lg:h-80  ">
          <Carousel className="h-full gap-5 ">
            <div className="px-2.5">
              <div className="glass-ws    items-center justify-center space-y-5 p-10 text-center ">
                <h3>
                  <q>Ask questions and seek help</q>
                </h3>
                <p>
                  Need some advice or have a specific question about a subject?
                  Our question and answer forum is here to help. You can ask
                  your peers and mentors for guidance, or even ask anonymously
                  if you prefer. Our community is here to support you and help
                  you succeed in your studies.
                </p>
              </div>
            </div>
            <div className="px-2.5">
              <div className="glass-ws     items-center justify-center space-y-5 p-10 text-center ">
                <h3>
                  <q>Stay informed about events</q>
                </h3>
                <p>
                  There is always something going on at the Student Community.
                  Our event section showcases a variety of exciting events and
                  activities conducted by clubs on campus. From guest lectures
                  and study groups to social events, there is something for
                  everyone. Take a look at our event section to discover what's
                  coming up and find clubs and activities that interest you. We
                  look forward to seeing you at one of the events soon!
                </p>
              </div>
            </div>
            <div className="px-2.5">
              <div className="glass-ws  items-center justify-center space-y-5 p-10 text-center ">
                <h3>
                  <q>Share study materials</q>
                </h3>
                <p>
                  Have you created your own study guides, found helpful
                  resources online, or just want to share notes from a recent
                  class? Our material sharing platform makes it easy to share
                  knowledge and collaborate with others. Simply upload your
                  materials and share them with the community. We believe that
                  by working together and sharing what we know, we can all learn
                  and grow together
                </p>
              </div>
            </div>
          </Carousel>
        </div>
        <div className="flex w-full max-w-screen-xl flex-col items-center justify-center gap-10"></div>
      </main>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      title: "Home",
    },
  };
}
