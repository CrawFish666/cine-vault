import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash() {
	const location = useLocation();

	useEffect(() => {
		if (!location.hash) return;

		const id = location.hash.replace("#", "");
		let attempts = 0;
		const maxAttempts = 60;
		let lastPosition: number | null = null;
		let stableFrames = 0;

		const checkAndScroll = () => {
			const element = document.getElementById(id);

			if (!element) {
				attempts++;
				if (attempts < maxAttempts) requestAnimationFrame(checkAndScroll);
				return;
			}

			const currentPosition = element.getBoundingClientRect().top + window.scrollY;

			if (lastPosition !== null && Math.abs(currentPosition - lastPosition) < 1) {
				stableFrames++;
			} else {
				stableFrames = 0;
			}

			lastPosition = currentPosition;

			if (stableFrames >= 5) {
				element.scrollIntoView({ behavior: "smooth" });
				return;
			}

			attempts++;
			if (attempts < maxAttempts) {
				requestAnimationFrame(checkAndScroll);
			}
		};

		checkAndScroll();
	}, [location]);
}
