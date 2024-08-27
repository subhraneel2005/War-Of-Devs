'use client'

import {useState} from 'react'
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
import axios from 'axios';
import { postNewUser } from '@/actions/userAction';

function Connections() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState('')
    const [location, setLocation] = useState();
    const [resumeLink, setResumeLink] = useState('');
    const [bio, setBio] = useState('')
    const [githubId, setGithubId] = useState('')
    const [linkedinId, setLinkedinId] = useState('')
    const [twitterId, setTwitterId] = useState('')
    const [instagramId, setInstagramId] = useState('')
    const [youtubeId, setYoutubeId] = useState('')
    const [productHuntId, setProductHuntId] = useState('')
    const [profile, setProfile] = useState();

   
    const submitProfile = async () => {

        
        try {
            const userData = {
                name,
                email,
                password,
                profilePicture,
                location,
                resumeLink,
                bio,
                githubId,
                linkedinId,
                twitterId,
                instagramId,
                youtubeId,
                productHuntId,
            };

            const res = await postNewUser(userData)

            if (res.msg) {
                alert('Profile added to database successfully');
                console.log(res);
            } else {
                alert('Error: ' + res.errMsg);
            }
            
    
        } catch (error) {
            console.error('Error:', error);
        }
    };
    

    return (
        <div className='w-[80%] flex justify-center items-center overflow-y-auto ml-[20%]'>

            <div className="flex flex-col justify-center items-center py-6 px-12 space-y-6">
                <h2 className='text-[24px] font-bold text-gray-100 text-center mb-8'>Share your details 😏</h2>

                <input type="text" placeholder="Your Name" className="input input-bordered w-full input-sm max-w-xs" onChange={(e) => setName(e.target.value)} value={name}/>
                <input type="text" placeholder="Where do you live?" className="input input-bordered w-full input-sm max-w-xs" onChange={(e) => setLocation(e.target.value)} value={location}/>
                <input type="text" placeholder="Your Resume link (optional)" className="input input-bordered w-full input-sm max-w-xs" onChange={(e) => setResumeLink(e.target.value)} value={resumeLink}/>
                <textarea className="textarea textarea-bordered w-full max-w-xs" placeholder="Bio" onChange={(e) => setBio(e.target.value)} value={bio} />

                <button onClick={submitProfile} className="btn rounded-xl bg-green-900 hover:bg-green-950 text-green-300">Submit</button>
            </div>

            <div className="flex flex-col justify-center items-center py-6 px-12 space-y-6">
                <p className='text-zinc-300 text-center pt-6'>Add Connections</p>

                <div className='grid grid-cols-2 w-full gap-6'>
                    <Dialog>
                        <DialogTrigger>
                            <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border bg-zinc-700 hover:bg-zinc-800 duration-500 border-gray-300 flex justify-center items-center'>Github <IoLogoGithub size={15} /></div>
                        </DialogTrigger>
                        <DialogContent>
                            <div className='space-y-6 p-5'>
                                <Input placeholder='Your Github Username' onChange={(e) => setGithubId(e.target.value)} value={githubId}/>
                                <div className='flex justify-center items-center'>
                                    <button className="btn btn-sm">Connect</button> 
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger>
                            <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border bg-sky-700 hover:bg-sky-800 duration-500 border-gray-300 flex justify-center items-center'>LinkedIn <FaLinkedin size={15} /></div>
                        </DialogTrigger>
                        <DialogContent>
                            <div className='space-y-6 p-5'>
                                <Input placeholder='Your LinkedIn Username' onChange={(e) => setLinkedinId(e.target.value)} value={linkedinId}/>
                                <div className='flex justify-center items-center'>
                                    <button className="btn btn-sm">Connect</button> 
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger>
                            <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border bg-black border-gray-300 flex justify-center items-center'>Twitter <FaXTwitter size={15} /></div>
                        </DialogTrigger>
                        <DialogContent>
                            <div className='space-y-6 p-5'>
                                <Input placeholder='Your Twitter Username' onChange={(e) => setTwitterId(e.target.value)} value={twitterId}/>
                                <div className='flex justify-center items-center'>
                                    <button className="btn btn-sm">Connect</button> 
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger>
                        <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border border-gray-300 flex justify-center items-center bg-pink-700 hover:bg-pink-800 duration-500'>Instagram<FaInstagram size={15} /></div>
                        </DialogTrigger>
                        <DialogContent>
                            <div className='space-y-6 p-5'>
                                <Input placeholder='Your Instagram Username' onChange={(e) => setInstagramId(e.target.value)} value={instagramId}/>
                                <div className='flex justify-center items-center'>
                                    <button className="btn btn-sm">Connect</button> 
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger>
                        <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border border-gray-300 flex justify-center items-center bg-red-700 hover:bg-red-800 duration-500'>Youtube<IoLogoYoutube size={15} /></div>
                        </DialogTrigger>
                        <DialogContent>
                            <div className='space-y-6 p-5'>
                                <Input placeholder='Your Youtube Channel link' onChange={(e) => setYoutubeId(e.target.value)} value={youtubeId}/>
                                <div className='flex justify-center items-center'>
                                    <button className="btn btn-sm">Connect</button> 
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog>
                        <DialogTrigger>
                        <div className='px-4 py-2 rounded-lg gap-2 cursor-pointer border border-gray-300 flex justify-center items-center bg-orange-700 hover:bg-orange-800 duration-500'>ProductHunt<FaProductHunt size={15} /></div>
                        </DialogTrigger>
                        <DialogContent>
                            <div className='space-y-6 p-5'>
                                <Input placeholder='Your ProductHunt Username' onChange={(e) => setProductHuntId(e.target.value)} value={productHuntId}/>
                                <div className='flex justify-center items-center'>
                                    <button className="btn btn-sm">Connect</button> 
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
        </div>
    )
}

export default Connections;
