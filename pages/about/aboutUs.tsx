import React from 'react';
import Navbar from "@src/components/Navbar";
import Carousel from "./Carousel";

const Items = [
    designer(),
    requirement(),
    software(),
    supervisor(),
  ];


const AboutUs = () => {
    return (
        <div className="flex flex-col items-center min-h-screen">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Scrollable Content */}
      <div className="flex flex-col items-center  flex-grow">
        <div className="w-96 h-24" />

        <div className="relative w-96 bg-[#c4eeff8c] rounded-lg p-4">
          <div className="flex flex-col justify-center items-center">
            <img src="/images/logo mark - light.svg" className="w-16 h-16" />
            <h2 className="text-center mt-4 font-montserrat" style={{ color: '#00096B', fontSize: '24px' }}>
              About SiBiru
            </h2>
            <p className="w-88 font-normal text-sm text-justify leading-normal" style={{ fontFamily: 'Open_Sans-Regular,Helvetica', color: '#00096B' }}>
              SiBiru, teman setiamu di kampus ITB! Cari info tepat waktu tentang lokasi dan waktu kedatangan shuttle di beberapa titik di ITB! Ayo nikmati perjalanan seru dengan SiBiru!
            </p>
          </div>
        </div>

        <div className="w-[280px] mt-4 font-montserrat font-[number:var(--h2-font-weight)] text-base-color-1secondary-color-15 text-[length:var(--h2-font-size)] text-center tracking-[var(--h2-letter-spacing)] leading-[var(--h2-line-height)] whitespace-nowrap [font-style:var(--h2-font-style)]" style={{ color: '#002582', fontSize: '24px', fontWeight: 500 }}>
          Our Team
        </div>

        <Carousel items={Items} />
      </div>
    </div>
    );
}

function software(){
    return(
        <div className="flex flex-col items-center">
            <img src="/images/fotoProfileAbout/aboutSoftware.png" className="h-24" />
            <img src="/images/fotoProfileAbout/software.svg"/>
        </div>
    );
}

function designer(){
    return(
        <div className="flex flex-col items-center">
            <img src="/images/fotoProfileAbout/aboutDesigner.png" className="h-24" />
            <img src="/images/fotoProfileAbout/designer.svg"/>
        </div>
    );
}

function requirement(){
    return(
        <div className="flex flex-col items-center">
            <img src="/images/fotoProfileAbout/aboutRequirement.png" className="h-24" />
            <img src="/images/fotoProfileAbout/requirement.svg"/>
        </div>
    );
}

function supervisor(){
    return(
        <div className="flex flex-col items-center">
            <img src="/images/fotoProfileAbout/aboutSupervisor.png" className="h-24" />
            <img src="/images/fotoProfileAbout/supervisor.svg" className="h-48"/>
        </div>
    );
}

export default AboutUs;