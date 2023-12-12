import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProfilePopUp from './ProfilePopUp';
import { useAuth } from '@src/services/AuthContext';

const Navbar = () => {
  const { isProfilePopUpOpen, setIsProfilePopUpOpen } = useAuth()

  const handleProfileClick = () => {
    setIsProfilePopUpOpen(!isProfilePopUpOpen);
  }

  return (
    <>
      <nav className='flex justify-center '>
        <div className="w-full md:w-[100%] fixed bg-white appBar">
          <div className="flex justify-between px-[14px] py-[15px] relative">
            <div className='flex items-center gap-2'>
              <Link href='/help'>
                <div><Image src="/images/help.svg" alt='help' width={23} height={23} /></div>
              </Link>
              <Link href="https://forms.gle/8rXwmaeP33aEaXsf8">
                <div><Image src="/images/report.svg" alt='report' width={27} height={27} /></div>
              </Link>        
            </div>
            <div className='flex items-center ml-[-10px] logo'>
              <Link href="/">
                <div>
                  <Image src="/images/logo.svg" alt='logo' width={88} height={30} />
                </div>
              </Link>
            </div>
            <div className='flex items-center'>
              <button onClick={handleProfileClick}>
                <Image src="/images/profile.svg" alt='logo' width={33} height={33} />
              </button>
            </div>
          </div>
          { isProfilePopUpOpen &&
            <div>
              <ProfilePopUp setIsProfilePopUpOpen={setIsProfilePopUpOpen} />
            </div>
          }
        </div>
      </nav>
    </>
  );
};

export default Navbar;