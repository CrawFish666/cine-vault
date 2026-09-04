export function PageContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
	return (
		<div className={`w-full max-w-[1600px] mx-auto px-4 min-[1280px]:px-[clamp(16px,calc(15vw_-_176px),40px)] laptop:px-10 2xl:px-[clamp(0px,calc(-10.417vw_+_200px),40px)]${className}`}>
			{children}
		</div>
	)
}