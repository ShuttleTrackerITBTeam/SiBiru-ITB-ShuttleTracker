import React, { useState } from 'react';
import Image from 'next/image';
import Router from 'next/router';

interface LogoutPopUpProps {
  isOpen: boolean;
  user: any;
}

const LogoutPopUp: React.FC<LogoutPopUpProps> = ({ isOpen, user}) => {
  if (!isOpen) {
    return null; // If isOpen is false, don't render anything
  }

  const handleLogout = async () => {
    localStorage.removeItem('session');
    Router.push('/');
  }

  return (
    <div className='absolute top-[120%] right-0 px-[12px] py-[14px] rounded-tr-0 rounded-br-[20px] rounded-bl-[20px] rounded-tl-[20px] bg-white'>
        <p className='text-[12px] font-bold'>Hello, ${user}!</p>
        <p className='text-[10px]'>Welcome to ShuttleTracker</p>
        <button onClick={handleLogout} className='px-[20px] py-[10px] bg-[#C90000] rounded-[20px] text-white mt-[11px] font-bold text-[14px]'>Logout
        </button>
    </div>
  );
};

export default LogoutPopUp;
