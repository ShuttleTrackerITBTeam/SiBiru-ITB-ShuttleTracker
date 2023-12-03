import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@src/components/Navbar';
import Footer from "@src/components/Footer";

const RouteMap = () => {
    return (
        <div className = "relative h-screen flex items-center justify-center">
            <div className = "h-full w-full md:w-[468px] bg-slate-50">
                <Navbar/>
                    <div className = "flex flex-col justify-center items-center mt-20 font-open-sans">
                        <div className = "flex items-center justify-end w-full px-4 mt-4">
                            <Link href = "../">
                                <Image
                                    src = "/images/closeBusPanel.svg"
                                    alt = "close-button"
                                    width = {32}
                                    height = {32}
                                    style = {{ cursor: 'pointer' }}
                                />
                            </Link>
                        </div>
                        <div className = "flex flex-col items-center">
                            <h2 className = "text-center text-[18px] font-bold font-montserrat text-[#002582]">Shuttle Route Map</h2>
                        </div>
                        <div className = "mx-[15px] mt-[20px] bg-[#005CB1] bg-opacity-[8%] rounded-lg flex items-center justify-center">
                            <Link href = "/routeMap" className = "mx-auto mb-[1px]">
                                <Image
                                    src = "/images/routeMap.svg"
                                    alt = "route-map"
                                    width = {370}
                                    height = {270}
                                />
                            </Link>
                        </div>
                        <div className ="flex flex-col items-center">
                            <h3 className = "text-center text-[16px] font-bold font-montserrat text-[#002582] mt-[15px]">Jadwal Shuttle</h3>
                        </div>
                    </div>
                    <div className = "mt-[15px] mx-[10px] font-open-sans">
                        <ul className = "mt-[15px] ml-[20px] pb-20">
                            <li className = "flex justify-between mt-[15px]">
                                <p className = "text-justify-left text-[14px] leading-[19px] text-[#002582]">Jam Operasional</p>
                            </li>
                            <li className = "flex justify-between mt-[18px]">
                                <p className = "text-[14px] leading-[19px] text-[#002582]">
                                <span className = "font-bold text-[#002582]">Senin - Jumat</span> : 06.00 - 18.00 WIB</p>
                            </li>
                            <li className = "flex justify-between mt-[12px]">
                                <p className = "text-[14px] leading-[19px] text-[#002582]">
                                <span className = "font-bold text-[#002582]">Sabtu - Minggu</span> : Tidak Beroperasi</p>
                            </li>
                        </ul>   
                    </div>
                <Footer/>
            </div>
        </div>
    );
}; 

<<<<<<< HEAD:src/components/routemap.tsx
export default RouteMap; 
=======
};
>>>>>>> 8b0a5016a3ab54b47e334821aea8ecc9cf773552:src/components/RouteMap.tsx
