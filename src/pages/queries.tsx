import React from 'react'
import { FaArrowRight, FaPlus } from 'react-icons/fa'

import Label from '@/components/Label'
import Navbar from '@/components/Navbar'
import Query from '@/components/Query'

function queries() {
  return (
    <>
      <Navbar />
      <div className="absolute top-[16vh] left-[17vh] h-[84vh] w-[91vw]">
        <div className="w-full h-full flex flex-row">
          <div className="flex flex-col gap-5 w-4/5 h-full overflow-y-scroll justify-between items-center">
            <Query />
            <Query />
            <Query />
            <Query />
            <Query />
            <Query />
            <div className="fixed bottom-5 right-80 w-[60px] h-[60px] rounded-full bg-gray-900 hover:bg-gray-700 overflow-hidden">
              <button className="flex w-full h-full gap-5 justify-center items-center">
                <FaPlus className='text-3xl text-white' />
              </button>
            </div>
          </div>
          <div className="w-1/5 h-full rounded-xl flex flex-col items-center justify-between pb-10">
            <div className="border-b-2 pt-2 pb-4 border-gray-300 flex flex-col items-center justify-center w-full">
              <h1 className='text-2xl font-mono'>Filters</h1>
              <a href=''>My Queries</a>
              <a href=''>Recent Queries</a>
              <a href=''>Most Popular</a>
            </div>
            <div className='flex flex-col items-center justify-center w-full gap-2'>
              <h1 className='text-2xl font-mono'>Groups</h1>
              <div className="flex flex-row gap-4 items-center justify-center w-full">
                <a href=''>Faculties</a>
                <a href=''>Students</a>
              </div>
            </div>
            <div className="border-t-2 border-b-2 pt-2 pb-4 border-gray-300">
              <h1 className='text-2xl font-mono w-full text-center py-2'>Labels</h1>
              <div className='flex flex-row w-full flex-wrap items-center justify-center gap-2'>
                <Label name='Computer Science' selected={true} />
                <Label name='Mech' selected={true} />
                <Label name='Information Science' selected={false} />
                <Label name='Electronics' selected={true} />
                <Label name='Electrical' selected={false} />
                <Label name='Bio Tech' selected={true} />
                <Label name='Civil' selected={true} />
                <Label name='Incredia' selected={false} />
                <Label name='Events' selected={true} />
                <Label name='Sports' selected={true} />
                <Label name='Placements' selected={false} />
                <Label name='Clubs' selected={true} />
              </div>
            </div>
            <div className='flex flex-col items-center justify-center w-full gap-2'>
              <h1 className='text-2xl font-mono w-full text-center py-2'>Search By Date</h1>
              <form className="w-full flex flex-row items-center justify-center gap-2">
                <input type='date' className='rounded-xl w-2/3' />
                <button type='submit' className='rounded-full w-10 h-10 bg-gray-900 hover:bg-gray-700 text-xl text-white'><FaArrowRight className='w-full text-center' /></button>
              </form>


            </div>
            <hr></hr>
          </div>
        </div>
      </div>
    </>
  )
}

export default queries