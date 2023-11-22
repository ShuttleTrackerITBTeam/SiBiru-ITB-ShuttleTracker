import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  title: string;
  links: { label: string; href: string }[];
}

const Navbar: React.FC<NavbarProps> = ({ title, links }) => {
  return (
    <nav className='flex justify-center '>
      <div className="w-full md:w-[468px] fixed bg-white appBar">
        <div className="flex justify-between px-[14px] py-[15px]">
          <div className='flex items-center'>
            <Link href='/help'>
            <div><Image src="/images/help.svg" alt='help' width={23} height={23} /></div>
            </Link>
            <Link href="/report">
            <div><Image src="/images/report.svg" alt='report' width={27} height={27} /></div>
            </Link>        
          </div>
          <div className='flex items-center logo'>
            <Link href="/">
              <div>
                <Image src="/images/logo.svg" alt='logo' width={69} height={38} />
              </div>
            </Link>
          </div>
          <div className='flex items-center'>
            <Link href="/profile"><div><Image src="/images/profile.svg" alt='logo' width={33} height={33} /></div></Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;