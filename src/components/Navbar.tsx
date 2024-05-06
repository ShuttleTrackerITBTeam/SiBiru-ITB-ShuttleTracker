import React from 'react';
import Image from 'next/image';
import { usePages } from '@src/services/PagesContext';

const Navbar = () => {
  const { 
    showMap, showHelp, showReport, showAboutUs, showRouteMap, toggleShowMap, 
    toggleShowHelp, toggleShowReport, toggleShowAboutUs
  } = usePages();

  const handleProfileClick = () => {
    toggleShowAboutUs();
  }

  return (
    <>
      <nav className='flex justify-center '>
        <div className="w-full md:w-[100%] h-[64px] fixed bg-white appBar">
          <div className="flex justify-between px-[14px] py-[15px] relative">
            <div className='flex items-center gap-2'>
              {!showMap && !showRouteMap ? (
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
              {!showMap && !showRouteMap ? (
                showHelp && (
                  <p className="text-center mt-1 ml-14 text-[18px] font-bold text-[#0078C9] font-montserrat">Pusat Bantuan</p>
                ) || showReport && (
                  <p className="text-center mt-1 ml-14 text-[18px] font-bold text-[#0078C9] font-montserrat">Lapor</p>
                ) || showAboutUs && (
                  <p className="text-center mt-1 ml-14 text-[18px] font-bold text-[#0078C9] font-montserrat">About Us</p>
                )
              ) : (
                <>
                  <div>
                    <Image src="/images/logo.svg" alt='logo' width={88} height={80} />
                  </div>
                  <p className="text-center mt-5 ml-1 text-[10px] font-bold text-[#0078C9] font-montserrat">Beta</p>
                </>
              )}
            </button>
            <div className='flex items-center mb-[1px]'>
              <button onClick={handleProfileClick}>
                <Image src="/images/info.svg" alt='more information' width={28} height={28} />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;