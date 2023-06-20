import { createContext, useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import { ToastError, ToastSucess } from "../utils/Toast";
import api from "./../services/Api";

export const UserContext = createContext({});

export default function UserContextProvider({ children }) {

    const [userCoordinates, setUserCoordinates] = useState(null);
    const [isAuthenticate, setIsAuthenticate] = useState(false);
    const [userRole, setUserRole] = useState(null);
    const [isAprooved, setIsAprooved] = useState(false);
    const [userToken, setUserToken] = useState(null);
    const [estabelecimentoId, setEstabelecimentoId] = useState(null);
    const [clienteId, setClienteId] = useState(null);
    const [userId, setUserId] = useState(null);
    const [estabelecimentoInfo, setEstabelecimentoInfo] = useState(null);
    const [enderecoCliente, setEnderecoCliente] = useState(null);

    useEffect(() => {
        if (userToken != null) {
            localStorage.setItem("token", userToken);
            try {
                const tokenDecoded = decodeToken(userToken);
                if (tokenDecoded == null) throw new Error("Erro ao decodificar token do usuário.");
                api.defaults.headers.common['Authorization'] = `Bearer ${userToken}`;
                if (tokenDecoded.role === "Estabelecimento") {
                    setEstabelecimentoId(tokenDecoded.EntityId);
                    const verifyIsAprooved = async () => {
                        let response = await api.get(`estabelecimento?userId=${tokenDecoded?.Id}`);
                        if (response.data.isSucessful === true) {
                            let aprooved = response?.data?.data?.aprovado;
                            setIsAprooved(aprooved);
                            setEstabelecimentoInfo(response.data.data);
                        } else {
                            setIsAprooved(false);
                            ToastError("Falha ao buscar status de aprovação do estabelecimento.");
                        }
                    };
                    verifyIsAprooved();
                }
                else if (tokenDecoded.role === "Cliente") setClienteId(tokenDecoded.EntityId);
                setUserRole(tokenDecoded.role);
                setUserId(tokenDecoded.Id);
            } catch (error) {
                ToastError(error);
            }

        }
    }, [userToken]);

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token != null) setUserToken(token);
    }, []);

    useEffect(() => {
        let lat = localStorage.getItem("lat");
        let lng = localStorage.getItem("lng");
        if (userCoordinates === null) setUserCoordinates({ lat: lat, lng: lng });
    }, [userCoordinates]);


    return <UserContext.Provider value={{
        setUserCoordinates,
        setIsAuthenticate,
        setIsAprooved,
        setUserToken,
        setUserRole,
        setUserId,
        setEstabelecimentoInfo,
        setEnderecoCliente,
        isAprooved,
        userRole,
        isAuthenticate,
        userCoordinates,
        userToken,
        estabelecimentoId,
        clienteId,
        userId,
        estabelecimentoInfo, 
        enderecoCliente
    }}>
        {children}
    </UserContext.Provider>

}