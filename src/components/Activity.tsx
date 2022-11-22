import React from 'react'

import NextImage from '@/components/NextImage'
function Activity() {
  return (
    <>
      <div className="w-full h-20 flex flex-row items-center gap-8 justify-center border-gray-3 rounded-xl border shrink-0">
        <div className="h-16 w-16 overflow-hidden rounded-full">
          <NextImage src="/images/avatar.png" alt="Profile" width="64" height="64" />
        </div>
        <p> Visited Avatar Singh(URL)</p>
      </div>
    </>
  )
}

export default Activity