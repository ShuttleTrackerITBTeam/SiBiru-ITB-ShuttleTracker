import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoginWarning from './LoginWarning';
import LoginPopUp from './LoginPopUp';
import LogoutPopUp from './LogoutPopUp';
import Link from 'next/link';

interface NavbarProps {
  user : boolean;
}

const Navbar : React.FC<NavbarProps> = (user) => {
  console.log('user navbar : ', user);
  const [isLoginWarningOpen, setIsLoginWarningOpen] = useState(false);
  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);
  const [isLogoutPopUpOpen, setIsLogOutPopUpOpen] = useState(false);

  const handleOpenLoginWarning = () => {
    setIsLoginWarningOpen(true);
  };

  const handleCloseLoginWarning = () => {
    setIsLoginWarningOpen(false);
  };

  const handleClickLoginPopUp = () => {
    setIsLoginPopUpOpen(!isLoginPopUpOpen);
  }
  
  const handleClickLogoutPopUp = () => {
    setIsLogOutPopUpOpen(!isLogoutPopUpOpen);
  }

  return (
    <>
    <nav className='flex justify-center '>
      <div className="w-full md:w-[468px] fixed bg-white appBar">
        <div className="flex justify-between px-[14px] py-[15px] relative">
          <div className='flex items-center gap-2'>
            <Link href='/help'>
            <div><Image src="/images/help.svg" alt='help' width={23} height={23} /></div>
            </Link>
            <Link href="/report">
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
            {/* Conditionally render based on the user state */}
            {user ? (
              <button onClick={handleClickLoginPopUp}>
                <Image src="/images/profile.svg" alt='logo' width={33} height={33} />
              </button>
            ) : (
              <button onClick={handleClickLogoutPopUp}>
                <Image src="/images/profile.svg" alt='logo' width={33} height={33} />
              </button>
            )}
          </div>

          {user ? (
            <LoginPopUp isOpen={isLoginPopUpOpen}></LoginPopUp>
          ) : (
            <LogoutPopUp isOpen={isLogoutPopUpOpen} user="Adrian"></LogoutPopUp>
          )}

        </div>
      </div>
    </nav>
    {/* <LoginWarning isOpen={isLoginWarningOpen} onClose={handleCloseLoginWarning}></LoginWarning> */}
    </>
  );
};

export default Navbar;