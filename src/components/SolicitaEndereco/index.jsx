import styles from "./styles.module.css";
import Search from "./../Search";
import { BsGeoAlt, BsSearch } from "react-icons/bs";
import { useEffect, useState } from "react";
import { BuscaEnderecosPorTexto, BuscaCoordenadasPorId } from "./../../services/googleMapsApi.js";
import { v4 as uuidv4 } from 'uuid';

export default function SolicitaEndereco({ children }) {

    const [sessionToken, setSessionToken] = useState(uuidv4());
    const [addresses, setAddresses] = useState([]);
    const [addressSelected, setAddressSelected] = useState('');
    const [coordinates, setCoordinates] = useState(null);
    const [renderChildren, setRenderChildren] = useState(false);

    const handleChange = async (e) => {
        setAddressSelected(e.target.value); // Altera o valor do input     
    }

    const handleSearch = async () => {
        setAddresses(await BuscaEnderecosPorTexto(addressSelected, sessionToken));  // Busca as sugestões 
    }

    const handleSelection = async (item) => {
        setAddressSelected(item.value); // Seta o endereço selecionado
        setCoordinates(await BuscaCoordenadasPorId(item.placeId, sessionToken)); // Seta as coordenadas encontradas
        setAddresses([]); // Limpa as sugestoes
        setSessionToken(uuidv4()); // Gera um novo token de sessão
    }

    const handleStart = () => {
        // Salva as coordenadas no localStorage
        localStorage.setItem("lat", coordinates?.lat);
        localStorage.setItem("lng", coordinates?.lng);
        setRenderChildren(true);
    }

    useEffect(()=>{
       let lat = localStorage.getItem("lat"); 
       let lng = localStorage.getItem("lng");
       if(lat && lng) setRenderChildren(true);
    },[]);


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
            {coordinates?.lat && coordinates?.lng ? <div onClick={handleStart} className={styles.start}>Começar</div> : ''}
        </div>
    </div> : children


}