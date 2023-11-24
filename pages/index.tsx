import exp from "constants";
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "@src/components/Navbar";
import LoginWarning from "@src/components/LoginWarning";
import React, { useEffect, useState } from 'react';

const Map = dynamic(() => import("@src/components/map"), { ssr: false });

export default function Home() {
  return (
    <>
      <Head>
        <title>Homepage Shuttle Tracker ITB</title>
        <meta name="description" content="Shuttle Tracker ITB" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <main>
        <div className="relative">
        <Navbar/>
        <Map />
        </div>
      </main>
    </>
  );
}