import { useEffect, useState } from "react";


export default function useGeolocation({ needGetPosition }) {

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                console.log("Localização do cliente encontrada.");
                setLocation(pos.coords);
            },
            (err) => {
                console.log(err);
                setError(err);
            },
            { maximumAge: 0 }
        );
    },[needGetPosition]);

    return { location, error };
}