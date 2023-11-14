import exp from "constants";
import dynamic from "next/dynamic";
import Head from "next/head";

const Map = dynamic(() => import("@src/components/map/map"), { ssr: false });

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
        <Map />
      </main>
    </>
  );
}