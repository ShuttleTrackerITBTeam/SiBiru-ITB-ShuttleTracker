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
  const [showBlueLine, setShowBlueLine] = useState(true);
  const [showGreyLine, setShowGreyLine] = useState(true);

  const blueRouteMarkers = [
      { halte : 'Gerbang Utama', geoCode : [-6.933205, 107.768413], nextHalteEstimate : 210 },
      { halte : 'Labtek 1B', geoCode : [-6.929396, 107.768557], nextHalteEstimate : 100 },
      { halte : 'GKU 2', geoCode : [-6.929788, 107.769033], nextHalteEstimate : 100 },
      { halte : 'GKU 1', geoCode : [-6.929119, 107.769818], nextHalteEstimate : 130 },
      { halte : 'Rektorat', geoCode : [-6.927963, 107.770518], nextHalteEstimate : 100 },
      { halte : 'GKU 3 / Koica', geoCode : [-6.927467, 107.770047], nextHalteEstimate : 100 },
      { halte : 'GSG', geoCode : [-6.926586, 107.769261], nextHalteEstimate : 130, },
      { halte : 'Asrama', geoCode : [-6.926399, 107.767933], nextHalteEstimate : 300 }
  ]
      
  const greyRouteMarkers = [
      { halte : 'Gerbang Utama', geoCode : [-6.933205, 107.768413], nextHalteEstimate : 300 },
      { halte : 'Asrama', geoCode : [-6.926399, 107.767933], nextHalteEstimate : 130 },
      { halte : 'GSG', geoCode : [-6.926586, 107.769261], nextHalteEstimate : 100 },
      { halte : 'GKU 3 / Koica', geoCode : [-6.927467, 107.770047], nextHalteEstimate : 100 },
      { halte : 'Rektorat', geoCode : [-6.927963, 107.770518], nextHalteEstimate : 210 },
      { halte : 'Parkiran Kehutanan', geoCode : [-6.931548, 107.770884], nextHalteEstimate : 300 },
  ]

  const halteMarkers = [
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
        popUp : "Rektorat"
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
  
  const blueRoute = [
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
  
  const greyRoute = [
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

      let newShuttles = getShuttles(shuttles, shuttleDatas, shuttleIDs, activeShuttles);
      setShuttles(newShuttles);
    }).catch((error) => {
      console.error(error);
    });
  }

  function getShuttles(shuttles, shuttleDatas, shuttleIDs, activeShuttles) {
    let newShuttle = [...shuttles];

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
          countMhs: shuttleDatas[shuttleIDs[i]].countMhs,
          route: shuttleDatas[shuttleIDs[i]].route,
          waitingTime: 0,
          arriveTime: '00:00',
          error: null,
        }
  
        if (selectedHalte) {
          console.log("Selected Halte: " + selectedHalte.popUp);
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

    if (selectedRoute === "Blue") {
      newShuttle = newShuttle.filter(shuttle => shuttle.route === "Blue");
    }
    else if (selectedRoute === "Grey") {
      newShuttle = newShuttle.filter(shuttle => shuttle.route === "Grey");
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
    var route;

    if (shuttle.route === "Blue") route = blueRouteMarkers;
    if (shuttle.route === "Grey") route = greyRouteMarkers;

    for (let i = 0; i < route.length; i++) {
      if (route[i].halte === halte.popUp) {
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

    waitingTime = waitingTime + Math.round(turf.distance(turf.point([shuttle.coordinates.lng, shuttle.coordinates.lat]), turf.point([route[end].geoCode[1], route[end].geoCode[0]]), {units: 'meters'}) / (30));
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

  function getPreviousHalte(shuttle) {
    var previousStop = '';
    var route;
    if (shuttle.route === "Blue") route = blueRouteMarkers;
    if (shuttle.route === "Grey") route = greyRouteMarkers;

    for (let i = 0; i < route.length; i++) {
      if (route[i].halte === shuttle.halte) {
        if (i === 0) {
          previousStop = route[route.length - 1].halte;
        } else {
          previousStop = route[i - 1].halte;
        }
        break;
      }
    }

    return previousStop;
  }

  function getContents() {
    fetchShuttles();
    fetchLocation();
  }

  useEffect(() => {
    getContents();

    const interval = setInterval(() => {
      getContents
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedHalte, selectedRoute]);
  
  return (
    <MapDetailsContext.Provider value={{
        location, setLocation,
        shuttles, setShuttles,
        selectedHalte, setSelectedHalte,
        selectedRoute, setSelectedRoute,
        showBlueLine, setShowBlueLine,
        showGreyLine, setShowGreyLine,
        blueRouteMarkers, greyRouteMarkers,
        halteMarkers, blueRoute, greyRoute, 
        fetchLocation, fetchShuttles,
        getNearestHalte, calculateWaitingTime, 
        calculateArrivingTime, getPreviousHalte
      }}
    >
      {children}
    </MapDetailsContext.Provider>
  );
}

export const useMapDetails = () => useContext(MapDetailsContext);
