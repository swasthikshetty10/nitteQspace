import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Spinnerr() {
  return (
    <div className="flex h-fit min-h-max w-full items-center justify-center text-4xl">
      <AiOutlineLoading3Quarters className="animate-spin" />
    </div>
  );
}

export default Spinnerr;
