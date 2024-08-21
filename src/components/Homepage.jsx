import React from 'react'
import { Button } from './ui/button'

function Homepage() {
  return (
    <div className='bg-slate-900'>
      {/* Navbar */}
      <nav className='flex justify-between items-center px-16 py-6'>
        <div className='flex items-center gap-2'>
          <img src="/logo.png" alt="War Of Devs Logo" className='h-8 w-8' />
          <a href="#" className='text-gray-100 text-[16px] font-bold'>War Of Devs</a>
          <a href="#" className='text-gray-300 text-[16px] ml-6 md:ml-16'>Pricing</a>
          <a href="#" className='text-gray-300 text-[16px] ml-4'>Leaderboard</a>
        </div>
          <button className="btn btn-neutral btn-sm rounded-xl font-bold">Sign in</button>
      </nav>
      
      {/* Main Content */}
      <div className='min-h-screen w-full md:flex justify-center items-center space-y-5 gap-10'>
        <div className='border-[12px] border-black rounded-[40px] w-[280px] h-[500px]'></div>
        <div className='flex flex-col space-y-3'>
          <h1 className='text-4xl'><span className='text-red-500 text-6xl'>Battle</span> with your friends</h1>
          <h1 className='text-4xl'>Showcase your <span className='text-orange-500 text-6xl'>hardwork</span></h1>
          <div className='py-12 flex gap-6'>
            <button className='btn btn-neutral rounded-xl font-bold'>Leaderboard 🏆</button>
            <button className='btn bg-orange-400 hover:bg-orange-500 duration-500 text-orange-950 font-bold rounded-xl btn-active'>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
