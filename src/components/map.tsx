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
            error: null,
          }
        )
        console.log("Latitude BUS: " + data.data.latitude + " Longitude BUS: " + data.data.longitude);
      } catch (err) {
        console.log(err)
      }
    }

    const [locationBus, setLocationBus] = useState({
      loaded: false,
      coordinates: { lat: 0.0, lng: 0.0 },
      error: null as null | {
          code: number;
          message: string;
          },
    });

  useEffect(() => {
    // Fetch location initially

    const interval = setInterval(() => {
      fetchLocation();
      fetchContents();
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className='h-screen flex items-center justify-center'>
      <div className='h-full w-full md:w-[468px]'>
        <MapContainer center={CenterPoint} zoom={16} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <div className='absolute z-[1000] item-center h-[100px] w-full bottom-2'>
            <div className=' justify-center w-full flex  '>
              <button className='bg-gradient-to-b from-[#0078C9] to-[#005BBF] p-2 rounded-3xl'>
                <div className=' flex ml-4 mr-5 mt-2 '>
                  <Image src={'/busPanel.svg'} alt="bus panel" width={25} height={20} />
                  <p className='ml-3 mb-2 text-lg font-bold text-white'>Tampilkan Halte Terdekat</p>
                </div>
              </button>
            </div>
          </div>

          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* <Marker key={location.coordinates.lat + location.coordinates.lng} position={CenterPoint} icon={iconUser}>
            <Popup>
              Your Location
            </Popup>
          </Marker> */}

          <Marker key={locationBus.coordinates.lat + locationBus.coordinates.lng} position={locationBus.coordinates} icon={iconUser}>
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
