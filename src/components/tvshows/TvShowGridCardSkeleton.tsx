export function TvShowGridCardSkeleton() {
	return (
		<div className="animate-pulse">
			<article className="flex h-full overflow-hidden rounded-xl border border-surface-15 bg-surface-10">
				<div className="relative w-32 lg:w-40 shrink-0 bg-surface-15 aspect-[2/3]">
					<div className="w-full h-full bg-surface-08" />

					<div className="absolute top-2 right-2 h-6 w-12 rounded-full bg-surface-20" />
				</div>

				<div className="min-w-0 flex flex-1 flex-col gap-3 p-4">
					<div className="space-y-2">
						<div className="h-5 w-3/4 rounded bg-surface-08" />
						<div className="h-4 w-1/2 rounded bg-surface-08" />
					</div>

					<div className="h-4 w-24 rounded bg-surface-08" />

					<div className="flex flex-wrap gap-1.5">
						<div className="h-6 w-16 rounded-full bg-surface-08" />
						<div className="h-6 w-20 rounded-full bg-surface-08" />
						<div className="h-6 w-14 rounded-full bg-surface-08" />
					</div>

					<div className="mt-auto space-y-2">
						<div className="h-4 w-full rounded bg-surface-08" />
						<div className="h-4 w-full rounded bg-surface-08" />
						<div className="h-4 w-5/6 rounded bg-surface-08" />
					</div>
				</div>
			</article>
		</div>
	)
}