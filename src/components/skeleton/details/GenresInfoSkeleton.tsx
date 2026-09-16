import { List } from "lucide-react";


export function GenresInfoSkeleton() {
	return (
		<div className="flex flex-col gap-3.5">
			<div className="flex gap-1">
				<List className="w-6 h-6 text-neutral-60" />
				<h3 className="text-neutral-60 font-medium text-lg">
					Жанры
				</h3>
			</div>

			<div className="flex gap-2.5 flex-wrap">
				{/* {genres.map((genre) => (
					<div key={genre.id}
						className="px-3.5 py-2 text-white bg-surface-08 border border-surface-15 rounded-lg">
						{genre.name}
					</div>
				))} */}
				{Array.from({ length: 4 }).map((_, i) =>
					<div key={i} className="px-3.5 py-2 bg-surface-08 animate-pulse border border-surface-15 rounded-lg">
						<div className="h-[24px] w-[75px]"></div>
					</div>)}
			</div>
		</div>


	);
}