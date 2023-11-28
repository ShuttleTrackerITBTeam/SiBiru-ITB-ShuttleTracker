import exp from "constants";
import dynamic from "next/dynamic";
import Head from "next/head";
import Navbar from "@src/components/Navbar";
import React, { useEffect, useState } from 'react';

const Map = dynamic(() => import("@src/components/Map"), { ssr: false });

export default function Home() {
  const [user, setUser] = useState<any>(null); // Initialize user state
  useEffect(() => {
    async function checklogin(){

      const fetchData = async () => {
        console.log('fetching data');
        try {
          const session = JSON.parse(localStorage.getItem('session') || '{ "access_token": "", "token_type": ""}');
          if(session.access_token == '') {
            console.log('session null : ', session);
            setUser(false);
            return;
          }
          const response = await fetch('http://localhost:8000/check-session/', {
            headers: {
              'Authorization': `Bearer ${session.access_token}`,
            },
    
          });
          if (response.ok) {
            const data = await response.json();
            console.log('Data:', JSON.stringify(data));
            setUser(true);
          } else {
            console.log('session : ', session);
            console.error('response not ok' + response.headers);
            console.log('Authorization : ' ,`Bearer ${session.access_token}`)
          }
          
        } catch (error) {
    
          console.error('Error fetching data:', error);
        }
      };
    
     await fetchData();
    }
    
    checklogin();
  
}, [user]);
console.log('user value : ', user);
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
        <Navbar user={user}/>
        <Map user={user} />
        </div>
      </main>
    </>
  );
}