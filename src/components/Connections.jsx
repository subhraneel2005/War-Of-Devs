import React from 'react'
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";

function Connections() {
  return (
    <div className='w-[80%] min-h-screen flex justify-center items-center overflow-y-auto ml-[20%]'>

        <div className="flex flex-col justify-center items-center py-6 px-12 space-y-6">
         <h2 className='text-[24px] font-bold text-gray-100 text-center mb-8'>Share your details 😏</h2> 

         <input type="text" placeholder="Your Name" className="input input-bordered w-full input-sm max-w-xs" />  
         <input type="text" placeholder="Where do you live?" className="input input-bordered w-full input-sm max-w-xs" /> 
         <input type="text" placeholder="Your Resume link (optional)" className="input input-bordered w-full input-sm max-w-xs" />  
         <textarea className="textarea textarea-bordered w-full max-w-xs" placeholder="Bio"></textarea>
        </div>

        <div  className="flex flex-col justify-center items-center py-6 px-12 space-y-6">
        <p className='text-zinc-300 text-center pt-6'>Add Connections</p>
         
         <div className='grid grid-cols-2 w-full gap-6'>
         <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border bg-zinc-700 hover:bg-zinc-800 duration-500 border-gray-300 flex justify-center items-center'>Github <IoLogoGithub size={15} /></div>
         <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border bg-sky-700 hover:bg-sky-800 duration-500 border-gray-300 flex justify-center items-center'>LinkedIn <FaLinkedin size={15} /></div>
         <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border bg-black border-gray-300 flex justify-center items-center'>Twitter <FaXTwitter size={15} /></div>
         <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border border-gray-300 flex justify-center items-center bg-pink-700 hover:bg-pink-800 duration-500'>Instagram<FaInstagram size={15} /></div>
         <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border border-gray-300 flex justify-center items-center bg-red-700 hover:bg-red-800 duration-500'>Youtube<IoLogoYoutube size={15} /></div>
         <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border border-gray-300 flex justify-center items-center bg-orange-700 hover:bg-orange-800 duration-500'>ProductHunt<FaProductHunt size={15} /></div>
         </div>
         
        </div>

    </div>
  )
}

export default Connections