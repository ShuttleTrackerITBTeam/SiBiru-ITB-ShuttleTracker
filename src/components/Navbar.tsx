import React from 'react';
import Image from 'next/image';
import ProfilePopUp from './ProfilePopUp';
import { useAuth } from '@src/services/AuthContext';
import { usePages } from '@src/services/PagesContext';

const Navbar = () => {
  const { isProfilePopUpOpen, setIsProfilePopUpOpen } = useAuth()
  const { showMap, showHelp, showAboutUs, showRouteMap, toggleShowMap, toggleShowHelp, toggleShowReport } = usePages();

  const handleProfileClick = () => {
    setIsProfilePopUpOpen(!isProfilePopUpOpen);
  }

  return (
    <>
      <nav className='flex justify-center '>
        <div className="w-full md:w-[100%] fixed bg-white appBar">
          <div className="flex justify-between px-[14px] py-[15px] relative">
            <div className='flex items-center gap-2'>
              {!showMap && !showRouteMap && !showAboutUs ? (
                <button className="absolute left-0 ml-[17px]" onClick={toggleShowMap}>
                  <img className=" rounded-full hover:brightness-110 hover:shadow-lg" src="images/back.svg" alt="back" width={27} height={27}/>
                </button>
              ) : (
                <>
                  <button onClick={toggleShowHelp}>
                    <div><Image src="/images/help.svg" alt='help' width={23} height={23} /></div>
                  </button>
                  <button onClick={toggleShowReport}>
                    <div><Image src="/images/report.svg" alt='report' width={27} height={27} /></div>
                  </button>        
                </>
              )}
            </div>
            <button className='flex items-center ml-[-10px] logo' onClick={toggleShowMap}>
              {!showMap && !showRouteMap && !showAboutUs ? (
                showHelp ? (
                  <p className="text-center ml-14 text-[14px] font-bold text-[#0078C9] font-montserrat leading-[16px]">Pusat <br/> Bantuan </p>
                ) : (
                  <p className="text-center ml-14 text-[14px] font-bold text-[#0078C9] font-montserrat leading-[16px]">Lapor </p>
                )
              ) : (
                <div>
                  <Image src="/images/logo.svg" alt='logo' width={88} height={30} />
                </div>
              )}
            </button>
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