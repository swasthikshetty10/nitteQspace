import React from 'react'
import {BsQuestionCircle} from 'react-icons/bs'
import {CgProfile} from 'react-icons/cg'
import {MdOutlineFolderShared} from 'react-icons/md'
import {RiMessengerLine} from 'react-icons/ri'
import { RiLogoutCircleRLine } from 'react-icons/ri'
interface SideIconProps
{ iconType: string;
}
function SideIcon({iconType}:SideIconProps) {
  let icon;
  let url="/"
  switch(iconType){
    case 'Resources':icon=<MdOutlineFolderShared className="text-5xl" />
                     url+="resources"
                     break;
    case 'Messages': icon=<RiMessengerLine className="text-5xl" />
                     url+="messages"
                     break;
    case 'Queries':  icon=<BsQuestionCircle className="text-5xl" />
                     url+="queries"
                     break;
    case 'Profile':  icon=<CgProfile className="text-5xl" />
                     url+="profile"
                     break;
    case 'Logout':  icon=<RiLogoutCircleRLine className="text-5xl" />
                    break;
  }
  return (
    <>
    <a href={url} className="text-black hover:text-gray-500 hover:underline-offset-2">
      <button className="flex flex-col items-center justify-center">
      {icon}
      <p className="transition-all ease-in-out duration-500  w-0 overflow-hidden group-hover:w-full text-lg font-mono">{iconType}</p>
      </button>
    </a>
    </>
  )
}

export default SideIcon