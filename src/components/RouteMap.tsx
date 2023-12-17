import React from 'react';
import Image from 'next/image';
import { usePages } from '@src/services/PagesContext';
import { useMapDetails } from '@src/services/MapDetailsContext';

const RouteMap = () => {
    const { showMap, showRouteMap, toggleShowRouteMap, toggleShowMap } = usePages();
    const { bus1, bus2 } = useMapDetails();

    return (
        <div>
            {(showMap && bus1 && bus2) && (
                <div className = "fixed top-20 right-0 flex justify-end z-[401]">
                    <button onClick={toggleShowRouteMap}>
                        <div 
                        className = "bg-white w-10 h-10 rounded-full mr-3 flex items-center justify-center"
                        style={{ boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.25)' }}>
                            <Image
                                src = "/images/iconRouteMap.svg"
                                alt = "route-map"
                                width = {24}
                                height = {24}
                                style = {{ cursor: 'pointer' }}
                            />
                        </div>
                    </button>
                </div>
            )}
            {showRouteMap && (
                <div className = "h-screen w-screen flex items-center justify-center overflow-y-auto overflow-x-hidden">
                    <div className = "h-screen w-[328px]">
                        <div className = "flex flex-col justify-center items-center mt-20 font-open-sans">
                            <div className = "w-screen flex flex-row items-center justify-end">
                                <div className = "w-[32px]" />
                                <div className = "sticky w-screen ml-6">
                                    <h2 className = "text-center text-[18px] font-bold font-montserrat text-[#002582]">Shuttle Route Map</h2>
                                </div>
                                <div className = "px-3 z-10">
                                    <button onClick={toggleShowMap}>
                                        <Image
                                            src = "/images/closeBusPanel.svg"
                                            alt = "close-button"
                                            width = {48}
                                            height = {48}
                                            style = {{ cursor: 'pointer' }}
                                        />
                                    </button>
                                </div>
                            </div>
                            <div className = "mx-[15px] mt-[20px] bg-[#005CB1] bg-opacity-[8%] rounded-lg flex items-center justify-center">
                                <Image
                                    src = "/images/routeMap.svg"
                                    alt = "route-map"
                                    width = {300}
                                    height = {200}
                                />
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
