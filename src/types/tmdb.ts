

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

	credits?: MovieCredits;
	videos?: MovieVideos;
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

	crew?: CrewMember[];
	guest_stars?: CastMember[];
}

export interface TVShowSeasonDetails {
	_id: string;
	air_date: string | null;
	episodes: TVShowEpisode[];
	name: string;
	networks: TVShowNetwork[];
	overview: string;
	id: number;
	poster_path: string | null;
	season_number: number;
	vote_average: number;
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

	aggregate_credits?: TVShowAggregateCredits;
	videos?: TvShowVideos;
	external_ids?: ExternalIds;
}

export interface ExternalIds {
	id: number;
	imdb_id: string | null;
	freebase_mid: string | null;
	freebase_id: string | null;
	tvdb_id: number | null;
	tvrage_id: number | null;
	wikidata_id: string | null;
	facebook_id: string | null;
	instagram_id: string | null;
	twitter_id: string | null;
}
export interface CastMember {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	cast_id: number;
	character: string;
	credit_id: string;
	order: number;
}

export interface CrewMember {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	credit_id: string;
	department: string;
	job: string;
}

export interface MovieReview {
	author: string;
	author_details: {
		name: string;
		username: string;
		avatar_path: string | null;
		rating: number | null;
	};
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}

export interface MovieVideos {
	id: number;
	results: MovieVideo[];
}
export interface TvShowVideos {
	id: number;
	results: TvShowVideo[];
}

export interface MovieVideo {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}
export interface TvShowVideo {
	iso_639_1: string;
	iso_3166_1: string;
	name: string;
	key: string;
	site: string;
	size: number;
	type: string;
	official: boolean;
	published_at: string;
	id: string;
}

export interface MovieCredits {
	id: number;
	cast: CastMember[];
	crew: CrewMember[];
}
export interface TvShowCredits {
	id: number;
	cast: CastMember[];
	crew: CrewMember[];
}

export interface MediaReviewAuthorDetails {
	name: string;
	username: string;
	avatar_path: string | null;
	rating: number | null;
}

export interface MediaReview {
	author: string;
	author_details: MediaReviewAuthorDetails;
	content: string;
	created_at: string;
	id: string;
	updated_at: string;
	url: string;
}

export interface TVShowAggregateCastRole {
	credit_id: string;
	character: string;
	episode_count: number;
	total_episode_count: number;
}

export interface TVShowAggregateCastMember {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	roles: TVShowAggregateCastRole[];
	order: number;
}

export interface TVShowAggregateCrewJob {
	credit_id: string;
	job: string;
	episode_count: number;
	total_episode_count: number;
}

export interface TVShowAggregateCrewMember {
	adult: boolean;
	gender: number;
	id: number;
	known_for_department: string;
	name: string;
	original_name: string;
	popularity: number;
	profile_path: string | null;
	jobs: TVShowAggregateCrewJob[];
	department: string;
}

export interface TVShowAggregateCredits {
	id: number;
	cast: TVShowAggregateCastMember[];
	crew: TVShowAggregateCrewMember[];
}