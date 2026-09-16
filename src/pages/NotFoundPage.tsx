import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { ROUTES } from "../routes/pathConstants";

export function NotFoundPage() {
	return (
		<div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
			<h1 className="text-7xl font-bold text-white">404</h1>

			<p className="mt-4 text-xl text-white">
				Страница не найдена
			</p>

			<p className="mt-2 max-w-md text-gray-400">
				Страница которую вы ищите не существует или была удалена.
			</p>

			<Link
				to={ROUTES.HOME}
				className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-3 text-white transition-opacity hover:opacity-90"
			>
				<Home className="h-5 w-5" />
				Вернуться на главную
			</Link>
		</div>
	);
}