import { Head } from "next/document";
import Image from "next/image";
import React, { useState } from "react";
import { Carousel, Avatar, Badge } from "flowbite-react";
import { BiComment, BiUpvote, BiDownvote } from "react-icons/bi";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { FaShare } from "react-icons/fa";
import { HiClock, HiCode, HiOutlineSave, HiX } from "react-icons/hi";
import Tenor from "react-tenor";
import { MdOutlineGif } from "react-icons/md";
import { AiOutlineClose } from "react-icons/ai";
import { trpc } from "@/utils/trpc";
type PostProps = {
  id: number;
  title: string;
  content: string;
  images: string[];
  anonymous: boolean;
  votes: number;
  published: boolean;
  author: {
    id: string;
    name: string;
    email: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
  };
  categoryId: number;
  createdAt: Date;
  updatedAt: Date;
};

function Post({ post }: { post: any }) {
  console.log(post);
  const postComment = () => {};
  return (
    <>
      <div className="glass-ws flex w-full  flex-col gap-2 p-3 sm:p-5 ">
        <div className="space-y-2 p-2">
          <div className="flex items-center justify-between ">
            <div className=" text-md flex items-center text-sm font-bold sm:gap-2">
              <Avatar
                img={post.author.image}
                rounded={true}
                color="gray"
                className="scale-75 sm:scale-95"
              />
              <a>{post.author.name}</a>
            </div>
            <Badge color={"gray"} icon={HiClock}>
              3 days ago
            </Badge>
          </div>
          <div className="inline-flex w-full items-center justify-between gap-5 text-sm  sm:justify-start">
            <h2>{post.title}</h2>
            <a className="h-min rounded-xl bg-slate-800 px-4 py-0.5  font-semibold text-slate-200 dark:bg-slate-100 dark:text-slate-800 md:py-1">
              CSE
            </a>
          </div>
        </div>
        <div className="h-56 w-auto  sm:h-64 xl:h-80 2xl:h-96">
          <Carousel slideInterval={5000}>
            {post.images.map((img: any, i: any) => (
              <img src={img} alt="image" key={i} />
            ))}
          </Carousel>
        </div>
        <div className="flex w-full items-center justify-between p-2 ">
          <div className="flex  items-center gap-5">
            <div className="inline-flex gap-1 ">
              <button className="text-xl opacity-80 hover:opacity-100 sm:text-2xl">
                {true ? <ImArrowUp className="scale-90" /> : <BiUpvote />}
              </button>
              <a className="text-md  font-semibold ">
                {post.votes}
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
          <p>{post.content}</p>
        </div>
        <div className="overflow-x-scroll">
          <CommentBox postId={post.id} />
          <Comments postId={post.id}></Comments>
        </div>
      </div>
    </>
  );
}

export default Post;

const Comments = ({
  children,
  postId,
  threadId,
}: {
  children?: any;
  postId?: number;
  threadId?: number;
}) => {
  const comments = trpc.post.getComments.useQuery({ postId, threadId });
  if (!comments.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {comments.data.map((comment) => {
        return (
          <div
            key={comment.id}
            className="flex-flex-col min-w-fit  border-l-2 border-gray-900/20 p-5 dark:border-gray-100/20">
            <div className="inline-flex w-full min-w-fit items-center  gap-3">
              <div className="inline-flex items-center gap-2">
                <Avatar
                  img={comment.author.image || undefined}
                  rounded={true}
                  color="gray"
                  className="min-w-fit scale-75 sm:scale-95"
                />
                {comment.author.name}
              </div>
              <Badge
                className="whitespace-nowrap"
                color={"gray"}
                icon={HiClock}>
                3 days ago
              </Badge>
            </div>
            <div className="inline-flex gap-1 ">
              <button className="text-xl opacity-80 hover:opacity-100 sm:text-2xl">
                {true ? <ImArrowUp className="scale-90" /> : <BiUpvote />}
              </button>
              <a className="text-md  font-semibold ">
                {comment.votes}
                <span className="ml-0.5 -mt-2 text-sm font-semibold text-gray-400">
                  votes
                </span>
              </a>
              <button className="text-xl opacity-80 hover:opacity-100 sm:text-2xl">
                {false ? <ImArrowDown className="scale-90" /> : <BiDownvote />}
              </button>
            </div>
            <div className="pb-3 ">
              <div>
                <p>{comment.content}</p>
              </div>
            </div>
            <CommentBox threadId={0} />
            {children}
          </div>
        );
      })}
    </div>
  );
};

const CommentBox = ({
  threadId,
  postId,
}: {
  threadId?: number;
  postId?: number;
}) => {
  const [show, setShow] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [comment, setComment] = useState("");
  const [gif, setGif] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const utils = trpc.useContext();
  const mutation = trpc.post.addComment.useMutation({
    onSuccess: () => {
      setShow(false);
      setComment("");
      setGif("");
      setImages([]);
      utils.post.getComments.invalidate();
    },
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(comment);
    console.log(gif);
    console.log(images);
    mutation.mutate({
      threadId: threadId,
      content: comment,
      postId: postId,
    });
  };

  return (
    <>
      {!show ? (
        <button
          onClick={() => setShow(true)}
          className="my-3 flex items-center gap-1 opacity-80 hover:opacity-100">
          <BiComment className="text-xl sm:text-2xl" />
          <a className="text-md hidden font-semibold sm:block">Add Comment</a>
        </button>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="relative mt-3">
            <button
              onClick={() => setShow(false)}
              className="absolute top-3 right-2 p-2 transition-all hover:scale-110">
              <AiOutlineClose />
            </button>
            <div className="mb-4 w-full rounded-lg border border-gray-200 bg-slate-100/80  dark:border-gray-600 dark:bg-gray-700">
              <div className="rounded-t-lg bg-slate-100/80 px-4 py-2 dark:bg-gray-800">
                <label htmlFor="comment" className="sr-only">
                  Your comment
                </label>
                <textarea
                  id="comment"
                  onChange={(e) => setComment(e.target.value)}
                  value={comment}
                  rows={4}
                  className="w-full border-0 bg-slate-200/50 p-2  text-sm text-gray-900 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                  placeholder="Write a comment..."
                  required></textarea>
              </div>
              <div className="flex items-center justify-between border-t px-3 py-2 dark:border-gray-600">
                <button
                  type="submit"
                  className="hi inline-flex items-center rounded-lg bg-slate-700/60 py-2.5 px-4 text-center text-xs font-medium text-white hover:bg-slate-700 focus:ring-4 focus:ring-slate-200 dark:bg-slate-200 dark:text-slate-700 dark:hover:bg-slate-50 dark:focus:ring-slate-900">
                  Post comment
                </button>

                <div className="flex space-x-1 pl-0 text-xl sm:pl-2">
                  <button
                    type="button"
                    className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg
                      aria-hidden="true"
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        fill-rule="evenodd"
                        d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z"
                        clip-rule="evenodd"></path>
                    </svg>
                    <span className="sr-only">Attach file</span>
                  </button>
                  <button
                    type="button"
                    className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                    <HiCode />
                    <span className="sr-only">Code</span>
                  </button>
                  <button
                    onClick={() => setShowGif(true)}
                    type="button"
                    className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                    <MdOutlineGif className="-m-2 text-4xl" />
                    <span className="sr-only">Upload image</span>
                  </button>
                </div>
              </div>
              {showGif && (
                <div className="flex w-full justify-end gap-2 p-2">
                  <Tenor
                    token="PFOXR5L7C95P"
                    onSelect={(result) => console.log(result)}
                  />

                  <button
                    onClick={() => setShowGif(false)}
                    type="button"
                    className="inline-flex cursor-pointer justify-center rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white">
                    <HiX />
                    <span className="sr-only">Close</span>
                  </button>
                </div>
              )}
            </div>
          </form>
          <p className="ml-auto text-xs text-gray-500 dark:text-gray-400">
            Remember, contributions to this topic should follow our{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500">
              Community Guidelines
            </a>
            .
          </p>
        </>
      )}
    </>
  );
};
