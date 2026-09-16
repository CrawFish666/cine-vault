import { Calendar } from "lucide-react";


export function ReleaseDateInfoSkeleton() {
	return (
		<div className="flex flex-col gap-3.5">
			<div className="flex gap-1">
				<Calendar className="w-6 h-6 text-neutral-60" />
				<h3 className="text-neutral-60 font-medium text-lg">
					Дата выпуска
				</h3>
			</div>

			<p className="text-white text-xl font-semibold bg-surface-15 animate-pulse h-[30px] inline-block w-[125px]">
				
			</p>
		</div>
	);
}