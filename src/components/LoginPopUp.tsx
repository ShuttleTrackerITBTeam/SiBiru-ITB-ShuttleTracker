import React, { useState } from 'react';
import Image from 'next/image';

interface LoginPopUpProps {
  isOpen: boolean;
}

const LoginPopUp: React.FC<LoginPopUpProps> = ({ isOpen}) => {
  if (!isOpen) {
    return null; // If isOpen is false, don't render anything
  }

  return (
    <div className='absolute top-[120%] right-[20px] px-[12px] py-[14px] rounded-tr-0 rounded-br-[20px] rounded-bl-[20px] rounded-tl-[20px] bg-white flex flex-col' style={{ boxShadow: '0px 5px 5px #b2b2b2'}}>
      <div className='flex flex-col'>
        <p className='text-[12px] font-medium'>Hello, Guest!</p>
        <p className='text-[10px]'>Welcome to <span className='text-[#0078C9]'>Shuttle<span className='text-[#002582]'>Tracker</span></span></p>
        <button className='w-[128px] h-[39px] px-[20px] py-[10px] bg-[#004099] rounded-[20px] text-white mt-[11px] font-bold text-[14px]'>
            <div className='flex justify-center gap-[9px]'>
              About Us
            </div>
        </button>
        <button className='w-[128px] h-[39px] px-[20px] py-[10px] bg-[#0078C9] rounded-[20px] text-white mt-[6px] font-bold text-[14px]'>
            <div className='flex justify-center gap-[9px]'>
              <Image alt="iconLogin" src="images/iconLogin.svg" width={20} height={20}  />
              Log In
            </div>
        </button>
      </div>
    </div>
  );
};

export default LoginPopUp;
