import FileDropzone from "@/components/FileUpload";
import { trpc } from "@/utils/trpc";
import {
  Button,
  Carousel,
  Checkbox,
  Label,
  Textarea,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";

function Query() {
  const router = useRouter();
  const [files, setFiles] = useState<any>([]);
  const utils = trpc.useContext();
  const categories = trpc.post.getCategories.useQuery();
  const mutation = trpc.post.addQuery.useMutation({
    onSuccess: (data) => {
      console.log(data);
      utils.post.getQuery.invalidate();
      router.push("/home");
    },
  });
  function handleSubmit(e: any) {
    e.preventDefault();
    const images = files.map((file: any) => file.url);
    const formData = {
      title: e.target.title.value as string,
      content: e.target.query.value as string,
      anonymous: e.target.anonymous.checked as boolean,
      images: images as string[],
      category: Number(e.target.categories.value) as number,
    };
    mutation.mutateAsync(formData);
  }

  return (
    <div className="glass-wb flex w-full justify-center py-10 px-2">
      <form
        onSubmit={handleSubmit}
        className="glass-ws w-full max-w-xl space-y-5 p-5">
        <div id="title">
          <div className="mb-2 block">
            <Label htmlFor="title" value="Query Title" />
          </div>
          <TextInput
            id="title"
            aria-required={true}
            type="text"
            placeholder="Title of your query"
            required={true}
          />
        </div>
        <div id="Category">
          <label
            htmlFor="countries"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            Select an option
          </label>
          <select
            id="categories"
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500">
            <option selected>Choose a Category</option>
            {categories.data?.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {files.length > 0 && (
          <div className="h-32 sm:h-56 xl:h-64 2xl:h-72">
            <Carousel slideInterval={5000}>
              {files.map((file: any) => (
                <img key={file.name} src={file?.url} alt="..." />
              ))}
            </Carousel>
          </div>
        )}
        <div>
          <FileDropzone setFiles={setFiles} files={files} />
        </div>
        <div id="query">
          <div className="mb-2 block">
            <Label htmlFor="query" value="Query content" />
          </div>
          <Textarea
            id="query"
            placeholder="Type your query..."
            aria-required={true}
            required={true}
            rows={3}
          />
        </div>
        <div className="flex items-center gap-1">
          <Checkbox id="anonymous" />
          <Label htmlFor="anonymous" className="flex items-center gap-2">
            Stay stay anonymous{" "}
            <span>
              <Tooltip content="Your identity will be hidden">
                <BsInfoCircleFill className="text-lg text-blue-500" />
              </Tooltip>
            </span>
          </Label>
        </div>
        <Button className="mx-auto w-full" type="submit">
          <div className="min-w-max">Submit</div>
        </Button>
      </form>
    </div>
  );
}

export default Query;
