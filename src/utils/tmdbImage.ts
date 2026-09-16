type PosterSize = "w92" | "w154" | "w185" | "w342" | "w500" | "w780" | "original";
type BackdropSize = "w300" | "w780" | "w1280" | "original";
type ProfileSize = "w45" | "w185" | "h632" | "original";
type StillSize = "w92" | "w185" | "w300" | "original";

/*
PosterSize = poster_path. Постеры фильмов/сериалов
backdrop_path - широкий фон/баннера etc
profile_path - фотки людей/актеров
still_path - кадры эпизодов
*/

export const FALLBACK_IMAGE = "/noPhoto.png";
export const FALLBACK_AVATAR = "/noPhoto.png"


export function getPosterUrl(path: string | null, size: PosterSize = "w342") {
	if (!path) return null;
	return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getBackdropUrl(path: string | null, size: BackdropSize = "w1280") {
	if (!path) return null;
	return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getProfileUrl(path: string | null, size: ProfileSize = "w185") {
	if (!path) return null;
	return `https://image.tmdb.org/t/p/${size}${path}`;
}

export function getStillUrl(path: string | null, size: StillSize = "w300") {
	if (!path) return null;
	return `https://image.tmdb.org/t/p/${size}${path}`;
}