import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "@src/components/Navbar";
import LoginPopUp from "@src/components/LoginPopUp";
import Help from "@src/components/Help";
import Report from "@src/components/Report";
import RouteMap from "@src/components/RouteMap";
import AboutUs from '@src/components/AboutUs';
import SplashScreen from "@src/components/SplashScreen";
import { AuthProvider } from "@src/services/AuthContext";
import { PagesProvider } from "@src/services/PagesContext";
import { MapDetailsProvider } from "@src/services/MapDetailsContext";

const Map = dynamic(() => import("@src/components/Map"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>SiBiru ITB Shuttle Tracker</title>
        <meta name="description" content="Shuttle Tracker ITB" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <AuthProvider>
          <PagesProvider>
            <MapDetailsProvider>
              <SplashScreen /> 
              <div className="relative">
                <div>
                  <>
                    <div>
                      <Navbar />
                      <LoginPopUp />
                    </div>
                    <Map />
                    <RouteMap />
                    <AboutUs />
                    <Help />
                    <Report />
                  </>
                </div>
              </div>
            </MapDetailsProvider>
          </PagesProvider>
        </AuthProvider>
      </main>
    </>
  );
}
