import 'leaflet/dist/leaflet.css';
import { useState } from 'react';
import L, { LatLngExpression, LatLngTuple } from 'leaflet';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import { usePages } from '@src/services/PagesContext';
import { useMapDetails } from '@src/services/MapDetailsContext';
import StopPopUp from '@src/components/HaltePopUp';

interface Shuttle {
  loaded: boolean;
  id : string;
  coordinates: {
    lat: number;
    lng: number;
  };
  halte: string;
  countMhs: number;
  route: String;
  waitingTime: number;
  arriveTime: string;
  error: any;
}

interface Halte {
  geoCode: number[];
  popUp: string;
}

const Map = () => {
  const { showMap } = usePages();
  const { shuttles, location, halteMarkers, blueRoute, greyRoute, showGreyLine, showBlueLine, setSelectedHalte } = useMapDetails();
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  
  const blueRouteLatLngs = blueRoute as unknown as LatLngExpression[][];
  const greyRouteLatLngs = greyRoute as unknown as LatLngExpression[][];

  const iconHalte = L.icon({
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

  const iconBlueBus = L.icon({
    iconUrl: "/images/blueBus.svg",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    shadowSize: [41, 41]
  });

  const iconGreyBus = L.icon({
    iconUrl: "/images/greyBus.svg",
    iconSize: [25, 41],
    iconAnchor: [10, 41],
    popupAnchor: [2, -40],
    shadowSize: [41, 41]
  });

  const handleMarkerClick = (marker: Halte) => {
    setIsButtonClicked(true);
    setSelectedHalte(marker);
  }

  return (
    showMap && (
      <div className='h-screen flex items-center justify-center'>
        <div className='h-full w-full md:w-[100%]'>
          <MapContainer className='relative' center={CenterPoint} zoom={16} zoomControl={false} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <StopPopUp isButtonClicked={isButtonClicked} setIsButtonClicked={setIsButtonClicked} />

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />

            {location && (
              <Marker position={location.coordinates} icon={iconUser}/>
            )}

            { showBlueLine && (
              shuttles.map((shuttle: Shuttle, index: number) =>  (
                (shuttle.route === "Blue" &&
                  <Marker key={`marker-${index}`} position={shuttle?.coordinates} icon={iconBlueBus} />
                )
              ))
            )}

            { showGreyLine && (
              shuttles.map((shuttle: Shuttle, index: number) =>  (
                (shuttle.route === "Grey" &&
                  <Marker key={`marker-${index}`} position={shuttle?.coordinates} icon={iconGreyBus} />
                )
              ))
            )}

            {halteMarkers.map((marker: Halte, index: number) => (
              <Marker key={`marker-${index}`} position={marker.geoCode as LatLngTuple} icon={iconHalte} eventHandlers={{ click: () => handleMarkerClick(marker)}}/>
            ))}

            {showBlueLine && <Polyline positions={blueRouteLatLngs} color="blue" />}
            {showGreyLine && <Polyline positions={greyRouteLatLngs} color="#575F6C" />}
          </MapContainer>
        </div>
      </div>
    )
  );
};

export default Map;


