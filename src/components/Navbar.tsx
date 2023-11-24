import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import LoginWarning from './LoginWarning';
import LoginPopUp from './LoginPopUp';
import LogoutPopUp from './LogoutPopUp';

const Navbar: React.FC = () => {
  const [isLoginWarningOpen, setIsLoginWarningOpen] = useState(false);
  const [isLoginPopUpOpen, setIsLoginPopUpOpen] = useState(false);
  const [isLogoutPopUpOpen, setIsLogOutPopUpOpen] = useState(false);
  const [user, setUser] = useState<any>(null); // Initialize user state

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


  useEffect(() => {
    // Fetch data when the component mounts
    const fetchData = async () => {
      try {
        // const response = await fetch('http://localhost:8000/check-session');
        // const userData = await response.json();
        const userData = null;
        setUser(userData); // Store the fetched data in the user state
        console.log('user',user);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
    <nav className='flex justify-center '>
      <div className="w-full md:w-[468px] fixed bg-white appBar">
        <div className="flex justify-between px-[14px] py-[15px] relative">
          <div className='flex items-center'>
            <a href="/help"><Image src="/images/help.svg" alt='help' width={23} height={23} /></a>
            <a href="/report">
              <Image src="/images/report.svg" alt='report' width={27} height={27} />
            </a>
            
          </div>
          <div className='flex items-center logo'>
            <a href="/"><Image src="/images/logo.svg" alt='logo' width={69} height={38} /></a>
          </div>
          <div className='flex items-center'>
            {/* Conditionally render based on the user state */}
            {user === null ? (
              <button onClick={handleClickLoginPopUp}>
                <Image src="/images/profile.svg" alt='logo' width={33} height={33} />
              </button>
            ) : (
              <button onClick={handleClickLogoutPopUp}>
                <Image src="/images/profile.svg" alt='logo' width={33} height={33} />
              </button>
            )}
          </div>

          {user === null ? (
            <LoginPopUp isOpen={isLoginPopUpOpen}></LoginPopUp>
          ) : (
            <LogoutPopUp isOpen={isLogoutPopUpOpen} user={user}></LogoutPopUp>
          )}

        </div>
      </div>
    </nav>
    <LoginWarning isOpen={isLoginWarningOpen} onClose={handleCloseLoginWarning}></LoginWarning>
    </>
  );
};

export default Navbar;