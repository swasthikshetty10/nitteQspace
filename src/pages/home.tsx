import React, { useState } from "react";
import Post from "@/components/Post";
import { Card } from "flowbite-react";
import { trpc } from "@/utils/trpc";
import Spinner from "@/components/Loader/Spinner";
function Home() {
  const [cat, setBranch] = useState<undefined | number>(undefined);
  const posts = trpc.post.getQuery.useQuery({ category: cat });
  const categories = trpc.post.getCategories.useQuery();
  if (!posts.data) return <Spinner />;

  return (
    <>
      <div className="glass-wb flex w-full   max-w-7xl items-start gap-5   overflow-x-hidden p-2 sm:p-5">
        <div className="xs:max-h-[70vh] max-h-[72vh] w-full space-y-14 overflow-y-auto rounded-xl sm:max-h-[70vh] md:max-h-[75vh]">
          {posts.data.length > 0 ? (
            posts.data.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div className="glass-ws space-y-5 p-5 text-center text-3xl">
              <p>No Queries found</p>
              <p className="text-sm">Try changing the filters</p>
            </div>
          )}
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
          <RecentPosts />
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

const RecentPosts = () => {
  return (
    <div className="glass-wb w-full   bg-gray-300/50 p-5  ">
      <div className="flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Recent Queries
        </h5>
        <a
          href="#"
          className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          View all
        </a>
      </div>
      <div className="flow-root ">
        <ul className="max-h-56 w-full  divide-y divide-gray-200 overflow-y-auto  dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://avatars.githubusercontent.com/u/62538932?v=4"
                  alt="Neil image"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Swasthik Shetty
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  2hrs ago
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://avatars.githubusercontent.com/u/62538932?v=4"
                  alt="Neil image"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Vidyesh Kumar
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  5hrs ago
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://avatars.githubusercontent.com/u/62538932?v=4"
                  alt="Neil image"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Swasthik Ashok Shetty
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  yesterday
                </p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://avatars.githubusercontent.com/u/62538932?v=4"
                  alt="Neil image"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                  Swasthik Ashok Shetty
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  yesterday
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
