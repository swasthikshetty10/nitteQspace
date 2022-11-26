import React from 'react'

import Activity from '@/components/Activity'
import Navbar from '@/components/Navbar'
import NextImage from '@/components/NextImage'
import SugCard from '@/components/SugCard'
function profile() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="absolute top-[18vh] left-[19vh] w-[90vw] h-[80vh]">
        <div className="flex flex-row gap-3 w-full h-full">
          <div className="flex flex-col items-center justify-center gap-2 w-2/3">
            <div className="flex relative flex-row items-start justify-start group transition-all ease-out bg-white rounded-2xl h-2/3 w-full overflow-hidden shadow-black hover:shadow-xl duration-500 ease-in-out ">
              <div className='w-1/4 h-full overflow-hidden group-hover:shadow-2xl'>
                <NextImage src="/images/cardbg.jpg" alt="ProfileBG" width="600" height="800" className="hover:scale-110 duration-1000 ease-out" />
              </div>
              <div className="my-auto flex w-52 h-52 -translate-x-32 rounded-full overflow-hidden border-white border-8 ring-black ring-4">
                <NextImage src="/images/avatar.png" alt="ProfileBG" width="208" height="208" className="self-center hover:scale-110 transition duration-1000 ease-in-out" />
              </div>
              <div className="">

              </div>
            </div>
            <div className="h-1/2 w-full">
              <h1 className='text-2xl font-mono'>Suggestions</h1>
              <div className='flex flex-row items-center justify-between gap-2.5 h-3/4 overflow-x-auto'>
                <SugCard profileName="Vidyesh" avatarImg="/images/avatar.png" />
                <SugCard profileName="Swasthik" avatarImg="/images/avatar.png" />
                <SugCard profileName="Vidyesh" avatarImg="/images/avatar.png" />
                <SugCard profileName="Swasthik" avatarImg="/images/avatar.png" />
                <SugCard profileName="Vidyesh" avatarImg="/images/avatar.png" />
                <SugCard profileName="Swasthik" avatarImg="/images/avatar.png" />
                <SugCard profileName="Vidyesh" avatarImg="/images/avatar.png" />
                <SugCard profileName="Swasthik" avatarImg="/images/avatar.png" />
                <SugCard profileName="Swasthik" avatarImg="/images/avatar.png" />
              </div>
            </div>
          </div>
          <div className="w-1/3 h-full border-2 border-black rounded-2xl p-3">
            <h1 className="font-mono text-3xl text-center mb-5">Recent Activity</h1>
            {/* Type Profile Visit */}
            <div className='flex flex-col items-center justify-between gap-5 overflow-y-auto h-5/6'>
              <Activity />
              <Activity />
              <Activity />
              <Activity />
              <Activity />
              <Activity />
              <Activity />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default profile