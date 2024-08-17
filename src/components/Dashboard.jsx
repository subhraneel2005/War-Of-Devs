'use client'

import { useState, useRef } from 'react';
import HeatMap from '@uiw/react-heat-map';

export default function Dashboard() {
  const [username, setUsername] = useState('');
  const [contributions, setContributions] = useState([]);
  const [c, setC] = useState([]);
  const [error, setError] = useState('');
  const [tooltip, setTooltip] = useState({ visible: false, content: '', x: 0, y: 0 });

  // Reference to the HeatMap container
  const heatMapContainerRef = useRef(null);

  const fetchContributions = async () => {
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
    }
  };

  // Find the earliest date in processedData
  const earliestDate = contributions.length > 0
    ? new Date(Math.min(...contributions.map(c => new Date(c.date).getTime())))
    : new Date();

  // Create a map for quick access to contribution counts
  const contributionMap = contributions.reduce((map, entry) => {
    map[entry.date] = entry.count;
    return map;
  }, {});

  // Handle mouse enter event for showing tooltip
  const handleMouseEnter = (event, date) => {
    const contributionCount = contributionMap[date] || 0;
    const rect = event.target.getBoundingClientRect();
    const containerRect = heatMapContainerRef.current.getBoundingClientRect();

    setTooltip({
      visible: true,
      content: `Contributions: ${contributionCount}`,
      x: rect.left - containerRect.left + window.scrollX + rect.width / 2,
      y: rect.top - containerRect.top + window.scrollY - 40 // Adjust vertical position
    });
  };

  // Handle mouse leave event for hiding tooltip
  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  return (
    <div className='min-h-screen w-full bg-slate-900 flex flex-col items-center p-4'>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="GitHub username"
        className='text-black p-2 mb-4'
      />
      <button onClick={fetchContributions} className='mb-4 p-2 bg-blue-500 text-white'>
        Get Contributions
      </button>

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
