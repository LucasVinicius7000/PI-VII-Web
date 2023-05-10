import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export default function UserContextProvider({children})
{

    const [userCoordinates, setUserCoordinates] = useState(null);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [isAprooved, setIsAprooved] = useState(false);

    useEffect(()=>{
        let lat = localStorage.getItem("lat");
        let lng = localStorage.getItem("lng");
        if(userCoordinates === null) setUserCoordinates({ lat: lat, lng: lng });
    },[userCoordinates]);

    return <UserContext.Provider value={{setUserCoordinates, setIsAuthenticate, setIsAprooved, setUserRole, isAprooved, userRole, isAuthenticate, userCoordinates}}>
        {children}
    </UserContext.Provider>

}