import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as turf from '@turf/turf';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression, LatLngTuple, popup} from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { useAuth } from '@src/services/AuthContext';
import LoginWarning from './LoginWarning';

const Map = () => {
  const { user, isProfilePopUpOpen, setIsProfilePopUpOpen } = useAuth()
  
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0.0, lng: 0.0 },
    error: null as null | {
      code: number;
      message: string;
    },
  });
  
  const [bus, setBus] = useState([] as any);

  const addBus = () => {
    const newBus = {
      loaded: false,
      coordinates: { lat: 0.0, lng: 0.0 },
      halte: 'Gerbang Utama',
      numberMhs: 0,
      waitingTime: 0,
      arriveTime: '',
      error: null as null | {
          code: number;
          message: string;
          },
    }

    setBus([...bus, newBus]);
  }
  
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
    [-6.928999, 107.770029],
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
    [-6.933629, 107.768350]
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
      const res = await fetch('https://shuttle-tracker-itb-backend.vercel.app/Jhfxmkh6sFecE3xEWAJXZCpY9lC2')
      const data = await res.json()
      const rute1 = data.data.Rute1
      console.log(rute1)

      for (let i = bus.length; i < rute1.length; i++) {
        addBus()
      }

      var updateBus : any = []
      for (let i = 0; i < rute1.length; i++) {
        updateBus[i] = {
            loaded: true,
            coordinates: {
              lat: rute1[`Bus${i}`].latitude,
              lng: rute1[`Bus${i}`].longitude,
            },
            halte: rute1[`Bus${i}`].halte,
            numberMhs: rute1[`Bus${i}`].countMhs,
            waitingTime: calcualteWaitingTime(rute1[`Bus${i}`]),
            arriveTime: calcualteArrivingTime(calcualteWaitingTime(rute1[`Bus${i}`])),
            error: null,
          }
      }
      
      setBus(updateBus)
      // console.log("Latitude BUS: " + data.data.latitude + " Longitude BUS: " + data.data.longitude);
    } catch (err) {
      console.log(err)
    }
  }
  
  // Fetch nearest halte and arriving time
  const markRoute1 = [
    { halte : 'Gerbang Utama', estimasi : 200 },
    { halte : 'Labtek 1B', estimasi : 200 },
    { halte : 'GKU 2', estimasi : 100 },
    { halte : 'GKU 1', estimasi : 100 },
    { halte : 'Rektorat', estimasi : 100 },
    { halte : 'Koica/GKU 3', estimasi : 100 },
    { halte : 'GSG', estimasi : 100, },
    { halte : 'Asrama', estimasi : 100 }
  ]
  
  const markRoute2 = [
    { halte : 'Gerbang Utama', estimasi : 100 },
    { halte : 'Asrama', estimasi : 100 },
    { halte : 'GSG', estimasi : 100 },
    { halte : 'Koica/GKU 3', estimasi : 100 },
    { halte : 'Rektorat', estimasi : 100 },
    { halte : 'Kehutanan', estimasi : 100 },
  ]

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

  function calcualteWaitingTime(bus : any) {
    var start = 0;
    var end = 0;
    var waitingTime = 0;

    for (let i = 0; i < markRoute1.length; i++) {
      if (markRoute1[i].halte === nearestHalte.popUp) {
        start = i - 1;
        break;
      }
    }

    for (let i = 0; i < markRoute2.length; i++) {
      if (markRoute1[i].halte === bus.halte) {
        end = i;
        break;
      }
    }

    while (start !== end) {
      waitingTime = waitingTime + markRoute1[start].estimasi;
      start = start - 1;

      if (start === -1) {
        start = markRoute1.length - 1;
      }
    }

    const [positionHistory, setPositionHistory] = useState([] as any);

    useEffect(() => {
      const newPosition = {
        latitude: bus.coordinates.lat,
        longitude: bus.coordinates.lng,
        timestamp: new Date().getTime(),
      };

      // Perbarui riwayat posisi
      setPositionHistory((prevPositionHistory : any) => [...prevPositionHistory, newPosition]);
    }, []);

    // Fungsi untuk menghitung kecepatan dan arah
    const calculateVehicleInfo = () => {
      // Pastikan bahwa ada setidaknya dua posisi untuk menghitung kecepatan
      if (positionHistory.length < 2) {
        return;
      }

      const lastPosition = positionHistory[positionHistory.length - 2];
      const currentPosition = positionHistory[positionHistory.length - 1];

      // Hitung waktu yang dibutuhkan antara dua posisi
      const timeElapsed = (currentPosition.timestamp - lastPosition.timestamp);

      // Hitung kecepatan dan arah menggunakan Turf.js
      const speed = turf.distance(turf.point([lastPosition.longitude, lastPosition.latitude]), turf.point([currentPosition.longitude, currentPosition.latitude]),{ units: 'meters' }) / (timeElapsed);
      waitingTime = waitingTime + Math.round(turf.distance(turf.point([bus.coordinates.lng, bus.coordinates.lat]), turf.point([nearestHalte.geocode[1], nearestHalte.geocode[0]]), {units: 'meters'}) / (speed / 60));
    }

    useEffect(() => {
      // Lakukan perhitungan kecepatan dan arah ketika ada perubahan pada posisi
      calculateVehicleInfo();
    }, [positionHistory]);

    return waitingTime;
  }

  function calcualteArrivingTime(waitingTime : number) {
    const [arriveTime, setArriveTime] = useState('');
  
    // Fungsi untuk memformat waktu menjadi format HH:mm:ss
    const formatTime = (date : any) => {
      const hours = date.getHours();
      const minutes = date.getMinutes();

      const arriveHours = Math.floor(waitingTime / 60);
      const arriveMinutes = Math.floor(waitingTime % 60);

      if (hours + arriveHours < 24) {
        return `${hours + arriveHours}:${minutes + arriveMinutes}`;
      } else {
        return `00:00`;
      }
    };
    
    // Fungsi untuk memperbarui waktu setiap detik
    const updateTime = () => {
      const currentDate = new Date();
      const formattedTime = formatTime(currentDate);
      setArriveTime(formattedTime);
    };
    updateTime();

    return arriveTime;
  }
  
  useEffect(() => {
    // Fetch location initially
    const interval = setInterval(() => {
      fetchContents();
      fetchLocation();
    }, 1000);

    
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [user]);


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
  
  return (
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
                        <Image src="/images/closeBusPanel.svg" alt='close-button' width={25} height={25} onClick={handleButtonClick} style={{ cursor: 'pointer' }}/>
                      </div>
                      <div className='flex border-b-[#0078C9] border-b-[3px] border-solid pb-1'>
                        <Image src={'/images/busLocationPanel.svg'} alt="bus location" width={50} height={50} />
                        <div className='header-busPanel ml-1'>
                          <p className='font-bold text-white'>Halte Terdekat</p>
                          <p className='font-bold text-white text-2xl'>{nearestHalte['popUp']}</p>
                        </div>
                      </div>
                      <div className='flex mt-3 mb-3'>
                        <Image className='mt-1 ml-3' src={'/images/redBus.svg'} alt="bus location" width={35} height={35}/>
                        <div className='mt-1.5 ml-3'>
                          <p className='font-extralight text-white text-xs'>Nama Bus</p>
                          <p className='font-bold text-white text-xs'>{bus[0].numberMhs}/30 CAPACITY</p>
                        </div>
                        <div className=' bg-[#00409980] bg-opacity-50 h-fit absolute w-fit rounded-lg right-3 p-1.5'>
                          <div className='flex items-center'>
                            <p className='font-thin text-xs text-white mx-1.5'>Arriving in</p>
                            <div className='inline-block mx-1.5'>
                              <p className='font-extralight text-white text-center'>{bus[0].waitingTime} mins</p>
                              <p className='font-extralight text-white text-center'>{bus[0].arriveTime}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
            </div>
          </div>

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker position={location.coordinates} icon={iconUser}>
            <Popup>
              Your Location
            </Popup>
          </Marker>

          <Marker position={bus.coordinates} icon={iconBus}>
            <Popup>
              Bus Location
            </Popup>
          </Marker>

          {markers.map((marker, index) => (
            <Marker key={`marker-${index}`} position={marker.geocode as LatLngTuple} icon={halteIcon}>
              <Popup>{marker.popUp}</Popup>
            </Marker>
          ))}

          <Polyline positions={latlngs} color="red" />
          <Polyline positions={latlngs2} color="blue" />
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
