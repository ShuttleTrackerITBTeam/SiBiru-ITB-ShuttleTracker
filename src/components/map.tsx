import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L, { LatLngExpression, LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { usePages } from '@src/services/PagesContext';
import { useMapDetails } from '@src/services/MapDetailsContext';
import StopPopUp from '@src/components/StopPopUp';
import { useAuth } from '@src/services/AuthContext';

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

interface Stop {
  geoCode: number[];
  popUp: string;
}

const Map = () => {
  const { user } = useAuth();
  const { showMap } = usePages();
  const { bus1, bus2, location, markers, route, route2, showRedLine, showBlueLine, setSelectedStop } = useMapDetails();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  
  const latlngs = route as unknown as LatLngExpression[][];
  const latlngs2 = route2 as unknown as LatLngExpression[][];

  const halteIcon = L.icon({
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

  const iconBus1 = L.icon({
    iconUrl: "/images/greyBus.svg",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    shadowSize: [41, 41]
  });

  const iconBus2 = L.icon({
    iconUrl: "/images/blueBus.svg",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    shadowSize: [41, 41]
  });

  const handleMarkerClick = (marker: Stop) => {
    setIsButtonClicked(true);
    setSelectedStop(marker);
  }

  return (
    (showMap && bus1.length && bus2.length) && (
      <div className='h-screen flex items-center justify-center'>
        <div className='h-full w-full md:w-[100%]'>
          <MapContainer className='relative' center={CenterPoint} zoom={16} zoomControl={false} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <StopPopUp isButtonClicked={isButtonClicked} setIsButtonClicked={setIsButtonClicked} />

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {location && (
              <Marker position={location.coordinates} icon={iconUser}>
                <Popup>
                  Your Location
                </Popup>
              </Marker>
            )}

            {bus1.map((singleBus: Bus, index: number) =>  (
              <Marker key={`marker-${index}`} position={singleBus?.coordinates} icon={iconBus1}>
                <Popup>
                  {singleBus.namaBus}
                </Popup>
              </Marker>
            ))}

            {bus2.map((singleBus: Bus, index: number) =>  (
              <Marker key={`marker-${index}`} position={singleBus?.coordinates} icon={iconBus2}>
                <Popup>
                  {singleBus.namaBus}
                </Popup>
              </Marker>
            ))}

            {markers.map((marker: Stop, index: number) => (
              <Marker key={`marker-${index}`} position={marker.geoCode as LatLngTuple} icon={halteIcon} eventHandlers={{ click: () => handleMarkerClick(marker)}}>
                {!user && (
                  <Popup>
                    {marker.popUp}
                  </Popup>
                )}
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


