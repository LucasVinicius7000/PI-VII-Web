import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {

    const [userCoordinates, setUserCoordinates] = useState(null);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isAprooved, setIsAprooved] = useState(false);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        localStorage.setItem("token", userToken);
        localStorage.setItem("role", userRole);
    }, [userToken, userRole]);

    useEffect(() => {
        let lat = localStorage.getItem("lat");
        let lng = localStorage.getItem("lng");
        if (userCoordinates === null) setUserCoordinates({ lat: lat, lng: lng });
    }, [userCoordinates]);

    return <UserContext.Provider value={{
        setUserCoordinates,
        setIsAuthenticate,
        setIsAprooved,
        setUserRole,
        setUserToken,
        isAprooved,
        userRole,
        isAuthenticate,
        userCoordinates,
        userToken
    }}>
        {children}
    </UserContext.Provider>

}