import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface RouteMapProps {
    show: boolean;
    setShow: (show: boolean) => void;
}

const RouteMap: React.FC<RouteMapProps> = ({ show, setShow }) => {
    return (
        <div>
            {!show && (
                <div className = "fixed top-20 w-screen flex justify-end z-[500]">
                    <button onClick={() => setShow(true)}>
                        <div 
                        className = "bg-white w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                        style={{ boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.25)' }}>
                            <Image
                                src = "/images/iconRouteMap.svg"
                                alt = "route-map"
                                width = {20}
                                height = {20}
                                style = {{ cursor: 'pointer' }}
                            />
                        </div>
                    </button>
                </div>
            )}
            {show && (
                <div className = "fixed h-screen w-screen flex items-center justify-center">
                    <div className = "h-screen w-[328px]">
                        <div className = "flex flex-col justify-center items-center mt-20 font-open-sans">
                            <div className = "w-screen flex flex-row items-center justify-end">
                                <div className = "w-[32px]" />
                                <div className = "sticky w-screen ml-6">
                                    <h2 className = "text-center text-[18px] font-bold font-montserrat text-[#002582]">Shuttle Route Map</h2>
                                </div>
                                <div className = "px-3 z-10">
                                    <button onClick={() => setShow(false)}>
                                        <Image
                                            src = "/images/closeBusPanel.svg"
                                            alt = "close-button"
                                            width = {32}
                                            height = {32}
                                            style = {{ cursor: 'pointer' }}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className = "mx-[15px] mt-[20px] bg-[#005CB1] bg-opacity-[8%] rounded-lg flex items-center justify-center">
                                <Link href = "/routeMap" className = "mx-auto mb-[1px]">
                                    <Image
                                        src = "/images/routeMap.svg"
                                        alt = "route-map"
                                        width = {300}
                                        height = {200}
                                    />
                                </Link>
                            </div>
                            <div className ="flex flex-col items-center">
                                <h3 className = "text-center text-[16px] font-bold font-montserrat text-[#002582] mt-[15px]">Jadwal Shuttle</h3>
                            </div>
                            <div className = "mt-[15px] w-full font-open-sans">
                                <ul className = "mt-[15px] ml-[20px] pb-20">
                                    <li className = "flex justify-between mt-[15px]">
                                        <p className = "text-justify-left text-[14px] leading-[19px] text-[#002582]">Jam Operasional</p>
                                    </li>
                                    <li className = "flex justify-between mt-[10px]">
                                        <p className = "text-[14px] leading-[19px] text-[#002582]">
                                        <span className = "font-bold text-[#002582]">Senin - Jumat</span> : 06.00 - 18.00 WIB</p>
                                    </li>
                                    <li className = "flex justify-between mt-[4px]">
                                        <p className = "text-[14px] leading-[19px] text-[#002582]">
                                        <span className = "font-bold text-[#002582]">Sabtu - Minggu</span> : Tidak Beroperasi</p>
                                    </li>
                                </ul>   
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}; 

export default RouteMap; 
