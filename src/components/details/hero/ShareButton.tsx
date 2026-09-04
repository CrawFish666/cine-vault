import { Share2 } from "lucide-react";

interface ShareButtonProps {
	onClick: () => void;
	className?: string;
	classNameIcon?: string;
}

export function ShareButton({ onClick, className, classNameIcon }: ShareButtonProps) {
	return (
		<button type="button" onClick={onClick}
			className={` bg-surface-06 border border-surface-15 rounded-lg flex items-center justify-center cursor-pointer  ${className}`}>
			<Share2 className={`${classNameIcon}`} />
		</button>
	);
}