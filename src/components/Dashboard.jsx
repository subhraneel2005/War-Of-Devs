'use client'

import { useState, useRef } from 'react';
import { SiJavascript, SiTypescript, SiHtml5, SiCss3, SiPython, SiC, SiCplusplus } from 'react-icons/si';
import { ChevronRight } from "lucide-react";
import HeatMap from '@uiw/react-heat-map';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from "lucide-react";
import { LuExternalLink } from "react-icons/lu";
import { GoStar } from "react-icons/go";
import { IoIosArrowDown } from "react-icons/io";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from 'next/navigation';

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

  const [username, setUsername] = useState('');
  const [contributions, setContributions] = useState([]);
  const [repos, setRepos] = useState([]);
  const [c, setC] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });
  const [visibleRepos, setVisibleRepos] = useState(6); // Initially show 6 repos

  const heatMapContainerRef = useRef(null);

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github?username=${username}`);
      const res2 = await fetch(`/api/github/repositories?username=${username}`);
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
    ? new Date(Math.min(...contributions.map(c => new Date(c.date).getTime())))
    : new Date();

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

  return (
    <div className='min-h-screen w-full flex flex-col items-center p-4'>
      <div className='flex justify-center items-center gap-4 py-8'>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="GitHub username"
        />
        <Button onClick={fetchContributions} disabled={loading}>
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin" />
              Please wait...
            </div>
          ) : (
            "Get Contributions"
          )}
        </Button>
      </div>

      {error && <p className='text-red-500'>{error}</p>}
      {c.totalContributions && <p>{c.totalContributions} contributions till now</p>}

      <div className='relative w-full md:max-w-2xl overflow-hidden' ref={heatMapContainerRef}>
        <HeatMap
          value={contributions}
          width={600}
          startDate={earliestDate}
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
            0: '#dad7cd',
            2: '#a3b18a',
            4: '#588157',
            10: '#3a5a40',
            20: '#344e41',
            30: '#283618',
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
      </div>

      {/* Repositories Section */}
      <div className='w-full md:max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>
        {repos.slice(0, visibleRepos).map((repo, index) => (
          <div
            key={index}
            className='bg-transparent flex flex-col hover:shadow-xl duration-300 justify-center items-center border rounded-[20px] w-[320px] h-[150px] px-2 py-1'
            style={{ borderColor: `${repo?.languages?.nodes[0]?.color}` }}
          >
            <p className='text-[14px] text-gray-200'>{username}/</p>
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
    </div>
  );
}
