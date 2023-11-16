import exp from "constants";
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "@src/components/Navbar";

const Map = dynamic(() => import("@src/components/map/map"), { ssr: false });

export default function Home() {
  const navbarLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];
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
        <Navbar title="My App" links={navbarLinks} />
        </div>
        <div className="">
        <Map />
        </div>
      </main>
    </>
  );
}