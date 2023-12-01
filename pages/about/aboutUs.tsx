import React from 'react';
import Navbar from "@src/components/Navbar";

const AboutUs = () => {
    return (
        <div className="flex flex-col items-center">
            <Navbar />
            <div className="w-96 h-24" />
            <div className="relative w-96 bg-[#c4eeff8c] rounded-lg">
                <div className="flex flex-col justify-center items-center p-4">
                    <img src="/images/logo mark - light.svg" className="w-16 h-16" />
                    <h2 className="text-center text-2xl mt-4">
                        About Sibiru
                    </h2>
                    <p className="w-88 font-normal text-sm text-justify leading-normal text-base-color-1secondary-color-16 mt-2" style={{ fontFamily: 'Open_Sans-Regular,Helvetica' }}>
                        SiBiru, teman setiamu di kampus ITB! Cari info tepat waktu tentang lokasi dan waktu kedatangan shuttle di
                        beberapa titik di ITB! Ayo nikmati perjalanan seru dengan SiBiru!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;