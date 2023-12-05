import React, { useState, useEffect } from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "@src/components/Navbar";
import LoginPopUp from "@src/components/LoginPopUp";
import SplashScreen from "@src/components/SplashScreen";
import { AuthProvider } from "@src/services/AuthContext";

const Map = dynamic(() => import("@src/components/Map"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
  //     const timer = setTimeout(() => {
  //         setLoading(false);
  //     }, 1000);

  //     return () => clearTimeout(timer); // Clean up on component unmount
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
          <div className="relative">
            <div>
            {loading ? <SplashScreen  /> : (
              <>
              <div>
                <Navbar />
                <LoginPopUp />
              </div>
              <Map  />
              </>
            )}
            </div>
          </div>
        </AuthProvider>
      </main>
    </>
  );
}
