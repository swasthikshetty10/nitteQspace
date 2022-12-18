import { uploadFile } from "@/utils/fileUpload";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdClear } from "react-icons/md";
import { RiDragDropLine } from "react-icons/ri";
export default function FileDropzone({ files, setFiles }: any) {
  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    const mappedAcc = acceptedFiles.map((file: any) => ({
      file: file,
      errors: [],
    }));
    setFiles((curr: any) => [...curr, ...mappedAcc, ...rejectedFiles]);
  }, []);
  const onDelete = (file: any) => {
    setFiles((curr: any) => curr.filter((fw: any) => fw.file != file));
  };
  const onUpload = (file: any, url: String) => {
    setFiles((curr: any) =>
      curr.map((fw: any) => {
        if (fw.file === file) {
          return { ...fw, url };
        }
        return fw;
      })
    );
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".jpeg,.jpg,.png,.gif" as any,
    maxSize: 5 * 1000 * 1024,
  });

  return (
    <div className="w-full">
      <div
        className="flex h-32  w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-800 bg-transparent dark:border-gray-500  dark:hover:border-gray-700"
        {...getRootProps()}>
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <RiDragDropLine className=" text-2xl" />
          <p className="mb-2 text-sm ">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input {...getInputProps()} />
      </div>
      <div className="">
        {files.map((fileWrapper: any, index: any) => {
          return fileWrapper.errors.length ? (
            <FileErrorHandler
              key={index}
              fileWrapper={fileWrapper}
              onDelete={onDelete}
            />
          ) : (
            <FileUploadWithProgress
              key={index}
              onDelete={onDelete}
              onUpload={onUpload}
              file={fileWrapper.file}
            />
          );
        })}
      </div>
    </div>
  );
}
const FileHandler = ({ file, onDelete, progress }: any) => (
  <div className="py-3">
    <div className="flex justify-between border-b  ">
      <p className="sm:text-md text-sm font-semibold">{file.name}</p>
      <a
        onClick={() => onDelete(file)}
        className="cursor-pointer hover:text-red-500">
        <MdClear />{" "}
      </a>
    </div>
    <div className="h-1 w-full bg-gray-200 ">
      <div
        className={`${progress == 100 ? "bg-green-500" : "bg-blue-500"}  h-1`}
        style={{ width: `${progress}%` }}></div>
    </div>
  </div>
);

const FileErrorHandler = ({ fileWrapper, onDelete }: any) => (
  <div className="py-3">
    <div className="flex justify-between border-b  ">
      <p className="sm:text-md text-sm font-semibold">
        {fileWrapper.file.name}
      </p>
      <a
        onClick={() => onDelete(fileWrapper.file)}
        className="cursor-pointer hover:text-red-500">
        <MdClear />{" "}
      </a>
    </div>
    <div className="h-1 w-full bg-gray-200 ">
      <div className={`h-1  bg-red-500`} style={{ width: `100%` }}></div>
    </div>
    <div className="inline-flex gap-5 overflow-hidden">
      {fileWrapper.errors.map((item: any, idx: any) => (
        <span key={idx} className="text-sm text-red-500 ">
          {item.code}
        </span>
      ))}
    </div>
  </div>
);

export const FileUploadWithProgress = ({ file, onDelete, onUpload }: any) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    async function upload() {
      const url = await uploadFile(file, setProgress);
      onUpload(file, url);
    }
    upload();
  }, []);
  return <FileHandler progress={progress} file={file} onDelete={onDelete} />;
};
