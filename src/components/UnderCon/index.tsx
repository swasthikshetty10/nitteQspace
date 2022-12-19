import Image from "next/image";
import React from "react";

function Construction() {
  return (
    <div className="mx-auto max-w-lg text-center text-3xl">
      <Image
        height={500}
        width={500}
        className=" h-auto w-full"
        src="/images/under-con.svg"
        alt="Construction"
      />
      <div>
        <p className="-mt-10">Under Construction!</p>
        <span className="-mt-10 text-sm">visit some time later</span>
      </div>
    </div>
  );
}

export default Construction;
