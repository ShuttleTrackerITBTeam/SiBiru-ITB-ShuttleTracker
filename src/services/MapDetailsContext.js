import React, { createContext, useContext, useState, useEffect } from "react";
import * as turf from '@turf/turf';
import { ref, get } from "firebase/database";
import { useDatabase } from "@src/services/Firebase";

const MapDetailsContext = createContext();

export const MapDetailsProvider = ({ children }) => {
  const database = useDatabase();

  const [location, setLocation] = useState();
  const [shuttles, setShuttles] = useState([]);
  const [selectedHalte, setSelectedHalte] = useState();
  const [selectedRoute, setSelectedRoute] = useState('');

  const routeMarkers = [
    { halte: 'Gerbang Utama', geoCode: [-6.933205, 107.768413], nextHalteEstimate: 120 },
    { halte: 'Labtek 1B', geoCode: [-6.929396, 107.768557], nextHalteEstimate: 60 },
    { halte: 'GKU 2', geoCode: [-6.929788, 107.769033], nextHalteEstimate: 60 },
    { halte: 'GKU 1A', geoCode: [-6.929079, 107.769818], nextHalteEstimate: 60 },
    { halte: 'Rektorat', geoCode: [-6.927963, 107.770518], nextHalteEstimate: 60 },
    { halte: 'Koica', geoCode: [-6.927467, 107.770047], nextHalteEstimate: 60 },
    { halte: 'GSG', geoCode: [-6.926586, 107.769261], nextHalteEstimate: 120 },
    { halte: 'GKU 1B', geoCode: [-6.929019, 107.770110], nextHalteEstimate: 60 },
    { halte: 'Parkiran Kehutanan', geoCode: [-6.931548, 107.770884], nextHalteEstimate: 120 }
  ]

  const route = [
    // ==== Main Gate ====
    [-6.933629, 107.768350], [-6.932798, 107.768344], [-6.932136, 107.768637],
    [-6.931763, 107.768779], [-6.931441, 107.768794], [-6.929420, 107.768277],
    [-6.929284, 107.768520], [-6.929365, 107.768625], [-6.929457, 107.768620],
    [-6.929606, 107.768343], [-6.930347, 107.768536], [-6.928266, 107.770839],
    [-6.925931, 107.768654], [-6.925508, 107.769094], [-6.927201, 107.770700],
    [-6.927606, 107.770259], [-6.928266, 107.770869], [-6.929038, 107.770054],
    [-6.929842, 107.770312], [-6.930405, 107.770477], [-6.931596, 107.770825],
    [-6.932023, 107.770862], [-6.932260, 107.770825], [-6.932451, 107.770642],
    [-6.932620, 107.770232], [-6.932678, 107.769916], [-6.932591, 107.769699],
    [-6.931975, 107.769131], [-6.931928, 107.768897], [-6.932184, 107.768622],
    [-6.932732, 107.768369], [-6.933629, 107.768350]
  ]

  const fetchLocation = async () => {
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
  };

  const fetchShuttles = () => {
    const dbShuttleDataRef = ref(database, 'shuttleData');
    const dbActiveShuttleRef = ref(database, 'activeShuttle');
    let shuttleDatas = {};
    let shuttleIDs = {};
    let activeShuttles = {};

    Promise.all([get(dbShuttleDataRef), get(dbActiveShuttleRef)]).then(([shuttleDataSnapshot, activeShuttleSnapshot]) => {
      if (shuttleDataSnapshot.exists()) {
        shuttleDatas = shuttleDataSnapshot.val();
        shuttleIDs = Object.keys(shuttleDatas);
      }

      if (activeShuttleSnapshot.exists()) {
        activeShuttles = activeShuttleSnapshot.val();
      }

      let newShuttles = getShuttles(shuttleDatas, shuttleIDs, activeShuttles);
      setShuttles(newShuttles);
    }).catch((error) => {
      console.error(error);
    });
  }

  function getShuttles(shuttleDatas, shuttleIDs, activeShuttles) {
    let newShuttle = [];

    let j = 0;
    for (let i = 0; i < shuttleIDs.length; i++) {
      if (Object.keys(activeShuttles).includes(shuttleIDs[i])) {
        newShuttle[j] = {
          loaded: true,
          id: shuttleIDs[i],
          coordinates: {
            lat: activeShuttles[shuttleIDs[i]].l[0],
            lng: activeShuttles[shuttleIDs[i]].l[1],
          },
          halte: shuttleDatas[shuttleIDs[i]].halte,
          status: shuttleDatas[shuttleIDs[i]].status,
          route: shuttleDatas[shuttleIDs[i]].route,
          waitingTime: 0,
          arriveTime: '00:00',
          error: null,
        }
  
        if (selectedHalte) {
          const waitingTime = calculateWaitingTime(newShuttle[j], selectedHalte);
          if (waitingTime === -1) {
            newShuttle[j].waitingTime = 0;
            newShuttle[j].arriveTime = '--:--';
          }
          else {
            const arriveTime = calculateArrivingTime(waitingTime);
            newShuttle[j].waitingTime = waitingTime;
            newShuttle[j].arriveTime = arriveTime;
          }
        }

        j++;
      }
    }

    return newShuttle;
  }

  function getNearestHalte(location, markers) {
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

  function calculateWaitingTime(shuttle, halte) {
    var start = -1;
    var end = -1;
    var waitingTime = 0;
    var route = routeMarkers;

    for (let i = 0; i < route.length; i++) {
      if (route[i].halte === halte.halte) {
        end = i ;
        break;
      }
    }

    if (end === -1) {
      return -1;
    }

    for (let i = 0; i < route.length; i++) {
      if (route[i].halte === shuttle.halte) {
        start = i - 1;
        if (i <= 0) {
          start = route.length - 1;
        }
        break;
      }
    }

    if (start === end) {
      start = 0;
      end = route.length - 1;
    }

    while (start !== end) {
      waitingTime = waitingTime + route[start].nextHalteEstimate;

      if (end === 0) {
        end = route.length - 1;
      } else {
        end = end - 1;
      }
    }

    waitingTime = waitingTime
    return Math.ceil(waitingTime / 60);
  }
  
  function calculateArrivingTime(waitingTime) {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const arriveHours = Math.floor(waitingTime / 60);
    const arriveMinutes = Math.floor(waitingTime % 60);

    if (hours + arriveHours >= 24) {
      return `--:--`;
    }

    if (minutes + arriveMinutes >= 60) {
      return `${(hours + arriveHours + 1).toString().padStart(2, '0')}:${((minutes + arriveMinutes) % 60).toString().padStart(2, '0')}`;
    }

    return `${(hours + arriveHours).toString().padStart(2, '0')}:${(minutes + arriveMinutes).toString().padStart(2, '0')}`;
  }

  function getContents() {
    fetchShuttles();
    fetchLocation();
  }

  useEffect(() => {
    getContents();

    const interval = setInterval(() => {
      getContents();
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedHalte, selectedRoute]);
  
  return (
    <MapDetailsContext.Provider value={{
        location, setLocation,
        shuttles, setShuttles,
        selectedHalte, setSelectedHalte,
        selectedRoute, setSelectedRoute,
        routeMarkers, route,
        fetchLocation, fetchShuttles,
        getNearestHalte, calculateWaitingTime, 
        calculateArrivingTime,
      }}
    >
      {children}
    </MapDetailsContext.Provider>
  );
}

export const useMapDetails = () => useContext(MapDetailsContext);
