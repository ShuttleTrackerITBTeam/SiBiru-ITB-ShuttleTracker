import React from 'react';
import Image from 'next/image';

interface NavbarProps {
  title: string;
  links: { label: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ title, links }) => {
  return (
    <nav className='flex justify-center'>
      <div className="w-[390px] z-[200] appBar">
        <div className="flex justify-between px-[14px] py-[15px]">
          <div className='flex items-center'>
            <a href="/help"><Image src="/images/help.svg" alt='help' width={23} height={23} /></a>
            <a href="/report"><Image src="/images/report.svg" alt='report' width={27} height={27} /></a>
          </div>
          <div className='flex items-center logo'>
            <a href="/"><Image src="/images/logo.svg" alt='logo' width={69} height={38} /></a>
          </div>
          <div className='flex items-center'>
            <a href="/profile"><Image src="/images/profile.svg" alt='logo' width={33} height={33} /></a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;