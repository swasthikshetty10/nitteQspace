import { Head } from "next/document";
import Image from "next/image";
import React, { useState } from "react";
import { Carousel, Avatar, Badge } from "flowbite-react";
import { BiComment, BiUpvote, BiDownvote } from "react-icons/bi";
import { BsReply } from "react-icons/bs";
import { ImArrowDown, ImArrowUp } from "react-icons/im";
import { FaShare } from "react-icons/fa";
import { HiClock, HiCode, HiOutlineSave, HiX } from "react-icons/hi";
import { MdOutlineGif } from "react-icons/md";
import { trpc } from "@/utils/trpc";
import { getDateAgoString, getTimeInAMPM } from "@/utils/dateTime";
import { TbRoute } from "react-icons/tb";
import {
  Post as PostBaseType,
  Category as CatType,
  User as AuthorType,
} from "@prisma/client";
export interface PostType extends PostBaseType {
  author: AuthorType;
  category: CatType;
  _count: {
    Thread: number;
  };
}

function Post({ post }: { post: any }) {
  const [comments, showComments] = useState(false);
  return (
    <>
      <div className="glass-ws xs:p-3 flex  w-full flex-col gap-2 p-2 sm:p-5 ">
        <div className="space-y-2 p-2">
          <div className="flex flex-wrap items-center justify-between gap-1 ">
            <div className="text-md flex items-center  justify-start whitespace-nowrap text-sm font-bold sm:gap-2">
              <Avatar
                img={
                  post.anonymous
                    ? "/images/avatar.png"
                    : post.author?.image || undefined
                }
                rounded={true}
                color="gray"
                className="-ml-1 scale-75 sm:scale-95"
              />
              <a>{post.anonymous ? "Anonymous" : post.author.name}</a>
            </div>
            <Badge
              color={"gray"}
              className="whitespace-nowrap px-1 text-xs sm:px-2 "
              icon={HiClock}>
              {getDateAgoString(post.createdAt.toString())}{" "}
              {getTimeInAMPM(new Date(post.createdAt))}
            </Badge>
          </div>
          <div className="inline-flex w-full items-center justify-between gap-5 text-sm">
            <h3>{post.title}</h3>
            <a className="h-min rounded-md  bg-slate-800 px-3 py-0.5 text-xs  font-semibold text-slate-200 dark:bg-slate-100 dark:text-slate-800 ">
              {post.category?.name}
            </a>
          </div>
        </div>
        {Array.isArray(post.images) && post.images.length > 0 && (
          <div className="h-56 w-auto  sm:h-64 xl:h-80 2xl:h-96">
            <Carousel className="" slideInterval={5000}>
              {post.images?.map((img: any, i: any) => (
                <Image
                  height={1000}
                  width={1000}
                  className="h-full w-full object-contain"
                  src={img}
                  alt="image"
                  key={i}
                />
              ))}
            </Carousel>
          </div>
        )}
        <div className="p-2">
          <p>{post.content}</p>
        </div>
        <div className="flex w-full items-center justify-between p-2 ">
          <div className="flex  items-center gap-5">
            <PostVotes postId={post.id} />
            <button
              onClick={() => showComments((c) => !c)}
              className="flex items-center gap-1 opacity-80 hover:opacity-100">
              <BiComment className="text-xl sm:text-2xl" />
              <a className="text-md hidden font-semibold sm:block">Comments</a>
              <a className="text-sm font-semibold text-gray-400">
                {post._count.Thread}
              </a>
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
        {comments && (
          <div className="overflow-x-clip">
            <CommentBox postId={post.id} />
            <Comments postId={post.id}></Comments>
          </div>
        )}
      </div>
    </>
  );
}

const PostVotes = ({ postId }: { postId: number }) => {
  const votes = trpc.post.getPostVotes.useQuery(postId);
  const utils = trpc.useContext();
  const upVote = trpc.post.addVote.useMutation({
    onSuccess: () => {
      utils.post.getPostVotes.invalidate(postId);
    },
  });
  const unVote = trpc.post.unVote.useMutation({
    onSuccess: () => {
      utils.post.getPostVotes.invalidate(postId);
    },
  });
  const handleUpvote = () => {
    if (votes.data?.vote && votes.data?.vote?.upvote) {
      unVote.mutate({ postId: postId });
      utils.post.getPostVotes.setData(postId, (prev) => {
        if (prev) {
          return {
            vote: null,
            count: prev?.count - 1,
          };
        }
      });
      return;
    }
    upVote.mutate({ postId: postId, upVote: true });
    if (votes.data) {
      utils.post.getPostVotes.setData(postId, (prev: any) => {
        if (prev !== undefined) {
          return {
            vote: { ...prev?.vote, upvote: true },
            count: prev?.count + 1,
          };
        }
        return prev;
      });
    }
  };
  const handleDownvote = () => {
    if (votes.data?.vote && !votes.data?.vote?.upvote) {
      unVote.mutate({ postId: postId });
      utils.post.getPostVotes.setData(postId, (prev) => {
        if (prev) {
          return {
            vote: null,
            count: prev?.count + 1,
          };
        }
      });
      return;
    }
    upVote.mutate({ postId: postId, upVote: false });
    if (votes.data) {
      utils.post.getPostVotes.setData(postId, (prev: any) => {
        if (prev) {
          return {
            vote: { ...prev?.vote, upvote: false },
            count: prev?.count - 1,
          };
        }
      });
    }
  };
  return (
    <div className="inline-flex gap-1 ">
      <button
        onClick={handleUpvote}
        className="text-xl opacity-80 hover:opacity-100 sm:text-2xl">
        {votes.data?.vote && votes.data?.vote?.upvote ? (
          <ImArrowUp className="scale-90" />
        ) : (
          <BiUpvote />
        )}
      </button>
      <a className="text-md  font-semibold ">
        <span className="ml-0.5 -mt-2 text-sm font-semibold text-gray-400">
          {votes.data ? votes.data.count : "-"}
        </span>
      </a>
      <button
        onClick={handleDownvote}
        className="text-xl opacity-80 hover:opacity-100 sm:text-2xl">
        {votes.data?.vote && !votes.data?.vote?.upvote ? (
          <ImArrowDown className="scale-90" />
        ) : (
          <BiDownvote />
        )}
      </button>
    </div>
  );
};
const ThreadVotes = ({ threadId }: { threadId: number }) => {
  const votes = trpc.post.getThreadVotes.useQuery(threadId);
  const utils = trpc.useContext();
  const upVote = trpc.post.addVote.useMutation({
    onSuccess: () => {
      utils.post.getThreadVotes.invalidate(threadId);
    },
  });
  const unVote = trpc.post.unVote.useMutation({
    onSuccess: () => {
      utils.post.getThreadVotes.invalidate(threadId);
    },
  });
  const handleUpvote = () => {
    if (votes.data?.vote && votes.data?.vote?.upvote) {
      unVote.mutate({ threadId: threadId });
      utils.post.getThreadVotes.setData(threadId, (prev) => {
        if (prev) {
          return {
            vote: null,
            count: prev?.count - 1,
          };
        }
      });
      return;
    }
    upVote.mutate({ threadId: threadId, upVote: true });
    if (votes.data) {
      utils.post.getThreadVotes.setData(threadId, (prev: any) => {
        if (prev) {
          return {
            vote: { ...prev?.vote, upvote: TbRoute },
            count: prev?.count + 1,
          };
        }
      });
    }
  };
  const handleDownvote = () => {
    if (votes.data?.vote && !votes.data?.vote?.upvote) {
      unVote.mutate({ threadId: threadId });
      utils.post.getThreadVotes.setData(threadId, (prev) => {
        if (prev) {
          return {
            vote: null,
            count: prev?.count + 1,
          };
        }
      });

      return;
    }
    upVote.mutate({ threadId: threadId, upVote: false });
    if (votes.data) {
      utils.post.getThreadVotes.setData(threadId, (prev: any) => {
        if (prev) {
          return {
            vote: { ...prev?.vote, upvote: false },
            count: prev?.count - 1,
          };
        }
      });
    }
  };
  return (
    <div className="inline-flex gap-1 ">
      <button
        onClick={handleUpvote}
        className="text-xl opacity-80 hover:opacity-100 sm:text-2xl">
        {votes.data?.vote && votes.data?.vote?.upvote ? (
          <ImArrowUp className="scale-90" />
        ) : (
          <BiUpvote />
        )}
      </button>
      <a className="text-md  font-semibold ">
        <span className="ml-0.5 -mt-2 text-sm font-semibold text-gray-400">
          {votes.data ? votes.data.count : "-"}
        </span>
      </a>
      <button
        onClick={handleDownvote}
        className="text-xl opacity-80 hover:opacity-100 sm:text-2xl">
        {votes.data?.vote && !votes.data?.vote?.upvote ? (
          <ImArrowDown className="scale-90" />
        ) : (
          <BiDownvote />
        )}
      </button>
    </div>
  );
};

export default Post;

const Comments = ({
  postId,
  threadId,
}: {
  postId?: number;
  threadId?: number;
}) => {
  const comments = trpc.post.getComments.useQuery({ postId, threadId });
  const [show, showComments] = useState(true);
  const [showBox, setShowBox] = useState(false);
  if (!comments.data) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      {comments.data.map((comment) => {
        return (
          <div key={comment.id} className="flex-flex-col   gap-2 p-5 pr-0 pb-0">
            <div className="-ml-3 inline-flex items-center gap-2">
              <Image
                height={30}
                width={30}
                src={comment.author.image || "/images/user.png"}
                alt={comment.author.name || "user"}
                className="h-6 w-auto   rounded-full sm:h-7 "
              />
              <div className=" inline-flex w-full  flex-wrap items-center  text-sm  font-semibold">
                <a className="pr-2">{comment.author.name}</a>
                <a className="whitespace-nowrap  text-xs font-semibold opacity-75 ">
                  {getDateAgoString(comment.createdAt)}{" "}
                  {getTimeInAMPM(new Date(comment.createdAt))}
                </a>
              </div>
            </div>
            <div className="border-l-[1.5px]  border-gray-900/20 pl-4  dark:border-gray-100/20">
              <div className="">
                <div>
                  <p>{comment.content}</p>
                </div>
                <div className="flex items-center gap-2">
                  <ThreadVotes threadId={comment.id} />
                  <button
                    onClick={() => setShowBox((s) => !s)}
                    className="my-3 flex items-center gap-1  opacity-80 transition-opacity hover:opacity-100">
                    <BsReply className="text-xl sm:text-2xl" />
                    <a className="hidden text-sm font-semibold sm:block">
                      Reply
                    </a>
                  </button>
                </div>
                <button
                  onClick={() => showComments((c) => !c)}
                  className="hidden  items-center gap-1 opacity-80 hover:opacity-100">
                  <BiComment className="text-xl sm:text-2xl" />
                  <a className="text-md hidden font-semibold sm:block">
                    Comments
                  </a>
                  <a className="text-sm font-semibold text-gray-400"></a>
                </button>
              </div>
              <div className="-ml-4">
                {show && (
                  <>
                    {showBox && (
                      <CommentBox
                        setShowBox={setShowBox}
                        threadId={comment.id}
                      />
                    )}
                    <Comments threadId={comment.id} />
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CommentBox = ({
  threadId,
  postId,
  setShowBox,
}: {
  threadId?: number;
  postId?: number;
  setShowBox?: (show: boolean) => void;
}) => {
  const [showGif, setShowGif] = useState(false);
  const [comment, setComment] = useState("");
  const [gif, setGif] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const utils = trpc.useContext();
  const mutation = trpc.post.addComment.useMutation({
    onSuccess: () => {
      setShowBox && setShowBox(false);
      setComment("");
      setGif("");
      setImages([]);
      utils.post.getComments.invalidate();
    },
  });
  const handleSubmit = (e: any) => {
    e.preventDefault();
    mutation.mutate({
      threadId: threadId,
      content: comment,
      postId: postId,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative mt-3">
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
              {/* <Tenor
                token="PFOXR5L7C95P"
                onSelect={(result) => console.log(result)}
              /> */}

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
  );
};
