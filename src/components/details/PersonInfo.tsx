import type { CrewMember, TVShowAggregateCrewMember, TVShowCreatedBy } from "../../types/tmdb";

interface PersonInfoProps {
	title: string;
	person: CrewMember | TVShowCreatedBy | TVShowAggregateCrewMember;
}

export function PersonInfo({
	title,
	person,
}: PersonInfoProps) {
	return (
		<div>
			<h4 className="text-neutral-60 text-lg font-medium mb-3.5">
				{title}
			</h4>

			<div className="bg-surface-08 border border-surface-15 rounded-lg p-3.5 inline-flex gap-2.5 items-center">
				<div className="w-14 h-14 shrink-0">
					<img
						className="w-full h-full object-cover rounded-lg"
						src={`https://image.tmdb.org/t/p/original${person.profile_path}`}
						alt={person.name}
					/>
				</div>

				<div className="flex flex-col gap-1 min-w-0">
					<p className="text-lg text-white font-medium">
						{person.name}
					</p>

					<p className="text-base text-neutral-60 font-medium">
						Сделать запрос person details и узнать где родился
					</p>
				</div>
			</div>
		</div>
	);
}