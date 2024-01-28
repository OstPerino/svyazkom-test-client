import axios from "axios";

export const API_URL = `${import.meta.env.VITE_API_URL_LOCAL}/api`;

const $api = axios.create({
	baseURL: API_URL,
});

export default $api;
