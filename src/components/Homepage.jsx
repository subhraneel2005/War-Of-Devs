'use client'

import React from 'react'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { useSession, signIn, signOut} from 'next-auth/react'
import { useEffect } from 'react'

function Homepage() {

  const router = useRouter();
  const session = useSession();

  const user = session?.data?.user;

  const logOut = () => {
    signOut();
  }

  const handler = () => {
    if(!user){
      router.push('/api/auth/signin')
    }
    else{
      router.push('/dashboard')
    }
  }

  return (
    <div className=''>
      {/* Navbar */}
      <nav className='flex justify-between items-center px-16 py-6'>
        <div className='flex items-center gap-2'>
          <img src="/logo.png" alt="War Of Devs Logo" className='h-8 w-8' />
          <a href="#" className=' text-[16px] font-bold'>War Of Devs</a>
          <a href="/leaderboard" className=' text-[16px] ml-4'>Leaderboard</a>
        </div>
          {user? <button className="btn btn-neutral btn-sm rounded-xl font-bold" onClick={() => signOut()}>Sign out</button> : <button className="btn btn-neutral btn-sm rounded-xl font-bold" onClick={() => signIn()}>Sign in</button>}
      </nav>
      
      {/* Main Content */}
      <div className='min-h-screen w-full md:flex justify-center items-center space-y-5 gap-10'>
        <div className='border-[12px] border-black rounded-[40px] w-[280px] h-[500px]'></div>
        <div className='flex flex-col'>
          <h1 className='text-4xl'><span className='text-red-500 text-6xl'>Battle</span> with your friends</h1>
          <h1 className='text-4xl'>Showcase your <span className='text-orange-500 text-6xl'>hardwork</span></h1>
          <p className=' text-[16px] mt-10'>Upvote fellow devs. Participate in weekly battles and showcase your best projects.</p>
          <p className=' text-[16px]'>Let recruiters reach out to you</p>
          <div className='py-12 flex gap-6'>
            <button className='btn btn-neutral rounded-xl font-bold' onClick={() => router.push('/leaderboard')}>Leaderboard 🏆</button>
            <button className='btn bg-orange-400 hover:bg-orange-500 duration-500 text-orange-950 font-bold rounded-xl btn-active' onClick={handler}>Get Started</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage
