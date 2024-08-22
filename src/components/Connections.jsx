import React from 'react'
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin, FaInstagram, FaProductHunt } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from "react-icons/io5";
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from './ui/input';

const connections = [
    { name: 'Github', icon: <IoLogoGithub size={15} />, placeholder: 'Your Github Username', bgColor: 'bg-zinc-700', hoverColor: 'hover:bg-zinc-800' },
    { name: 'LinkedIn', icon: <FaLinkedin size={15} />, placeholder: 'Your LinkedIn Username', bgColor: 'bg-sky-700', hoverColor: 'hover:bg-sky-800' },
    { name: 'Twitter', icon: <FaXTwitter size={15} />, placeholder: 'Your Twitter Username', bgColor: 'bg-black' },
    { name: 'Instagram', icon: <FaInstagram size={15} />, placeholder: 'Your Instagram Username', bgColor: 'bg-pink-700', hoverColor: 'hover:bg-pink-800' },
    { name: 'Youtube', icon: <IoLogoYoutube size={15} />, placeholder: 'Your Youtube Channel link', bgColor: 'bg-red-700', hoverColor: 'hover:bg-red-800' },
    { name: 'ProductHunt', icon: <FaProductHunt size={15} />, placeholder: 'Your ProductHunt Username', bgColor: 'bg-orange-700', hoverColor: 'hover:bg-orange-800' },
];

function ConnectionDialog({ name, icon, placeholder, bgColor, hoverColor }) {
    return (
        <Dialog>
            <DialogTrigger>
                <div className={`px-4 py-2 rounded-lg gap-2 cursor-pointer border border-gray-300 flex justify-center items-center ${bgColor} ${hoverColor} duration-500`}>
                    {name} {icon}
                </div>
            </DialogTrigger>
            <DialogContent>
                <div className='space-y-6 p-5'>
                    <Input placeholder={placeholder} />
                    <div className='flex justify-center items-center'>
                        <button className="btn btn-sm">Connect</button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function Connections() {
    return (
        <div className='w-[80%] min-h-screen flex justify-center items-center overflow-y-auto ml-[20%]'>

            <div className="flex flex-col justify-center items-center py-6 px-12 space-y-6">
                <h2 className='text-[24px] font-bold text-gray-100 text-center mb-8'>Share your details 😏</h2>

                <input type="text" placeholder="Your Name" className="input input-bordered w-full input-sm max-w-xs" />
                <input type="text" placeholder="Where do you live?" className="input input-bordered w-full input-sm max-w-xs" />
                <input type="text" placeholder="Your Resume link (optional)" className="input input-bordered w-full input-sm max-w-xs" />
                <textarea className="textarea textarea-bordered w-full max-w-xs" placeholder="Bio"></textarea>

                <button className="btn rounded-xl bg-green-900 hover:bg-green-950 text-green-300">Submit</button>
            </div>

            <div className="flex flex-col justify-center items-center py-6 px-12 space-y-6">
                <p className='text-zinc-300 text-center pt-6'>Add Connections</p>

                <div className='grid grid-cols-2 w-full gap-6'>
                    {connections.map((conn, index) => (
                        <ConnectionDialog key={index} {...conn} />
                    ))}
                </div>

            </div>
        </div>
    )
}

export default Connections;
