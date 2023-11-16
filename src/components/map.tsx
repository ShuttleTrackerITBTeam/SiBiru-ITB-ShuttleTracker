import L, { LatLngTuple } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import Image from 'next/image';

const Map = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0.0, lng: 0.0 },
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
    iconUrl: "/images/marker-icon.png",
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

  useEffect(() => {
    // Fetch location initially
    fetchLocation();

    // Set interval to fetch location every 3 seconds
    const interval = setInterval(() => {
      fetchLocation();
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      <MapContainer center={CenterPoint} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '390px' }}>
        <div className='absolute z-[1000] item-center h-[100px] w-full bottom-11'>
          <div className=' justify-center w-full flex  '>
            <button className='bg-gradient-to-b from-[#0078C9] to-[#005BBF] p-2 rounded-3xl'>
              <div className=' flex mx-3'>
                <Image src={'/busPanel.svg'} alt="bus panel" width={25} height={20} />
                <p className=' ml-3 text-lg font-bold text-white'>Tampilkan Halte Terdekat</p>
              </div>
            </button>
          </div>
        </div>

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker key={location.coordinates.lat + location.coordinates.lng} position={CenterPoint} icon={iconUser}>
          <Popup>
            Your Location
          </Popup>
        </Marker>

        {markers.map((marker, index) => (
      <Marker key={`marker-${index}`} position={marker.geocode as LatLngTuple} icon={halteIcon}>
        <Popup>{marker.popUp}</Popup>
      </Marker>
    ))}

      </MapContainer>
    </div>
  );
};

export default Map;
