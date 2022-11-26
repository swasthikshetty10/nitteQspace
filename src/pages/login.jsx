import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineMail } from 'react-icons/ai';
import { signIn } from "next-auth/react"
function Login() {
  const [email, setEmail] = useState('');
  useEffect(() => {
  })
  return (
    <div className='flex justify-center items-center h-[100vh] w-[100vw] p-5 bg-gradient-to-t dark:bg-gradient-to-br from-gray-300 to-gray-50 dark:from-slate-900 dark:to-slate-600 '>
      <div className='p-5 space-y-4 w-full max-w-md text-center shadow-lg rounded-lg text-gray-800 dark:text-gray-200 bg-gray-200 dark:bg-slate-800 bg-opacity-20 backdrop-blur-xl'>
        <h2 className="font-bold ">Login/Register</h2>
        <button onClick={() => signIn("google")} className='bg-black bg-opacity-30 hover:bg-opacity-40 transition-all delay-50 duration-200 backdrop-blur-3xl rounded-lg flex font-semibold justify-center items-center gap-3 text-2xl p-3 text-center w-full'>
          <FcGoogle /> <span>Google</span>
        </button>
        <div className='text-gray-400/50 gap-2 flex items-center justify-center w-full'>
          <div className='h-[2px] w-full bg-gray-400/50'>

          </div>
          or
          <div className='h-[2px] w-full bg-gray-400/50'>

          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <input onChange={(e) => { setEmail(e.target.value) }} className=' bg-black bg-opacity-30 hover:bg-opacity-40 backdrop-blur-3xl  rounded-xl bg p-3 w-full outline-none text-xl ' placeholder='xyz@nmamit.in' />
          <button onClick={() => signIn("email", { email, callbackUrl: `${window.location.origin}/profile` })} className=' bg-black bg-opacity-30 hover:bg-opacity-40 transition-all delay-50 duration-200 backdrop-blur-3xl rounded-lg flex font-semibold justify-center items-center gap-3 text-xl p-3 text-center w-full'>
            <AiOutlineMail />Sign In with Email</button>
        </div>

      </div>

    </div >
  )
}

export default Login