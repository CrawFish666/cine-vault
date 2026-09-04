import { Play } from "lucide-react";

interface TrailerButtonProps {
	onClick: () => void;
	className?: string;
	classNameIcon?: string;
}

export function TrailerButton({
	onClick,
}: TrailerButtonProps) {
	return (
		<button type="button" onClick={onClick}
			className="flex gap-1 px-6 py-3.5 bg-primary-45 rounded-lg cursor-pointer"	>
			<Play className="w-7 h-7 text-white fill-white" />
			<span className="text-lg font-semibold text-white">
				Смотреть трейлер
			</span>
		</button>
	);
}