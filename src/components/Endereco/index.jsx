import styles from "./styles.module.css";
import Search from "../Search";
import { BsGeoAlt, BsSearch } from "react-icons/bs";
import { useEffect, useState, useContext } from "react";
import { BuscaEnderecosPorTexto, BuscaCoordenadasPorId } from "../../services/GoogleMapsApi.js";
import { UserContext } from "../../contexts/userContext";
import { v4 as uuidv4 } from 'uuid';
import HomeCliente from "../../pages/HomeCliente";
import HomeEmpresa from "../../pages/HomeEmpresa";

export default function Endereco() {


    const { userCoordinates, setUserCoordinates, userRole } = useContext(UserContext);

    const [sessionToken, setSessionToken] = useState(uuidv4());
    const [addresses, setAddresses] = useState([]);
    const [addressSelected, setAddressSelected] = useState('');
    const [renderChildren, setRenderChildren] = useState(false);

    const handleChange = async (e) => {
        setAddressSelected(e.target.value); // Altera o valor do input     
    }

    const handleSearch = async () => {
        setAddresses(await BuscaEnderecosPorTexto(addressSelected, sessionToken));  // Busca as sugestões 
    }

    const handleSelection = async (item) => {
        setAddressSelected(item.value); // Seta o endereço selecionado
        setUserCoordinates(await BuscaCoordenadasPorId(item.placeId, sessionToken)); // Seta as coordenadas encontradas
        setAddresses([]); // Limpa as sugestoes
        setSessionToken(uuidv4()); // Gera um novo token de sessão
    }

    const choiceHome = () => {
        debugger;
        if (userRole === 'Cliente') {
            return <HomeCliente />
        }
        else return <div>Nada pra ver aqui..</div>;
    }

    useEffect(() => {
        const firstSearch = async () => {
            await BuscaCoordenadasPorId('', sessionToken);
        }
        firstSearch();
    }, []);

    const handleStart = () => {
        // Salva as coordenadas no localStorage
        localStorage.setItem("lat", userCoordinates?.lat);
        localStorage.setItem("lng", userCoordinates?.lng);
        setRenderChildren(true);
    }

    useEffect(() => {
        // Confere se as coordenadas foram salvas no localStorage
        let lat = localStorage.getItem("lat");
        let lng = localStorage.getItem("lng");
        if (userCoordinates?.lat && userCoordinates?.lng && lat && lng) setRenderChildren(true);
    }, [userCoordinates]);


    return !renderChildren ? <div className={styles.main}>
        <div className={styles.container}>
            <span id={styles.text}>
                Antes de começar, busque aqui por seu endereço para exibirmos somente os produtos e estabelecimentos mais próximos de você. 😉
            </span>
            <Search
                listItemsResult={addresses}
                value={addressSelected}
                onChange={(e) => handleChange(e)}
                onSearch={handleSearch}
                onClickItemList={(item) => { handleSelection(item) }}
                decoIcon={<BsGeoAlt />}
                searchIcon={<BsSearch size={20} style={{ paddingRight: "1rem", cursor: "pointer" }} />}
                placeholder={"Busque seu endereço aqui.."}
            />
            {userCoordinates?.lat && userCoordinates?.lng ? <div onClick={handleStart} className={styles.start}>Começar</div> : ''}
        </div>
    </div> : choiceHome()


}