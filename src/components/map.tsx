import L, { LatLngTuple, popup } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import * as turf from '@turf/turf';

const Map = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0.0, lng: 0.0 },
    error: null as null | {
      code: number;
      message: string;
    },
  });
  
  const [locationBus, setLocationBus] = useState({
    loaded: false,
    coordinates: { lat: 0.0, lng: 0.0 },
    numberMhs: 0,
    error: null as null | {
        code: number;
        message: string;
        },
  });
  
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
    }
  ];
  

  const halteIcon = L.icon({
    // iconUrl: "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
    iconUrl: "/images/halte.png",
    iconSize: [30, 41],
  });

  const CenterPoint = { lat: -6.933370, lng: 107.772060 };
  
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
    const onSuccess = (location: { coords: { latitude: number; longitude: number; }; }) => {
      setLocation({
        loaded: true,
        coordinates: {
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        },
        error: null,
      });
      console.log("Latitude: " + location.coords.latitude + " Longitude: " + location.coords.longitude);
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
  };

  const fetchContents = async (): Promise<void> => {
    try {
      const res = await fetch('http://localhost:8000/track-shuttle/K77i9UwQegT48lxyzTh6KRt3aef1')
      const data = await res.json()
      setLocationBus(
        {
          loaded: true,
          coordinates: {
            lat: data.data.latitude,
            lng: data.data.longitude,
          },
          numberMhs: data.data.countMhs,
          error: null,
        }
      )
      console.log("Latitude BUS: " + data.data.latitude + " Longitude BUS: " + data.data.longitude);
    } catch (err) {
      console.log(err)
    }
  }

  
  const [isButtonClicked, setButtonClicked] = useState(true);
  const handleButtonClick = () => {
    setButtonClicked(!isButtonClicked);
  };
  
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
  
  var waitingTime = Math.round(turf.distance(turf.point([locationBus.coordinates.lng, locationBus.coordinates.lat]), turf.point([nearestHalte.geocode[1], nearestHalte.geocode[0]]), {units: 'meters'}) / 1800); // 30 m/second -> 1800 m/minute
  const [arriveTime, setArriveTime] = useState('');
  
  // Fungsi untuk memformat waktu menjadi format HH:mm:ss
  const formatTime = (date : any) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

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
  
  useEffect(() => {
    // Fetch location initially
    const interval = setInterval(() => {
      updateTime();
      fetchLocation();
      fetchContents();
    }, 1000);
    
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);
  
  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='h-full w-full md:w-[468px]'>
        <MapContainer center={CenterPoint} zoom={16} zoomControl={false} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
        <div className='fixed z-[1000] item-center h-[100px] w-full md:w-[468px] bottom-0'>
            <div className='justify-center w-full flex'>
              {isButtonClicked ? (
                <button className='bg-gradient-to-b from-[#0078C9] to-[#005BBF] p-2 rounded-3xl bottom-1' onClick={handleButtonClick}>
                  <div className=' flex mx-3'>
                    <Image src={'/images/busLocationPanel.svg'} alt="bus location" width={25} height={20} />
                    <p className=' ml-3 text-lg font-bold text-white'>Tampilkan Halte Terdekat</p>
                  </div>
                </button>
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
                      <p className='font-bold text-white text-xs'>{locationBus.numberMhs}/30 CAPACITY</p>
                    </div>
                    <div className=' bg-[#00409980] bg-opacity-50 h-fit absolute w-fit rounded-lg right-3 p-1.5'>
                      <div className='flex items-center'>
                        <p className='font-thin text-xs text-white mx-1.5'>Arriving in</p>
                        <div className='inline-block mx-1.5'>
                          <p className='font-extralight text-white text-center'>{waitingTime} mins</p>
                          <p className='font-extralight text-white text-center'>{arriveTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          <Marker key={location.coordinates.lat + location.coordinates.lng} position={location.coordinates} icon={iconUser}>
            <Popup>
              Your Location
            </Popup>
          </Marker>

          <Marker key={locationBus.coordinates.lat + locationBus.coordinates.lng} position={locationBus.coordinates} icon={iconBus}>
            <Popup>
              Bus Location
            </Popup>
          </Marker>

          {markers.map((marker, index) => (
        <Marker key={`marker-${index}`} position={marker.geocode as LatLngTuple} icon={halteIcon}>
          <Popup>{marker.popUp}</Popup>
        </Marker>
      ))}

        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
