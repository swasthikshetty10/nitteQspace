import Link from 'next/link';
import React from 'react'

import NextImage from '@/components/NextImage'


interface SugCardProps {
  avatarImg: string;
  profileName: string;
}

function SugCard({ avatarImg, profileName }: SugCardProps) {
  return (
    <>
      <div className="relative flex flex-col items-center justify-center h-[75%] w-[24%] rounded-xl shrink-0 overflow-hidden group shadow-black hover:shadow-2xl hover:scale-105 transition ease-in-out">
        <NextImage src="/images/cardbg.jpg" alt="Profile" width="800" height="800" className="group-hover:scale-95 transition-all duration-1000 ease-in-out" />
        <div className="absolute h-20 w-20 overflow-hidden self-center rounded-full ring-4 ring-white -translate-y-4">
          <NextImage src={avatarImg} alt="Profile" width="80" height="80" />
        </div>
        <p className='absolute self-center translate-y-12'><Link href="https://www.google.com" className='font-mono text-xl text-black bg-white rounded-xl border-white px-2 ring-2 ring-gray-600 opacity-70'>{profileName}</Link></p>

      </div>
    </>
  )
}

export default SugCard