interface SeasonAccordionSkeletonProps {
	episodeIndex: number;
}

export function SeasonAccordionSkeleton({ episodeIndex }: SeasonAccordionSkeletonProps) {
	return (
		<div  className="bg-surface-08  rounded-lg p-4 gap-4 grid grid-rows-[auto_118px] min-[470px]:grid-rows-[auto] min-[390px]:grid-cols-[1fr_3rem] min-[480px]:grid-cols-[258px_auto] min-[580px]:grid-cols-[auto_258px] md:grid-cols-[4rem_172px_1fr] gap-5 items-center  py-10 md:border-t md:border-surface-15 md:px-0 md:rounded-none md:bg-inherit">
			<span className="tabular-nums text-left min-[390px]:text-right min-[580px]:text-left order-1 min-[580px]:order-1 text-center text-2xl text-neutral-60 font-semibold">{String(episodeIndex + 1).padStart(2, "0")}</span>
			<div className="overflow-hidden order-2 min-[580px]:order-2 border rounded-xl border-surface-15 h-full w-full md:h-auto">
				<div className="bg-surface-10 animate-pulse w-full h-full aspect-video  object-cover" />
			</div>
			<div className="flex flex-col gap-3.5 order-3 col-span-full md:col-auto self-stretch bg-surface-10 animate-pulse">

			</div>
		</div>
	)
}