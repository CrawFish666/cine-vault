interface DescriptionSectionProps {
	overview: string;
}

export function DescriptionSection({
	overview,
}: DescriptionSectionProps) {
	return (
		<section className="p-[24px] min-[390px]:p-[clamp(24px,calc(1.5238vw_+_18.057px),40px)] laptop:p-[clamp(40px,calc(2.0833vw_+_10px),50px)] border border-surface-15 rounded-xl bg-surface-10">
			<h3 className="text-neutral-60 font-medium text-lg mb-3.5">
				Описание
			</h3>
			<p className="text-white font-medium text-lg">
				{overview}
			</p>
		</section>
	);
}