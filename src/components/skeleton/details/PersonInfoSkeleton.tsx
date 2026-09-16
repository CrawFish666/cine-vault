

export function PersonInfoSkeleton() {
	return (
		<div>
			<h4 className="text-neutral-60 text-lg font-medium mb-3.5">
				<div className="w-[120px] h-[28px] bg-surface-08 animate-pulse "></div>
			</h4>

			<div className="bg-surface-08 border border-surface-15 rounded-lg p-3.5 inline-flex gap-2.5 items-center">
				<div className="w-14 h-14 shrink-0">
					<div className="w-full h-full object-cover rounded-lg animate-pulse bg-surface-15">

					</div>
				</div>


				<div className="w-[150px] bg-surface-10 animate-pulse self-stretch"></div>

			</div>
		</div>
	);
}