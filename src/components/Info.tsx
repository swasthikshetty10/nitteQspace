import React from 'react'

interface InfoProps
{ attrName: string;
  val: string;
}
function Info({attrName,val}:InfoProps) {
  return (
    <>
      <div className="flex flex-row gap-3 w-full h-10">
        <h4 className='font-mono text-2xl w-1/2'>{attrName}:</h4>
        <p className='font-mono text-2xl w-1/2'>{val}</p>
      </div>
    </>
  )
}

export default Info