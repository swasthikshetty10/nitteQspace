import React from 'react'
import {FaSearch} from 'react-icons/fa'

import NextImage from '@/components/NextImage'
import SideIcon from '@/components/SideIcon'
function Navbar() {
  return (
    <>
    <div className="h-[15vh] bg-white overflow-hidden w-screen flex items-center justify-between px-10 border-b-2 border-b-black">
        <NextImage src="/images/logo.png" alt="Logo" width="300" height="300"/>
        <div className='flex gap-2 items-center justify-center'>
          <FaSearch className="text-black text-2xl my-2 skew-y-[180deg]" />
          <input type="search" placeholder="Enter Key Word..." className="h-[5vh] w-[40vh] bg-white rounded-full border-black border-4 shadow-none outline-none" />
        </div>
      </div>
      <div className="w-[10vh] hover:w-[15vh] hover:px-5 group transition-all ease-in-out duration-500 delay-75 bg-white border-r-black border-r-2 h-[85vh]"> 
        <div className="flex flex-col items-center justify-around h-full py-10">
          <SideIcon iconType='Resources'/>
          <SideIcon iconType='Messages'/>
          <SideIcon iconType='Queries'/>
          <SideIcon iconType='Profile'/>
          <SideIcon iconType='Logout'/>
        </div>
      </div>
      </>
  )
}

export default Navbar