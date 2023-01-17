import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import Spinner from "@/components/Loader/Spinner";
import Post from "@/components/Post";

import { trpc } from "@/utils/trpc";

function Home() {
  const [cat, setBranch] = useState<undefined | number>(undefined);
  const posts = trpc.post.getQuery.useInfiniteQuery(
    { category: cat, limit: 4 },
    { getNextPageParam: (lastPage) => lastPage.nextCursor }
  );
  const categories = trpc.post.getCategories.useQuery();
  const { data: session, status } = useSession();
  const router = useRouter();
  const postContainer = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (status === "loading") {
      return;
    }
    if (!session?.user) {
      router.push("/login");
    }
  }, [router, session, status]);

  useEffect(() => {
    if (postContainer.current) {
      postContainer.current.scrollTo(0, 0);
    }
  }, [cat]);
  useEffect(() => {
    if (!postContainer.current) return;

    const handleScroll = () => {
      if (!postContainer.current) return;
      if (
        postContainer.current.scrollTop +
          postContainer.current.clientHeight +
          10 >=
        postContainer.current.scrollHeight
      ) {
        posts.fetchNextPage();
      }
    };
    const container = postContainer.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [postContainer, posts]);

  if (!posts.data || !session) return <Spinner />;

  return (
    <>
      <div className="glass-wb flex w-full   max-w-7xl items-start gap-5   overflow-x-hidden p-2 sm:p-5">
        <div
          ref={postContainer}
          className="xs:max-h-[70vh] h-full w-full space-y-14 overflow-y-auto  rounded-xl sm:max-h-[70vh] md:max-h-[75vh] md:pr-1.5 lg:max-h-[80vh]">
          {posts.data?.pages.map((page) => {
            return (
              page.post.map((post) => <Post key={post.id} post={post} />) ?? (
                <div className="glass-ws space-y-5 p-5 text-center text-3xl">
                  <p>No Queries found</p>
                  <p className="text-sm">Try changing the filters</p>
                </div>
              )
            );
          })}
          {posts.isFetchingNextPage && <Spinner />}
        </div>
        <div className=" glass-ws  xs:h-[70vh] hidden h-[72vh]  w-full min-w-[20vw] max-w-[20vw] flex-col items-center justify-center space-y-5  overflow-y-hidden p-5 sm:h-[70vh]  md:h-[75vh] lg:block">
          <div className="space-y-2  pb-5 font-semibold">
            <a>Resources</a>
            <div className="flex w-full flex-wrap gap-2 ">
              {categories.data &&
                categories.data.map((category) => {
                  if (category.type === "RESOURCES") {
                    return (
                      <Badge
                        onClick={() => {
                          if (category.id == cat) {
                            setBranch(undefined);
                            return;
                          }
                          setBranch(category.id);
                        }}
                        selected={cat == category.id}
                        key={category.id}>
                        {category.name}
                      </Badge>
                    );
                  }
                })}
            </div>
          </div>
          <div className="space-y-2 font-semibold">
            <a>Branches</a>
            <div className="flex w-full flex-wrap gap-2 ">
              {categories.data &&
                categories.data?.map((category) => {
                  if (category.type === "BRANCH") {
                    return (
                      <Badge
                        onClick={() => {
                          if (category.id == cat) {
                            setBranch(undefined);
                            return;
                          }
                          setBranch(category.id);
                        }}
                        selected={cat == category.id}
                        key={category.id}>
                        {category.name}
                      </Badge>
                    );
                  }
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

const Badge = ({ selected, onClick, children, className }: any) => {
  return (
    <div
      onClick={onClick}
      className={
        `bg w-fit cursor-pointer rounded-md ${
          selected
            ? "bg-gray-100 dark:bg-slate-700"
            : "bg-gray-300 dark:bg-gray-900"
        }  px-3 py-1 text-sm font-semibold hover:bg-gray-900 hover:text-gray-300  dark:hover:bg-gray-300 dark:hover:text-gray-900 ` +
        className
      }>
      {children}
    </div>
  );
};
