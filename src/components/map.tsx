import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useAuth } from '@src/services/AuthContext';
import { usePages } from '@src/services/PagesContext';
import LoginWarning from './LoginWarning';

interface Bus {
  loaded: boolean;
  namaBus : string;
  coordinates: {
    lat: number;
    lng: number;
  };
  halte: string;
  numberMhs: number;
  waitingTime: number;
  arriveTime: string;
  error: any;
}

const Map = () => {
  const { user, isProfilePopUpOpen, setIsProfilePopUpOpen } = useAuth()
  const { showMap } = usePages();
  
  const markRoute1 = [
    { halte : 'Gerbang Utama', geocode : [-6.933205, 107.768413], estimasi : 350 },
    { halte : 'Labtek 1B', geocode : [-6.929396, 107.768557], estimasi : 250 },
    { halte : 'GKU 2', geocode : [-6.929788, 107.769033], estimasi : 100 },
    { halte : 'GKU 1', geocode : [-6.929119, 107.769818], estimasi : 190 },
    { halte : 'Gedung Rektorat', geocode : [-6.927963, 107.770518], estimasi : 100 },
    { halte : 'GKU 3 / Koica', geocode : [-6.927467, 107.770047], estimasi : 130 },
    { halte : 'GSG', geocode : [-6.926586, 107.769261], estimasi : 130, },
    { halte : 'Asrama', geocode : [-6.926399, 107.767933], estimasi : 370 }
  ]
  
  const markRoute2 = [
    { halte : 'Gerbang Utama', geocode : [-6.933205, 107.768413], estimasi : 100 },
    { halte : 'Asrama', geocode : [-6.926399, 107.767933], estimasi : 100 },
    { halte : 'GSG', geocode : [-6.926586, 107.769261], estimasi : 130 },
    { halte : 'GKU 3 / Koica', geocode : [-6.927467, 107.770047], estimasi : 100 },
    { halte : 'Gedung Rektorat', geocode : [-6.927963, 107.770518], estimasi : 250 },
    { halte : 'Parkiran Kehutanan', geocode : [-6.931548, 107.770884], estimasi : 350 },
  ]

  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0.0, lng: 0.0 },
    error: null as null | {
      code: number;
      message: string;
    },
  });

  const [bus, setBus] = useState<Bus[]>([]);
  const [bus2, setBus2] = useState<Bus[]>([]);
  
  const markers = [
    {
      geocode : [-6.929396, 107.768557],
      popUp : "Labtek 1B"
    },
    {
      geocode : [-6.929788, 107.769033],
      popUp : "GKU 2"
    },
    {
      geocode : [-6.929119, 107.769818],
      popUp : "GKU 1"
    },
    {
      geocode : [-6.927963, 107.770518],
      popUp : "Gedung Rektorat"
    },
    {
      geocode : [-6.927467, 107.770047],
      popUp : "GKU 3 / Koica"
    },
    {
      geocode : [-6.926586, 107.769261],
      popUp : "GSG"
    },
    {
      geocode : [-6.926399, 107.767933],
      popUp : "Asrama"
    },
    {
      geocode : [-6.931548, 107.770884],
      popUp : "Parkiran Kehutanan"
    },
    {
      geocode : [-6.933205, 107.768413],
      popUp : "Gerbang Utama"
    }
  ];

  const route = [
    [-6.933629, 107.768350], // main gate
    [-6.932798, 107.768344],
    [-6.932136, 107.768637],
    [-6.931763, 107.768779],
    [-6.931441, 107.768794],
    [-6.929420, 107.768277],
    [-6.929284, 107.768520],
    [-6.929365, 107.768625],
    [-6.929457, 107.768620],
    [-6.929606, 107.768343],
    [-6.930347, 107.768536],
    [-6.928266, 107.770839],
    [-6.926311, 107.769114],
    [-6.926383, 107.769041],
    [-6.925930, 107.768640],
    [-6.926707, 107.767768],
    [-6.926877, 107.767673], 
    [-6.927600, 107.767534],
    [-6.927928, 107.767506],
    [-6.928605, 107.767725],
    [-6.929118, 107.768162],
    [-6.931424, 107.768804],
    [-6.931695, 107.768913],
    [-6.931831, 107.769009],
    [-6.932200, 107.768610],
    [-6.932732, 107.768369],
    [-6.933629, 107.768350]
  ]

  const route2 = [
    [-6.929038, 107.770054],
    [-6.929842, 107.770312],
    [-6.930405, 107.770477],
    [-6.931596, 107.770825],
    [-6.932023, 107.770862],
    [-6.932260, 107.770825],
    [-6.932451, 107.770642],
    [-6.932620, 107.770232],
    [-6.932678, 107.769916],
    [-6.932591, 107.769699],
    [-6.931975, 107.769131],
    [-6.931928, 107.768897],
    [-6.932184, 107.768622],
    [-6.932732, 107.768369],
    [-6.933629, 107.768350],
    [-6.933579, 107.768269],
    [-6.933073, 107.768255],
    [-6.932812, 107.768286],
    [-6.932703, 107.768308],
    [-6.932604, 107.768348],
    [-6.932433, 107.768423],
    [-6.932171, 107.768555],
    [-6.931787, 107.768752],
    [-6.931583, 107.768781],
    [-6.931444, 107.768774],
    [-6.930817, 107.768607],
    [-6.929402, 107.768214],
    [-6.929127, 107.768123],
    [-6.928935, 107.767965],
    [-6.928672, 107.767723],
    [-6.928472, 107.767622],
    [-6.928173, 107.767513],
    [-6.927987, 107.767475],
    [-6.927910, 107.767454],
    [-6.927796, 107.767475],
    [-6.927701, 107.767494],
    [-6.927407, 107.767557],
    [-6.926887, 107.767665],
    [-6.926731, 107.767731],
    [-6.926670, 107.767771],
    [-6.925911, 107.768629],
    [-6.926380, 107.769074],
    [-6.926585, 107.769332],
    [-6.926853, 107.769543],
    [-6.927022, 107.769694],
    [-6.927203, 107.769821],
    [-6.928289, 107.770832],
    [-6.928560, 107.770547],
    [-6.928785, 107.770305],
    [-6.929038, 107.770054]
  ]

  const latlngs = route as unknown as LatLngExpression[][];
  const latlngs2 = route2 as unknown as LatLngExpression[][];

  const halteIcon = L.icon({
    // iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconUrl: "/images/halte.svg",
    iconSize: [30, 41],
  });

  const CenterPoint = { lat: -6.930370, lng: 107.769550 };
  
  const iconUser = L.icon({
    iconUrl: "/images/iconUser.svg",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    shadowSize: [41, 41]
  });

  const iconBus = L.icon({
    iconUrl: "/images/redBus.svg",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    shadowSize: [41, 41]
  });

  const fetchLocation = () => {
    if (user) {
      const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
          setLocation({
            loaded: true,
            coordinates: {
              lat: location.coords.latitude,
              lng: location.coords.longitude,
            },
            error: null,
          });
        // console.log("Latitude: " + location.coords.latitude + " Longitude: " + location.coords.longitude);
      };
  
      const onError = (error: { code: any; message: any; }) => {
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

  const fetchContents = async (): Promise<void> => {
    try {
      const res = await fetch('https://shuttle-tracker-itb-backend.vercel.app/track-shuttle/Jhfxmkh6sFecE3xEWAJXZCpY9lC2')
      const data = await res.json()
      const rute1 = data.data.Rute1
      const length = Object.keys(rute1).length;

      const rute2 = data.data.Rute2;
      const length2 = Object.keys(rute2).length;
  
      const newBus = [...bus]; // Create a copy of the bus array

      const newBus2 = [...bus2]; // Create a copy of the bus route 2 array
  
      for (let i = 0; i < length; i++) {
        var mhs = 0;
        if (rute2[`Bus${i + 1}`].countMhs <= 19) {
          mhs = rute2[`Bus${i + 1}`].countMhs;
        } else {
          mhs = 19;
        }

        newBus[i] = {
          loaded: true,
          namaBus : rute1[`Bus${i + 1}`].namaBus,
          coordinates: {
            lat: rute1[`Bus${i + 1}`].latitude,
            lng: rute1[`Bus${i + 1}`].longitude,
          },
          halte: rute1[`Bus${i + 1}`].Terminal,
          numberMhs: mhs,
          waitingTime: 0,
          arriveTime: '',
          error: null,
        }
  
        const time = calculateWaitingTime(newBus[i], 1, nearestHalte);
        newBus[i].waitingTime = time;
        newBus[i].arriveTime = calculateArrivingTime(time);
      }

      for (let i = 0; i < length2; i++) {
        var mhs = 0;
        if (rute2[`Bus${i + 1}`].countMhs <= 19) {
          mhs = rute2[`Bus${i + 1}`].countMhs;
        } else {
          mhs = 19;
        }

        newBus2[i] = {
          loaded: true,
          namaBus : rute2[`Bus${i + 1}`].namaBus,
          coordinates: {
            lat: rute2[`Bus${i + 1}`].latitude,
            lng: rute2[`Bus${i + 1}`].longitude,
          },
          halte: rute2[`Bus${i + 1}`].Terminal,
          numberMhs: mhs,
          waitingTime: 0,
          arriveTime: '',
          error: null,
        }
  
        const time = calculateWaitingTime(newBus2[i], 2, nearestHalte);
        newBus2[i].waitingTime = time;
        newBus2[i].arriveTime = calculateArrivingTime(time);
      }
  
      setBus(newBus); // Update the bus state
      setBus2(newBus2); // update the bus route 2 state
    } catch (err) {
      console.log(err)
    }
  }

  
  useEffect(() => {
    // Fetch location initially
    const interval = setInterval(() => {
      fetchContents();
      fetchLocation();
    }, 1000);

    
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [user, fetchContents, fetchLocation]);

  function calculateWaitingTime(bus : any, route : number, target : any) {
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

    // Hitung kecepatan dan arah menggunakan Turf.js
    waitingTime = waitingTime + Math.round(turf.distance(turf.point([bus.coordinates.lng, bus.coordinates.lat]), turf.point([markRoute[end].geocode[1], markRoute[end].geocode[0]]), {units: 'meters'}) / (30));
    return Math.ceil(waitingTime / 60);
  }

  function calculateArrivingTime(waitingTime : number) {
    // Fungsi untuk memformat waktu menjadi format HH:mm:ss
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
  
  // Fetch nearest halte and arriving time
  var nearestHalte = {
    geocode : [-6.929788, 107.769033],
    popUp : "GKU 2"
  };
  
  let idx = 0;
  let distance = turf.distance(turf.point([location.coordinates.lng, location.coordinates.lat]), turf.point([markers[0].geocode[1], markers[0].geocode[0]]), {units: 'meters'});
  for (let i = 1; i < markers.length; i++) {
    let temp = turf.distance(turf.point([location.coordinates.lng, location.coordinates.lat]), turf.point([markers[i].geocode[1], markers[i].geocode[0]]), {units: 'meters'});
    if (temp < distance) {
      distance = temp;
      idx = i;
    }
  }
  nearestHalte = markers[idx];

  const [isLoginWarningOpen, setIsLoginWarningOpen] = useState(false);
  const [isButtonClicked, setButtonClicked] = useState(false);
  const handleButtonClick = () => {
    if (isProfilePopUpOpen) {
      setIsProfilePopUpOpen(false);
    }
    setButtonClicked(!isButtonClicked);

    if (user === "") {
      handleOpenLoginWarning();
    }
  };

  const handleOpenLoginWarning = () => {
    setIsLoginWarningOpen(true);
  };

  const handleCloseLoginWarning = () => {
    setIsLoginWarningOpen(false);
    setButtonClicked(!isButtonClicked);
  };

  const [selectedRoute, setSelectedRoute] = useState<string>('');

  const handleRouteButtonClick = (route: string) => {
    setSelectedRoute(route);
    if (route === 'Route1') {
      setShowRedLine(true);
      setShowBlueLine(false);
    } else if (route === 'Route2') {
      setShowRedLine(false);
      setShowBlueLine(true);
    }
    else {
      setShowBlueLine(true);
      setShowRedLine(true);
    }
  };

  const [showRedLine, setShowRedLine] = useState(true);
  const [showBlueLine, setShowBlueLine] = useState(true);
  
  return (
    showMap && (
      <div className='h-screen flex items-center justify-center'>
        <div className='h-full w-full md:w-[100%]'>
          <MapContainer className='relative' center={CenterPoint} zoom={16} zoomControl={false} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <div className='fixed z-[401] item-center h-[100px] w-full md:w-[100%] bottom-0'>
              <div className='justify-center w-full flex'>
                  <button className='bg-gradient-to-b from-[#0078C9] to-[#005BBF] w-[256px] h-[46px] rounded-3xl' onClick={handleButtonClick}>
                    <div className='flex justify-center items-center mt-[2px]'>
                      <Image src={'/images/busLocationPanel.svg'} alt="bus location" width={22} height={29} />
                      <p className='ml-2 text-[14px] font-bold text-white mt-[-3px]'>Tampilkan Halte Terdekat</p>
                    </div>
                  </button>
                  {( isButtonClicked &&            
                    ( user === "" ? (
                      <div className='absolute bottom-[0px] h-screen'>
                        <LoginWarning isOpen={isLoginWarningOpen} onClose={handleCloseLoginWarning}></LoginWarning>
                      </div>
                    ) : (
                      <div className='bg-gradient-to-b from-[#0078C9] to-[#005BBF] p-2 rounded-2xl absolute w-[90%] h-fit bottom-11'>
                        <div className='w-[100%] flex justify-end'>
                          <Image src="/images/closeBusPanel.svg" alt='close-button' width={25} height={25} onClick={() => {handleButtonClick(); handleRouteButtonClick('')}} style={{ cursor: 'pointer' }}/>
                        </div>
                        <div className='flex justify-between border-b-[#0078C9] border-b-[3px] border-solid pb-1'>
                          <div className='flex mb-4 mt-1'>
                            <Image className="ml-[5px]" src={'/images/busLocationPanel.svg'} alt="bus location" width={50} height={50} />
                            <div className='flex flex-col relative w-full h-full header-busPanel ml-3'>
                              <p className='font-bold text-white'>Halte Terdekat</p>
                              <p className='font-bold text-white text-2xl'>{nearestHalte['popUp']}</p>
                            </div>
                            <div className='flex flex-col relative w-fit h-full md:flex-row mt-[13.5px] gap-2'>
                              <button onClick={() => handleRouteButtonClick('Route1')} className={`flex items-center justify-center rounded-[20px] w-[90px] h-7 p-[5px] text-xs font-bold ${selectedRoute === 'Route1' ? 'text-white border-solid border-white border-[1.5px]' : 'bg-[#000000]/10 text-[#000000]/30 border-solid border-[#000000]/10 border-[1.5px]'} `}>Red Route</button>
                              <button onClick={() => handleRouteButtonClick('Route2')} className={`flex items-center justify-center rounded-[20px] w-[90px] h-7 p-[5px] text-xs font-bold ${selectedRoute === 'Route2' ? 'text-white border-solid border-white border-[1.5px]' : 'bg-[#000000]/10 text-[#000000]/30 border-solid border-[#000000]/10 border-[1.5px]'} `}>Blue Route</button>
                            </div>
                          </div>
                        </div>
                        {selectedRoute === 'Route1' && (
                          <div className='scroll-container'>
                            {bus.map((busItem, index) => (
                              <div key={index} className='relative flex mt-3 mb-3'>
                                <Image className='mt-1 ml-3' src={'/images/redBus.svg'} alt="bus location" width={35} height={35}/>
                                <div className='mt-1.5 ml-3'>
                                  <p className='font-extralight text-white text-xs'>{busItem.namaBus}</p>
                                  <p className='font-bold text-white text-xs'>{busItem.numberMhs}/19 CAPACITY</p>
                                </div>
                                <div className=' bg-[#00409980] bg-opacity-50 h-fit absolute w-fit rounded-lg right-3 p-1.5'>
                                  <div className='flex items-center'>
                                    <p className='font-thin text-xs text-white mx-1.5'>Arriving in</p>
                                    <div className='inline-block mx-1.5'>
                                      <p className='font-extralight text-white text-center'>{busItem.waitingTime} mins</p>
                                      <p className='font-extralight text-white text-center'>{busItem.arriveTime}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}

                        {selectedRoute === 'Route2' && (
                          <div className='scroll-container'>
                            {bus2.map((busItem, index) => (
                              <div key={index} className='relative flex mt-3 mb-3'>
                                <Image className='mt-1 ml-3' src={'/images/redBus.svg'} alt="bus location" width={35} height={35}/>
                                <div className='mt-1.5 ml-3'>
                                  <p className='font-extralight text-white text-xs'>{busItem.namaBus}</p>
                                  <p className='font-bold text-white text-xs'>{busItem.numberMhs}/19 CAPACITY</p>
                                </div>
                                <div className=' bg-[#00409980] bg-opacity-50 h-fit absolute w-fit rounded-lg right-3 p-1.5'>
                                  <div className='flex items-center'>
                                    <p className='font-thin text-xs text-white mx-1.5'>Arriving in</p>
                                    <div className='inline-block mx-1.5'>
                                      <p className='font-extralight text-white text-center'>{busItem.waitingTime} mins</p>
                                      <p className='font-extralight text-white text-center'>{busItem.arriveTime}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))
                  )}
              </div>
            </div>

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            <Marker position={location.coordinates} icon={iconUser}>
              <Popup>
                Your Location
              </Popup>
            </Marker>

            { bus.map((singleBus) =>  (
              <Marker position={singleBus?.coordinates} icon={iconBus}>
                <Popup>
                  {singleBus.namaBus}
                </Popup>
              </Marker>
            ))}

            { bus2.map((singleBus) =>  (
              <Marker position={singleBus?.coordinates} icon={iconBus}>
                <Popup>
                  {singleBus.namaBus}
                </Popup>
              </Marker>
            ))}

            {markers.map((marker, index) => (
              <Marker key={`marker-${index}`} position={marker.geocode as LatLngTuple} icon={halteIcon}>
                <Popup>
                  { marker.popUp }
                  { marker.popUp !== "Parkiran Kehutanan" && (bus.map((singleBus) =>  (
                    <div>
                      {singleBus.namaBus} arriving in {calculateWaitingTime(singleBus, 1, marker)} mins
                    </div>
                  )))}
                  { marker.popUp === "Gerbang Utama" && (bus2.map((singleBus) =>  (
                    <div>
                      {singleBus.namaBus} arriving in {calculateWaitingTime(singleBus, 2, marker)} mins
                    </div>
                  )))}
                  { marker.popUp === "Asrama" && (bus2.map((singleBus) =>  (
                    <div>
                      {singleBus.namaBus} arriving in {calculateWaitingTime(singleBus, 2, marker)} mins
                    </div>
                  )))}
                  { marker.popUp === "GSG" && (bus2.map((singleBus) =>  (
                    <div>
                      {singleBus.namaBus} arriving in {calculateWaitingTime(singleBus, 2, marker)} mins
                    </div>
                  )))}
                  { marker.popUp === "GKU 3 / Koica" && (bus2.map((singleBus) =>  (
                    <div>
                      {singleBus.namaBus} arriving in {calculateWaitingTime(singleBus, 2, marker)} mins
                    </div>
                  )))}
                  { marker.popUp === "Gedung Rektorat" && (bus2.map((singleBus) =>  (
                    <div>
                      {singleBus.namaBus} arriving in {calculateWaitingTime(singleBus, 2, marker)} mins
                    </div>
                  )))}
                  { marker.popUp === "Parkiran Kehutanan" && (bus2.map((singleBus) =>  (
                    <div>
                      {singleBus.namaBus} arriving in {calculateWaitingTime(singleBus, 2, marker)} mins
                    </div>
                  )))}
                </Popup>
              </Marker>
            ))}

            {showRedLine && <Polyline positions={latlngs} color="red" />}
            {showBlueLine && <Polyline positions={latlngs2} color="blue" />}
          </MapContainer>
        </div>
      </div>
    )
  );
};

export default Map;


