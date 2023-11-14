import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';

const Map = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: 0.0, lng: 0.0 },
    error: null as null | {
        code: number;
        message: string;
        },
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
    <div className='h-screen w-screen flex items-center justify-center'>
      <MapContainer center={CenterPoint} zoom={16} scrollWheelZoom={false} style={{ height: '844px', width: '390px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker key={location.coordinates.lat + location.coordinates.lng} position={location.coordinates} icon={iconUser}>
          <Popup>
            Your Location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default Map;
