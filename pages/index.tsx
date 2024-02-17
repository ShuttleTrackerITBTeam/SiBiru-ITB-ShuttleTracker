import React from 'react';
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "@src/components/Navbar";
import Help from "../src/pages/Help";
import Report from "../src/pages/Report";
import RouteMap from "../src/pages/RouteMap";
import AboutUs from '../src/pages/AboutUs';
import SplashScreen from "../src/pages/SplashScreen";
import { PagesProvider } from "@src/services/PagesContext";
import { MapDetailsProvider } from "@src/services/MapDetailsContext";

const Map = dynamic(() => import("../src/pages/Map"), { ssr: false });

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
        <PagesProvider>
          <MapDetailsProvider>
            <SplashScreen /> 
            <div className="relative">
              <div>
                <>
                  <div>
                    <Navbar />
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
      </main>
    </>
  );
}
