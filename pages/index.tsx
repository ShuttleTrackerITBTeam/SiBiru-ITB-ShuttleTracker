import exp from "constants";
import dynamic from "next/dynamic";
import Head from "next/head";
import { AuthProvider } from "@src/services/AuthContext";
import Navbar from "@src/components/Navbar";
import Login from "@src/components/LoginPopUp";
import React, { useState, useEffect } from 'react';
import SplashScreen from "@src/components/SplashScreen";

const Map = dynamic(() => import("@src/components/Map"), { ssr: false });

export default function Home() {

  const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer); // Clean up on component unmount
    }, []);

  return (
    <>
      <Head>
        <title>Homepage Shuttle Tracker ITB</title>
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
                <Navbar />
                <Login />
              </>
            )}
            </div>
            <Map  />
          </div>
        </AuthProvider>
        <div />
      </main>
    </>
  );
}
