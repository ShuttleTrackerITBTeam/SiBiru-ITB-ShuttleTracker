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

const Map = dynamic(() => import("@src/components/map"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const splashScreenLastShown = parseInt(localStorage.getItem('splashScreenLastShown') || '0');
    const now = new Date().getTime();

    if (!splashScreenLastShown || now - splashScreenLastShown > 3600000) { // 3600000 ms = 1 hour
      setLoading(true);
      localStorage.setItem('splashScreenLastShown', String(now));

      const timer = setTimeout(() => {
        setLoading(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);
  

  return (
    <>
      <Head>
        <title>SiBiru ITB Shuttle Tracker</title>
        <meta name="description" content="Shuttle Tracker ITB" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <AuthProvider>
          <PagesProvider>
            <div className="relative">
              <div>
              {loading ? <SplashScreen  /> : (
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
              )}
              </div>
            </div>
          </PagesProvider>
        </AuthProvider>
      </main>
    </>
  );
}
