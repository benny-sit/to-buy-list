import React from 'react'
import { AiOutlineShoppingCart, } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { useCurrentPath } from '../utils/useCurrentPath';

export default function Nav() {
  const navigate = useNavigate();
  const currentPath = useCurrentPath();



  function handleLogout() {
    window.localStorage.removeItem('lastList');
    navigate('/get-in', {replace: true});
  }

  return (
    <header>
      <nav className='bg-blue-400 w-full p-3 shadow-md flex'>
        <div className='text-3xl flex items-center text-gray-100 gap-1'>
          <AiOutlineShoppingCart />
          To Buy List
        </div>
        <div className='flex items-center grow justify-end'>
        <button className={`flex items-center text-gray-100 gap-1 group ${currentPath !== '/' ? 'invisible' : ''}`} onClick={handleLogout}>
          <span className='max-w-0 overflow-hidden transition-all group-hover:max-w-[50px]'>
            Logout
          </span>
          <span className='text-3xl' >
            <IoLogOutOutline />
          </span>
        </button>
        </div>
      </nav>
    </header>
  )
}
