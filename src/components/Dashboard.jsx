'use client'

import { useState, useRef } from 'react';
import HeatMap from '@uiw/react-heat-map';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from "lucide-react"

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [contributions, setContributions] = useState([]);
  const [c, setC] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  const heatMapContainerRef = useRef(null);

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/github?username=${username}`);
      const data = await res.json();
      console.log('Fetched Data:', data);

      const extractedData = data.weeks.flatMap(week =>
        week.contributionDays.map(day => ({
          date: day.date,
          count: day.contributionCount
        }))
      );

      if (res.ok) {
        setContributions(extractedData);
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

      <div className='relative w-full max-w-2xl' ref={heatMapContainerRef}>
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
    </div>
  );
}
