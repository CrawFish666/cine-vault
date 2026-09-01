import axios from "axios";


const TMDB_READ_TOKEN = import.meta.env.VITE_TMDB_READ_TOKEN;
const TMDB_BASE_URL = "https://api.themoviedb.org/3";

if (!TMDB_READ_TOKEN) {
	throw new Error(
		"VITE_TMDB_READ_TOKEN не задан. Добавь его в .env (см. .env.example)."
	);
}

export const tmdbClient = axios.create({
	baseURL: TMDB_BASE_URL,
	headers: {
		Authorization: `Bearer ${TMDB_READ_TOKEN}`,
		accept: "application/json"
	}
})

tmdbClient.interceptors.response.use(
	(response) => response,
	(error) => {
		const message = error.response?.data?.status_message ?? "Не удалось загрузить данные";
		return Promise.reject(new Error(message));
	}
);