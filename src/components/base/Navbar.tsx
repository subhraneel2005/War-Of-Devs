'use client'
import React, { useState } from 'react'
import { LogOut, MoonIcon, SunIcon, User2 } from "lucide-react"
import { useTheme } from "next-themes"
import { Toggle } from "@/components/ui/toggle"
import { cn } from '@/lib/utils'
import { Button, buttonVariants } from '@/components/ui/button'
import { FaGithub, FaUser } from 'react-icons/fa'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Loader from '@/commons/Loader'

export default function Navbar() {

    const { setTheme } = useTheme()
    const [isDark, setisDark] = useState(false);
    const session = useSession();
    const user = session.data?.user;

    const themeToggle = () => {
        setisDark(!isDark);
        setTheme(isDark ? 'light' : 'dark');
    }

  return (
    <div className='flex justify-between items-center w-full px-6 py-4'>
        <div className='flex items-center space-x-4'>
        <Link href="/">
          <h1 className='font-bold md:text-2xl text-xl'>War of Devs</h1>
        </Link>
        <Link href='https://github.com/subhraneel2005/War-Of-Devs' target='_blank'>
          <Button variant="outline" className='hidden md:flex gap-2'>
            <FaGithub size={20}/>
            <p>Star on Github</p>
          </Button>
        </Link>
        </div>
        <div className='flex items-center gap-4'>
        {user ? 
          <DropdownMenu>
          <DropdownMenuTrigger>
          <Avatar className='border-2 border-zinc-300 rounded-full'>
            <AvatarImage src={user?.image!} />
            <AvatarFallback>CP</AvatarFallback>
          </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='flex flex-col space-y-4 py-6 px-7 mt-4'>
           <Button variant='outline' onClick={() => signOut()}>
              <span className='flex justify-center items-center gap-2'>
                <p>Logout</p>
                <LogOut size={20} />
              </span>
           </Button>
           <Button>
              <span className='flex justify-center items-center gap-2'>
                <p>View Profile</p>
                <User2 size={20} />
              </span>
           </Button>
          </DropdownMenuContent>
         </DropdownMenu>
        
         : <Button onClick={() => signIn()}>Login</Button>}
        <Toggle
            onPressedChange={themeToggle}
            className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "size-12 rounded-full",
            )}
            >
            {isDark ? (
            <SunIcon className="size-5" />
            ) : (
            <MoonIcon className="size-5" />
            )}
        </Toggle>
        </div>
    </div>
  )
}