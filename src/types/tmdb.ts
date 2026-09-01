

export interface Movie {
	adult: boolean;
	backdrop_path: string | null;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
	// softcore: boolean;
}

export interface Paginated<T> {
	page: number;
	results: T[];
	total_pages: number;
	total_results: number;
}

export interface DatedMovieResponse extends Paginated<Movie> {
	dates: {
		maximum: string;
		minimum: string;
	};
}

export interface Genre {
	id: number;
	name: string;
}

export interface GenresListResponse {
	genres: Genre[];
}

export interface TrendingNowMovie extends Movie {
	media_type: "movie";
}

export interface MovieDetails {
	adult: boolean;
	backdrop_path: string | null;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string | null;
		backdrop_path: string | null;
	} | null;
	budget: number;
	genres: {
		id: number;
		name: string;
	}[];
	homepage: string | null;
	id: number;
	imdb_id: string | null;
	origin_country: string[];
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string | null;
	production_companies: {
		id: number;
		logo_path: string | null;
		name: string;
		origin_country: string;
	}[];
	production_countries: {
		iso_3166_1: string;
		name: string;
	}[];
	release_date: string;
	revenue: number;
	runtime: number;
	spoken_languages: {
		english_name: string;
		iso_639_1: string;
		name: string;
	}[];
	status: string;
	tagline: string | null;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

export type MovieRuntime = Pick<MovieDetails, "id" | "runtime">;

export interface TVShow{
	backdrop_path: string | null;
	id: number;
	name: string;
	original_language: string;
	original_name: string;
	overview: string;
	poster_path: string | null;
	genre_ids: number[];
	popularity: number;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	origin_country: string[];
}

export interface TrendingNowTVShows extends TVShow {
	adult: boolean;
	media_type: "tv";

}

export interface Person {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	known_for: KnownFor[];
}

export interface KnownForMovie extends Movie {
	media_type: "movie";
}

export interface KnownForTVShow extends TVShow {
	media_type: "tv";
}

export type KnownFor = KnownForMovie | KnownForTVShow;

export interface TrendingPerson extends Person {
	media_type: "person";
}

export interface MultiSearchMovie extends Movie {
	media_type: "movie";
}

export interface MultiSearchTVShow extends TVShow {
	media_type: "tv";
}

export interface MultiSearchPerson extends Person {
	media_type: "person";
}

export type MultiSearchResult =
	| MultiSearchMovie
	| MultiSearchTVShow
	| MultiSearchPerson;

export interface TVShowGenre {
	id: number;
	name: string;
}

export interface TVShowCreatedBy {
	id: number;
	credit_id: string;
	name: string;
	gender: number;
	profile_path: string | null;
}

export interface TVShowNetwork {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

export interface TVShowProductionCompany {
	id: number;
	logo_path: string | null;
	name: string;
	origin_country: string;
}

export interface TVShowProductionCountry {
	iso_3166_1: string;
	name: string;
}

export interface TVShowSpokenLanguage {
	english_name: string;
	iso_639_1: string;
	name: string;
}

export interface TVShowSeason {
	air_date: string | null;
	episode_count: number;
	id: number;
	name: string;
	overview: string;
	poster_path: string | null;
	season_number: number;
	vote_average: number;
}

export interface TVShowEpisode {
	id: number;
	name: string;
	overview: string;
	vote_average: number;
	vote_count: number;
	air_date: string | null;
	episode_number: number;
	production_code: string | null;
	runtime: number | null;
	season_number: number;
	show_id: number;
	still_path: string | null;
}

export interface TVShowDetails extends TVShow {
	created_by: TVShowCreatedBy[];
	episode_run_time: number[];
	genres: TVShowGenre[];
	homepage: string;
	in_production: boolean;
	languages: string[];
	last_air_date: string | null;
	last_episode_to_air: TVShowEpisode | null;
	next_episode_to_air: TVShowEpisode | null;
	networks: TVShowNetwork[];
	number_of_episodes: number;
	number_of_seasons: number;
	production_companies: TVShowProductionCompany[];
	production_countries: TVShowProductionCountry[];
	seasons: TVShowSeason[];
	spoken_languages: TVShowSpokenLanguage[];
	status: string;
	tagline: string;
	type: string;
}