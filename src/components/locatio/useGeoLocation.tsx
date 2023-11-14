import { useEffect, useState } from "react";


const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: {lat: 0.0, lng: 0.0},
        error: null,
    });

    useEffect(() => {
        const onSuccess = (location: { coords: { latitude: any; longitude: any; }; }) => {
            setLocation({
                loaded: true,
                coordinates: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                },
                error: null,
            })
        }
        const onError = (error: { code: number; message: string; }) => {
            setLocation({
                loaded: true,
                error : {
                    code: error.code,
                    message: error.message
                }
            })
        }
        if(!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported"
            })
        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, [])
    return location;


};

export default useGeoLocation;