import React, { useState } from 'react';
import Image from 'next/image';

interface LoginWarningProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginWarning: React.FC<LoginWarningProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null; // If isOpen is false, don't render anything
  }

  return (
    <div className='w-screen h-[100%] rounded-[20px] bg-transparent absolute top-[0px] z-[500] flex justify-center'>
      <div className='mx-auto top-[50%] translate-y-[-50%] absolute w-[85%] h-[200px] px-[20px] py-[20px] rounded-[20px] bg-white md:w-[309px]'>
        <div className='w-[100%] flex justify-end'>
          <Image
            src="/images/close.svg"
            alt='close-button'
            width={18}
            height={18}
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className='flex justify-center'>
          <p className='font-bold'>Perhatian!</p>
        </div>
        <div className='flex justify-center w-[40%] mx-auto text-center md:w-[100%]'>
          <p>Kamu perlu log in untuk menggunakan fitur ini 👉👈</p>
        </div>
        <div className='bg-[#0078C9] w-[33%] py-[10px] rounded-[20px] mx-auto text-white flex justify-center mt-[15px] flex justify-center'>
          <button className='w-[100%]'>Log In</button>
        </div>
      </div>
    </div>
  );
};

export default LoginWarning;
