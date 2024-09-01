'use client'
import {useEffect} from 'react'

function Leaderboard() {

    const people = [
        { rank: 1, name: "Alice Johnson", votes: 1285 },
        { rank: 2, name: "Michael Smith", votes: 1102 },
        { rank: 3, name: "Olivia Brown", votes: 980 },
        { rank: 4, name: "James Williams", votes: 875 },
        { rank: 5, name: "Sophia Davis", votes: 832 }
    ];
    
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center text-white'>
        <h1 className='text-4xl'>Top Developers 🥇</h1>

        <div className='h-full w-full flex justify-evenly items-center mt-12 md:mt-20'>
            <div className='flex flex-col space-y-3'>
                <h2 className='text-2xl'>Rank</h2>
                <ul>
                    {people.map((p) => (
                        <li className='text-center'>{p?.rank}</li>
                    ))}
                </ul>
            </div>

            <div className='flex flex-col space-y-3'>
                <h2 className='text-2xl'>Name</h2>
                <ul>
                    {people.map((p) => (
                        <li className=''>{p?.name}</li>
                    ))}
                </ul>
            </div>

            <div className='flex flex-col space-y-3'>
                <h2 className='text-2xl'>Votes</h2>
                <ul>
                    {people.map((p) => (
                        <li className='text-center'>{p?.votes}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Leaderboard