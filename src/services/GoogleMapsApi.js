import axios from "axios";
import { ToastError } from "../utils/Toast";

// Para que as funções abaixo funcionem no ambiente LOCAL é necessário
// usar a extensão Allow CORS: Access-Control-Allow-Origin no navegador.
// Aqui: https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf


const apiKey = process.env.REACT_APP_API_KEY;
const proxy = process.env.REACT_APP_API_PROXY;

export async function BuscaEnderecosPorTexto(userText, sessionToken) {

    if (userText.length <= 4) {
        return [];
    }
    else {
        const baseUrl = process.env.REACT_APP_PLACE_AUTOCOMPLETE_API_BASE_URL;

        let api = axios.create({
            baseURL: proxy,
        });

        let url = encodeURIComponent(`${baseUrl}language=pt-BR&input=${userText}&components=country:br&sessiontoken=${sessionToken}&key=${apiKey}`);

        try {
            const response = await api.get(`create?url=${url}`);
            let data = response.data;
            if (data?.predictions.length > 0) {
                return data?.predictions.map((item) => {
                    return {
                        value: item.description,
                        placeId: item.place_id,
                    };
                });

            } else return [];

        } catch (error) {
            throw new Error("Falha ao buscar sugestões de endereços. " + error);
        }
    }



}

export async function BuscaCoordenadasPorId(placeId, sessionToken) {

    const baseUrl = process.env.REACT_APP_PLACE_DETAILS_API_BASE_URL;

    let api = axios.create({
        baseURL: proxy,
    });

    try {

        let url = encodeURIComponent(`${baseUrl}language=pt-BR&place_id=${placeId}&fields=formatted_address,name,geometry&sessiontoken=${sessionToken}&key=${apiKey}`);

        const response = await api.get(`create?url=${url}`);
        let data = response.data;
        console.log({
            lat: data?.result?.geometry?.location?.lat,
            lng: data?.result?.geometry?.location?.lng
        })
        debugger;
        return {
            lat: data?.result?.geometry?.location?.lat,
            lng: data?.result?.geometry?.location?.lng,
        };

    } catch (error) {
        throw new Error("Falha ao buscar coordenadas do endereço selecionado. " + error);
    }

}


export async function BuscarEnderecoPorCoordenadas(lat, lng) {
debugger;
    try {
        const baseURL = 'https://maps.googleapis.com/maps/api/geocode/json?';

        let api = axios.create({
            baseURL: proxy,
        });

        let url = encodeURIComponent(`${baseURL}language=pt-BR&latlng=${lat},${lng}&key=${apiKey}`);
        
        const response = await api.get(`create?url=${url}`);

        return response.data.results[0].formatted_address;

    } catch (error) {
        ToastError("Falha ao buscar endereço do usuário.");
    }
}

