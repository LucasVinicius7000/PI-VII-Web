import axios from "axios";

const apiKey = process.env.REACT_APP_API_KEY;

export const api = axios.create({
    baseURL: apiKey,
});