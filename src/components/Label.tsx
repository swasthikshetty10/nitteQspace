import React from 'react'
interface LabelProps {
  name: string;
  selected: boolean;
}
function Label({ name, selected }: LabelProps) {
  return (
    <>
      {!selected && <div className='w-fit px-3 rounded-full h-6 bg-gray-300 flex items-center justify-center hover:bg-gray-200 ease-in-out transition-all text-sm' >
        {name}
      </div>}
      {selected && <div className='w-fit px-3 rounded-full h-6 bg-slate-800 text-white flex items-center justify-center hover:bg-slate-600 ease-in-out transition-all text-sm' >
        {name}
      </div>}
    </>
  )
}

export default Label