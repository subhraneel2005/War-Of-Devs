'use client'

import { useState, useRef, useEffect } from 'react';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiPython, SiC, SiCplusplus } from 'react-icons/si';
import { ChevronRight } from "lucide-react";
import HeatMap from '@uiw/react-heat-map';
import { Button } from './ui/button';
import { Loader2 } from "lucide-react";
import { LuExternalLink } from "react-icons/lu";
import { GoStar } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BiSolidUpArrow } from "react-icons/bi";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation';
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
import { postNewUser, getUserByEmail } from '@/actions/userAction';
import { useSession } from 'next-auth/react';

export default function Dashboard() {

  const languageIcons = {
    javascript: <SiJavascript size={15} />,
    typescript: <SiTypescript size={15} />,
    html: <SiHtml5 size={15} />,
    css: <SiCss3 size={15} />,
    python: <SiPython size={15} />,
    c: <SiC size={15} />,
    cplusplus: <SiCplusplus size={15} />,
  };

  const router = useRouter();
  const session = useSession();

  const user = session?.data?.user;

  const [username, setUsername] = useState('');
  const [contributions, setContributions] = useState([]);
  const [repos, setRepos] = useState([]);
  const [c, setC] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
  const [visibleRepos, setVisibleRepos] = useState(6);
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
    const [isUserExists, setIsUserExists] = useState(false);
    const [userDetails, setUserDetails] = useState(null);

  const heatMapContainerRef = useRef(null);

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github?username=${userDetails?.githubId}`);
      const res2 = await fetch(`/api/github/repositories?username=${userDetails?.githubId}`);
      const data2 = await res2.json();
      const data = await res.json();
      console.log('Contribution Data:', data);
      console.log('Repositories Data:', data2);

      const extractedData = data.weeks.flatMap(week =>
        week.contributionDays.map(day => ({
          date: day.date,
          count: day.contributionCount
        }))
      );

      if (res.ok && res2.ok) {
        setContributions(extractedData);
        setRepos(data2);
        setC(data);
        setError('');
      } else {
        setError(data.error || 'Failed to fetch contributions');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const earliestDate = contributions.length > 0
  ? new Date(new Date().getFullYear(), 0, 1)  // January 1st of the current year
  : new Date(new Date().getFullYear(), 0, 1);


  const lastDate = contributions.length > 0
    ? new Date(Math.max(...contributions.map(c => new Date(c.date).getTime())))
    : new Date();
  
  // Adjust lastDate to be today's date if it's earlier than today
  const today = new Date();
  if (lastDate < today) {
    lastDate.setFullYear(today.getFullYear(), today.getMonth(), today.getDate());
  }
  
  

  const contributionMap = contributions.reduce((map, entry) => {
    map[entry.date] = entry.count;
    return map;
  }, {});

  const handleMouseEnter = (event, date) => {
    const contributionCount = contributionMap[date] || 0;
    const rect = event.target.getBoundingClientRect();
    const containerRect = heatMapContainerRef.current.getBoundingClientRect();

    setTooltip({
      visible: true,
      content: `${contributionCount === 0 ? 'No Contributions' : `${contributionCount} Contributions`}`,
      x: rect.left - containerRect.left + window.scrollX + rect.width / 2,
      y: rect.top - containerRect.top + window.scrollY - 40
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const handleShowMore = () => {
    setVisibleRepos((prevVisibleRepos) => prevVisibleRepos + 6);
  };

  useEffect(() => {
    const checkUserExists = async () => {
      if (user?.email) {
        const existingUser = await getUserByEmail(user.email);
        if (existingUser) {
          setIsUserExists(true);
          setUserDetails(existingUser);
        } else {
          setIsUserExists(false);
        }
      }
    };
    checkUserExists();
    
    if(userDetails){
      fetchContributions();
    }
  }, [user?.email , userDetails]);


  const submitProfile = async () => {

    if(user?.email === email){

    }

    try {
        const userData = {
            name,
            email: user?.email,
            password,
            profilePicture: user?.image,
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
        } else {
            alert('Error: ' + res.errMsg);
        }
        

    } catch (error) {
        console.error('Error:', error);
    }
};

  if(!user){
    router.push('/api/auth/signin')
  }

  return (
    <div className='min-h-screen w-full flex items-center p-4 bg-zinc-900'>

    <div className='w-[20%] flex flex-col items-center fixed top-10 pl-10'>
    {user?.image && <div className="avatar">
      <div className="w-24 md:w-40 rounded-full">
        <img src={user?.image} />
      </div>
    </div>}
    
    <h1 className='text-[2rem] text-zinc-300 mt-5 font-bold text-center'>{userDetails?.name}</h1>
    
    <div className='flex justify-between w-full gap-12 mt-10'>
      <div className='flex gap-1'>
        <FaLocationDot className='text-gray-400' size={20} />
        <p className='text-gray-400 text-[12px]'>{userDetails?.location}</p>
      </div>
      <div className='flex gap-1'>
        <FaGithub className='text-gray-400' size={20} />
        <p className='text-gray-400 text-[12px]'>{c?.totalContributions} contributions</p>
      </div>
    </div>

    <div className='flex gap-1 mt-12 justify-center items-center'>
      <BiSolidUpArrow size={30} className='text-orange-600 flex justify-center items-center' />
      <p className='text-gray-400 text-[17px] text-center'>{userDetails?.profileUpvotes}</p>
    </div>

    </div>

    {/* Add Details Section */}
    {isUserExists ? 
    <div className='w-[80%] flex flex-col items-center overflow-y-auto ml-[20%]'>

    {error && <p className='text-red-500'>{error}</p>}
    {c.totalContributions && <p>{c.totalContributions} contributions till now</p>}
    
    {userDetails?.githubId && <div className='relative w-full md:max-w-2xl' ref={heatMapContainerRef}>
      <HeatMap
        value={contributions}
        width={700}
        startDate={earliestDate}
        // endDate={lastDate}
        style={{ '--rhm-rect': '#b9b9b9', color: '#fff' }}
        legendRender={(props) => <rect {...props} y={props.y + 10} rx={3} />}
        rectProps={{
          rx: 3
        }}
        rectRender={(props, data) => (
          <rect
            {...props}
            onMouseEnter={(e) => handleMouseEnter(e, data.date)}
            onMouseLeave={handleMouseLeave}
          />
        )}
        panelColors={{
          0: '#fff4e6',
          2: '#fff4e6',     
          4: '#e76f51',     
          10: '#d65a31',    
          20: '#bc4b25',    
          30: '#8c3b1f',
        }}
        
      />
      {tooltip.visible && (
        <div
          className='absolute bg-slate-950 text-white text-xs p-1 rounded shadow-md'
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateX(-50%)',
            pointerEvents: 'none'
          }}
        >
          {tooltip.content}
          <div className='absolute' style={{
            left: '50%',
            top: '100%',
            transform: 'translateX(-50%)',
            transformOrigin: 'center top'
          }} />
        </div>
      )}
    </div>}
    
    {/* Repositories Section */}
    <div className='w-full md:max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
      {repos.slice(0, visibleRepos).map((repo, index) => (
        <div
          key={index}
          className='bg-transparent flex flex-col hover:shadow-xl duration-300 justify-center items-center border rounded-[20px] w-[320px] h-[150px] px-2 py-1'
          style={{ borderColor: `${repo?.languages?.nodes[0]?.color}` }}
        >
          <p className='text-[14px] text-gray-200'>{userDetails?.githubId}/</p>
          <span className="text-[14px] text-gray-200 font-bold">{repo.name}</span>
    
          <div className='flex justify-between items-center w-full px-4 mt-12'>
            <div className='flex gap-3'>
              <div
                style={{ color: `${repo?.languages?.nodes[0]?.color}` }}
              >
                {languageIcons[repo?.languages?.nodes[0]?.name.toLowerCase()] || 
                  <span className='text-[12px] text-gray-400 font-semibold'>
                    {repo?.languages?.nodes[0]?.name}
                  </span>}
              </div>
              <p style={{ color: `${repo?.languages?.nodes[0]?.color}` }} className='text-[12px] text-gray-400 font-semibold'>
                {repo?.languages?.nodes[0]?.name}
              </p>
              <div className='flex gap-1'>
                <GoStar size={15} className='text-gray-400 hover:text-gray-200 duration-500 cursor-pointer' onClick={() => window.open(repo.url, '_blank', 'noopener,noreferrer')} />
                <p className='text-[12px] text-gray-400'>{repo.stargazerCount}</p>
              </div>
            </div>
            <LuExternalLink size={20} className='text-gray-200 cursor-pointer' onClick={() => window.open(repo.url, '_blank', 'noopener,noreferrer')} />
          </div>
        </div>
      ))}
    </div>
    
    {visibleRepos < repos.length && (
      <div className='flex justify-center items-center mt-20 w-full h-auto'>
        <button onClick={handleShowMore} className='bg-transparent rounded-[24px] border border-gray-100 hover:bg-black flex gap-1 text-gray-200 text-[14px] hover:duration-500 px-4 py-2'>
          Show More <IoIosArrowDown size={25} />
        </button>
      </div>
    )}
    </div> :
    <div className='w-[80%] flex flex-col items-center overflow-y-auto ml-[20%]'>

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
    </div>}

    </div>
  );
}






