import React from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa";

import Label from "@/components/Label";
import Query from "@/components/Query";

function queries() {
  return (
    <>
      <div className="absolute top-[16vh] left-[17vh] h-[84vh] w-[91vw]">
        <div className="flex h-full w-full flex-row">
          <div className="flex h-full w-4/5 flex-col items-center justify-between gap-5 overflow-y-scroll">
            <Query />
            <Query />
            <Query />
            <Query />
            <Query />
            <Query />
            <div className="fixed bottom-5 right-80 h-[60px] w-[60px] overflow-hidden rounded-full bg-gray-900 hover:bg-gray-700">
              <button className="flex h-full w-full items-center justify-center gap-5">
                <FaPlus className="text-3xl text-white" />
              </button>
            </div>
          </div>
          <div className="flex h-full w-1/5 flex-col items-center justify-between rounded-xl pb-10">
            <div className="flex w-full flex-col items-center justify-center border-b-2 border-gray-300 pt-2 pb-4">
              <h1 className="font-mono text-2xl">Filters</h1>
              <a href="">My Queries</a>
              <a href="">Recent Queries</a>
              <a href="">Most Popular</a>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <h1 className="font-mono text-2xl">Groups</h1>
              <div className="flex w-full flex-row items-center justify-center gap-4">
                <a href="">Faculties</a>
                <a href="">Students</a>
              </div>
            </div>
            <div className="border-t-2 border-b-2 border-gray-300 pt-2 pb-4">
              <h1 className="w-full py-2 text-center font-mono text-2xl">
                Labels
              </h1>
              <div className="flex w-full flex-row flex-wrap items-center justify-center gap-2">
                <Label name="Computer Science" selected={true} />
                <Label name="Mech" selected={true} />
                <Label name="Information Science" selected={false} />
                <Label name="Electronics" selected={true} />
                <Label name="Electrical" selected={false} />
                <Label name="Bio Tech" selected={true} />
                <Label name="Civil" selected={true} />
                <Label name="Incredia" selected={false} />
                <Label name="Events" selected={true} />
                <Label name="Sports" selected={true} />
                <Label name="Placements" selected={false} />
                <Label name="Clubs" selected={true} />
              </div>
            </div>
            <div className="flex w-full flex-col items-center justify-center gap-2">
              <h1 className="w-full py-2 text-center font-mono text-2xl">
                Search By Date
              </h1>
              <form className="flex w-full flex-row items-center justify-center gap-2">
                <input type="date" className="w-2/3 rounded-xl" />
                <button
                  type="submit"
                  className="h-10 w-10 rounded-full bg-gray-900 text-xl text-white hover:bg-gray-700">
                  <FaArrowRight className="w-full text-center" />
                </button>
              </form>
            </div>
            <hr></hr>
          </div>
        </div>
      </div>
    </>
  );
}

export default queries;
