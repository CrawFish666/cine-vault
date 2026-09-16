import { List } from "lucide-react";
import type { Genre } from "../../types/tmdb";



interface GenresInfoProps {
	genres: Genre[];
}

export function GenresInfo({ genres }: GenresInfoProps) {
	return (
		<div className="flex flex-col gap-3.5">
			<div className="flex gap-1">
				<List className="w-6 h-6 text-neutral-60" />
				<h3 className="text-neutral-60 font-medium text-lg">
					Жанры
				</h3>
			</div>

			<div className="flex gap-2.5 flex-wrap">
				{genres.map((genre) => (
					<div key={genre.id}
						className="px-3.5 py-2 text-white bg-surface-08 border border-surface-15 rounded-lg">
						{genre.name}
					</div>
				))}
			</div>
		</div>


	);
}