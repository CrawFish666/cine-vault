import { Link } from "react-router-dom";

type EmptyStateProps = {
	title: string;
	description?: string;
	action?: { label: string; to: string };
	className?: string;
};

export function EmptyState({ title, description, action, className = "" }: EmptyStateProps) {
	return (
		<div className={`flex flex-col items-center gap-2 py-16 text-center ${className}`}>
			<p className="text-gray-300 font-medium">{title}</p>

			{description && (
				<p className="text-sm text-gray-500">{description}</p>
			)}

			{action && (
				<Link
					to={action.to}
					className="mt-3 inline-flex items-center rounded-lg bg-primary-45 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-45/90"
				>
					{action.label}
				</Link>
			)}
		</div>
	);
}
