import React, { createContext, useContext, useState, useEffect } from "react";
import * as turf from '@turf/turf';
import { useAuth } from "@src/services/AuthContext";

const MapDetailsContext = createContext();

export const MapDetailsProvider = ({ children }) => {
  const { user } = useAuth();
  const [location, setLocation] = useState();
  const [bus1, setBus1] = useState([]);
  const [bus2, setBus2] = useState([]);
  const [busses, setBusses] = useState([]);
  const [selectedStop, setSelectedStop] = useState();
  const [selectedRoute, setSelectedRoute] = useState('');
  const [showBlueLine, setShowBlueLine] = useState(true);
  const [showGreyLine, setShowGreyLine] = useState(true);

  const markRoute1 = [
      { halte : 'Gerbang Utama', geoCode : [-6.933205, 107.768413], estimasi : 350 },
      { halte : 'Labtek 1B', geoCode : [-6.929396, 107.768557], estimasi : 250 },
      { halte : 'GKU 2', geoCode : [-6.929788, 107.769033], estimasi : 100 },
      { halte : 'GKU 1', geoCode : [-6.929119, 107.769818], estimasi : 190 },
      { halte : 'Gedung Rektorat', geoCode : [-6.927963, 107.770518], estimasi : 100 },
      { halte : 'GKU 3 / Koica', geoCode : [-6.927467, 107.770047], estimasi : 130 },
      { halte : 'GSG', geoCode : [-6.926586, 107.769261], estimasi : 130, },
      { halte : 'Asrama', geoCode : [-6.926399, 107.767933], estimasi : 370 }
  ]
      
  const markRoute2 = [
      { halte : 'Gerbang Utama', geoCode : [-6.933205, 107.768413], estimasi : 100 },
      { halte : 'Asrama', geoCode : [-6.926399, 107.767933], estimasi : 100 },
      { halte : 'GSG', geoCode : [-6.926586, 107.769261], estimasi : 130 },
      { halte : 'GKU 3 / Koica', geoCode : [-6.927467, 107.770047], estimasi : 100 },
      { halte : 'Gedung Rektorat', geoCode : [-6.927963, 107.770518], estimasi : 250 },
      { halte : 'Parkiran Kehutanan', geoCode : [-6.931548, 107.770884], estimasi : 350 },
  ]

  const markers = [
      {
        geoCode : [-6.929396, 107.768557],
        popUp : "Labtek 1B"
      },
      {
        geoCode : [-6.929788, 107.769033],
        popUp : "GKU 2"
      },
      {
        geoCode : [-6.929119, 107.769818],
        popUp : "GKU 1"
      },
      {
        geoCode : [-6.927963, 107.770518],
        popUp : "Gedung Rektorat"
      },
      {
        geoCode : [-6.927467, 107.770047],
        popUp : "GKU 3 / Koica"
      },
      {
        geoCode : [-6.926586, 107.769261],
        popUp : "GSG"
      },
      {
        geoCode : [-6.926399, 107.767933],
        popUp : "Asrama"
      },
      {
        geoCode : [-6.931548, 107.770884],
        popUp : "Parkiran Kehutanan"
      },
      {
        geoCode : [-6.933205, 107.768413],
        popUp : "Gerbang Utama"
      }
    ];
  
  const route = [
    // ==== Main Gate ====
    [-6.933629, 107.768350], [-6.932798, 107.768344], [-6.932136, 107.768637],
    [-6.931763, 107.768779], [-6.931441, 107.768794], [-6.929420, 107.768277],
    [-6.929284, 107.768520], [-6.929365, 107.768625], [-6.929457, 107.768620],
    [-6.929606, 107.768343], [-6.930347, 107.768536], [-6.928266, 107.770839],
    [-6.926311, 107.769114], [-6.926383, 107.769041], [-6.925930, 107.768640],
    [-6.926707, 107.767768], [-6.926877, 107.767673], [-6.927600, 107.767534],
    [-6.927928, 107.767506], [-6.928605, 107.767725], [-6.929118, 107.768162],
    [-6.931424, 107.768804], [-6.931695, 107.768913], [-6.931831, 107.769009],
    [-6.932200, 107.768610], [-6.932732, 107.768369], [-6.933629, 107.768350]
  ]
  
  const route2 = [
    // ==== Main Gate ====
    [-6.929038, 107.770054], [-6.929842, 107.770312], [-6.930405, 107.770477],
    [-6.931596, 107.770825], [-6.932023, 107.770862], [-6.932260, 107.770825],
    [-6.932451, 107.770642], [-6.932620, 107.770232], [-6.932678, 107.769916],
    [-6.932591, 107.769699], [-6.931975, 107.769131], [-6.931928, 107.768897],
    [-6.932184, 107.768622], [-6.932732, 107.768369], [-6.933629, 107.768350],
    [-6.933579, 107.768269], [-6.933073, 107.768255], [-6.932812, 107.768286],
    [-6.932703, 107.768308], [-6.932604, 107.768348], [-6.932433, 107.768423],
    [-6.932171, 107.768555], [-6.931787, 107.768752], [-6.931583, 107.768781],
    [-6.931444, 107.768774], [-6.930817, 107.768607], [-6.929402, 107.768214],
    [-6.929127, 107.768123], [-6.928935, 107.767965], [-6.928672, 107.767723],
    [-6.928472, 107.767622], [-6.928173, 107.767513], [-6.927987, 107.767475],
    [-6.927910, 107.767454], [-6.927796, 107.767475], [-6.927701, 107.767494],
    [-6.927407, 107.767557], [-6.926887, 107.767665], [-6.926731, 107.767731],
    [-6.926670, 107.767771], [-6.925911, 107.768629], [-6.926380, 107.769074],
    [-6.926585, 107.769332], [-6.926853, 107.769543], [-6.927022, 107.769694],
    [-6.927203, 107.769821], [-6.928289, 107.770832], [-6.928560, 107.770547],
    [-6.928785, 107.770305], [-6.929038, 107.770054]
  ]

  const fetchLocation = () => {
    if (user) {
      const onSuccess = (location) => {
          setLocation({
            loaded: true,
            coordinates: {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            },
            error: null,
          });
      };
  
      const onError = (error) => {
        setLocation({
          loaded: true,
          coordinates: {
            lat: 0,
            lng: 0,
          },
          error: {
            code: error.code,
            message: error.message,
          },
        });
        console.log("Error: " + error.message);
      };
  
      if (!("geolocation" in navigator)) {
        onError({
          code: 0,
          message: "Geolocation not supported",
        });
      }
  
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
  };

  const fetchContents = async () => {
    try {
      const res = await fetch('https://shuttle-tracker-itb-backend.vercel.app/track-shuttle/Jhfxmkh6sFecE3xEWAJXZCpY9lC2')
      const data = await res.json()
      
      const rute1 = data.data.Rute1
      const rute2 = data.data.Rute2;
      
      const length1 = Object.keys(rute1).length;
      const length2 = Object.keys(rute2).length;
  
      const newBus = getBus(bus1, rute1, length1, 1);
      const newBus2 = getBus(bus2, rute2, length2, 2);
  
      setBus1(newBus)
      setBus2(newBus2);
    } catch (err) {
      console.log(err)
    }
  }

  function getBus(bus, rute, length, selectedRoute) {
    let newBus = [...bus];

    for (let i = 0; i < length; i++) {
      var mhs = 0;
      if (rute[`Bus${i + 1}`].countMhs <= 19) {
        mhs = rute[`Bus${i + 1}`].countMhs;
      } else {
        mhs = 19;
      }

      newBus[i] = {
        loaded: true,
        namaBus : rute[`Bus${i + 1}`].namaBus,
        coordinates: {
          lat: rute[`Bus${i + 1}`].latitude,
          lng: rute[`Bus${i + 1}`].longitude,
        },
        halte: rute[`Bus${i + 1}`].Terminal,
        numberMhs: mhs,
        waitingTime: 0,
        arriveTime: '00:00',
        error: null,
      }

      if (selectedStop) {
        if (selectedRoute === 1) {
          const waitingTime = calculateWaitingTime(newBus[i], 1, selectedStop);
          const arriveTime = calculateArrivingTime(waitingTime);
          newBus[i].waitingTime = waitingTime;
          newBus[i].arriveTime = arriveTime;
        } else {
          const waitingTime = calculateWaitingTime(newBus[i], 2, selectedStop);
          const arriveTime = calculateArrivingTime(waitingTime);
          newBus[i].waitingTime = waitingTime;
          newBus[i].arriveTime = arriveTime;
        }
      }
    }

    return newBus;
  }

  function getNearestStop(location, markers) {
    if (location === undefined) return;

    let idx = 0;
    let distance = turf.distance(turf.point([location.coordinates.lng, location.coordinates.lat]), turf.point([markers[0].geoCode[1], markers[0].geoCode[0]]), {units: 'meters'});
    for (let i = 1; i < markers.length; i++) {
      let temp = turf.distance(turf.point([location.coordinates.lng, location.coordinates.lat]), turf.point([markers[i].geoCode[1], markers[i].geoCode[0]]), {units: 'meters'});
      if (temp < distance) {
        distance = temp;
        idx = i;
      }
    }
    return markers[idx];
  }

  function calculateWaitingTime(bus, route, target) {
    var start = 0;
    var end = 0;
    var waitingTime = 0;
    var markRoute;

    if (route === 1) {
      markRoute = markRoute1;
    } else {
      markRoute = markRoute2;
    }

    for (let i = 0; i < markRoute.length; i++) {
      if (markRoute[i].halte === target.popUp) {
        start = i - 1;
        if (i <= 0) {
          start = markRoute.length - 1;
        }
        break;
      }
    }

    for (let i = 0; i < markRoute.length; i++) {
      if (markRoute[i].halte === bus.halte) {
        end = i;
        break;
      }
    }

    while (start !== end) {
      waitingTime = waitingTime + markRoute[start].estimasi;

      if (start === 0) {
        start = markRoute.length - 1;
      } else {
        start = start - 1;
      }
    }

    waitingTime = waitingTime + Math.round(turf.distance(turf.point([bus.coordinates.lng, bus.coordinates.lat]), turf.point([markRoute[end].geoCode[1], markRoute[end].geoCode[0]]), {units: 'meters'}) / (30));
    return Math.ceil(waitingTime / 60);
  }
  
  function calculateArrivingTime(waitingTime) {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const arriveHours = Math.floor(waitingTime / 60);
    const arriveMinutes = Math.floor(waitingTime % 60);

    if (minutes + arriveMinutes >= 60) {
      return `${(hours + arriveHours + 1).toString().padStart(2, '0')}:${((minutes + arriveMinutes) % 60).toString().padStart(2, '0')}`;
    }

    return `${(hours + arriveHours).toString().padStart(2, '0')}:${(minutes + arriveMinutes).toString().padStart(2, '0')}`;
  }

  function getBusses(selectedStop, bus1, bus2) {
    if (selectedStop === null ) return [];

    let busses = [];

    if (showGreyLine) {
      for (let i = 0; i < markRoute1.length; i++) {
        if (markRoute1[i].halte === selectedStop?.popUp) {
          busses.push(bus1);
        }
      }
    }

    if (showBlueLine) {
      for (let i = 0; i < markRoute2.length; i++) {
        if (markRoute2[i].halte === selectedStop?.popUp) {
          busses.push(bus2);
        }
      }
    }

    return busses;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      fetchContents();
      fetchLocation();
    }, 1000);

    return () => clearInterval(interval);
  }, [user, fetchContents, fetchLocation, selectedStop, setSelectedStop, busses]);
  
  return (
    <MapDetailsContext.Provider value={{
        location, setLocation,
        bus1, setBus1,
        bus2, setBus2,
        busses, setBusses,
        selectedStop, setSelectedStop,
        selectedRoute, setSelectedRoute,
        showBlueLine, setShowBlueLine,
        showGreyLine, setShowGreyLine,
        markRoute1, markRoute2,
        markers, route, route2, 
        fetchLocation, fetchContents,
        getNearestStop, calculateWaitingTime, 
        calculateArrivingTime, getBusses 
      }}
    >
      {children}
    </MapDetailsContext.Provider>
  );
}

export const useMapDetails = () => useContext(MapDetailsContext);
