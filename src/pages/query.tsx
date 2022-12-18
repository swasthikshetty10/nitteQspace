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
import React, { useState } from "react";
import { BsInfoCircleFill } from "react-icons/bs";

function Query() {
  const [files, setFiles] = useState<any>([]);
  const utils = trpc.useContext();
  const mutation = trpc.post.addQuery.useMutation({
    onSuccess: (data) => {
      console.log(data);
      utils.post.getQuery.invalidate();
    },
  });
  function handleSubmit(e: any) {
    e.preventDefault();
    console.log(e.target.title.value);
    console.log(e.target.query.value);
    console.log(e.target.anonymous.checked);
    console.log(files);
    const images = files.map((file: any) => file.url);
    const formData = {
      title: e.target.title.value as string,
      content: e.target.query.value as string,
      anonymous: e.target.anonymous.checked as boolean,
      images: images as string[],
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
            rows={4}
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
