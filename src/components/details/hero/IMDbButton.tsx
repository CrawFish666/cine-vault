interface IMDbButtonProps {
	imdbId: string;
	className?: string;

}

export function IMDbButton({ imdbId, className }: IMDbButtonProps) {
	return (
		<a href={`https://www.imdb.com/title/${imdbId}`} target="_blank" rel="noopener noreferrer"
			className={` bg-surface-06 border border-surface-15 rounded-lg flex items-center justify-center font-bold ${className}`}	>
			IMDb
		</a>
	);
}