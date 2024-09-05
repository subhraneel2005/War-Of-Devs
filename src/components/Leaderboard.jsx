'use client';

import { useEffect, useState } from 'react';
import { getAllUsers, likeUser, unlikeUser } from '@/actions/userAction'; // Import your like/unlike actions
import { FcLikePlaceholder, FcLike } from "react-icons/fc";
import { LuExternalLink } from "react-icons/lu";

function Leaderboard() {
  const [allUsers, setAllUsers] = useState([]);
  const [likedUsers, setLikedUsers] = useState(new Set()); // State to track liked users

  // Fetch users from the server-side function
  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      if (response && Array.isArray(response)) {
        setAllUsers(response); // Set users in state
      } else {
        console.error('Error fetching users or response format issue.');
      }
    } catch (error) {
      console.error('Error fetching users:', error); // Debugging log for errors
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Like a user
  const handleLike = async (userId) => {
    try {
      await likeUser(userId); // Call API to like user
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, profileUpvotes: user.profileUpvotes + 1 } : user
        )
      );
      setLikedUsers((prevLikedUsers) => new Set(prevLikedUsers).add(userId)); // Optimistically update liked state
    } catch (error) {
      console.error('Error liking user:', error);
    }
  };

  // Unlike a user
  const handleUnlike = async (userId) => {
    try {
      await unlikeUser(userId); // Call API to unlike user
      setAllUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === userId ? { ...user, profileUpvotes: user.profileUpvotes - 1 } : user
        )
      );
      setLikedUsers((prevLikedUsers) => {
        const updatedSet = new Set(prevLikedUsers);
        updatedSet.delete(userId);
        return updatedSet;
      }); // Optimistically update liked state
    } catch (error) {
      console.error('Error unliking user:', error);
    }
  };

  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center text-white'>
      <h1 className='text-4xl'>Top Developers 🥇</h1>

      <div className='h-full w-full flex justify-evenly items-center mt-12 md:mt-20'>
        <div className='flex flex-col space-y-3'>
          <h2 className='text-2xl'>Name</h2>
          <ul className='space-y-5'>
            {allUsers.map((p) => (
              <li key={p._id} className='flex gap-2 items-center'>
                <img src={p?.profilePicture} alt={p?.name} className='w-8 h-8 rounded-full' />
                {p?.name}
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col space-y-3'>
          <h2 className='text-2xl'>Votes</h2>
          <ul className='space-y-5'>
            {allUsers.map((p) => (
              <li key={p._id} className='flex justify-between items-center'>
                <p className='text-red-400'>{p?.profileUpvotes}</p>
                {likedUsers.has(p._id) ? (
                  <FcLike size={20} className='cursor-pointer' onClick={() => handleUnlike(p._id)} />
                ) : (
                  <FcLikePlaceholder size={20} className='cursor-pointer' onClick={() => handleLike(p._id)} />
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className='flex flex-col space-y-3'>
          <h2 className='text-2xl'>Github</h2>
          <ul className='space-y-5'>
            {allUsers.map((p) => (
              <li key={p._id} className='flex gap-2 items-center'>
                <p className='cursor-pointer text-sky-300' onClick={() => window.open(`https://github.com/${p?.githubId}`, '_blank', 'noopener,noreferrer')}>{p?.githubId}</p>
                <LuExternalLink size={20} className='cursor-pointer text-blue-500 hover:text-blue-600 duration-300' onClick={() => window.open(`https://github.com/${p?.githubId}`, '_blank', 'noopener,noreferrer')} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
