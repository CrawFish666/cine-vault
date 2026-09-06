import { CarouselHeader2 } from "../../carousel/CarouselHeader2";




export function CastSectionSkeleton() {

	return (
		<section className="cast p-[24px] min-[390px]:p-[clamp(24px,calc(1.5238vw_+_18.057px),40px)] laptop:p-[clamp(40px,calc(2.0833vw_+_10px),50px)] border border-surface-15 rounded-xl bg-surface-10">
			<CarouselHeader2 title="Актёры" variant="subsection">

			</CarouselHeader2>
			<div className="animate-pulse bg-surface-08 p-2.5 h-[clamp(259px,calc(4.667vw+240.8px),308px)] laptop:h-[clamp(308px,calc(14.375vw+101px),377px)]">

			</div>

		</section>
	)

}