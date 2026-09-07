import { useCallback, useEffect, useState } from "react";

interface UseInfiniteScrollObserverParams {
	hasNextPage: boolean | undefined;
	isFetchingNextPage: boolean;
	fetchNextPage: () => void;
	rootMargin?: string;
}

export function useInfiniteScrollObserver({
	hasNextPage,
	isFetchingNextPage,
	fetchNextPage,
	rootMargin = "400px",
}: UseInfiniteScrollObserverParams) {
	const [sentinel, setSentinel] = useState<HTMLDivElement | null>(null);

	const sentinelRef = useCallback((node: HTMLDivElement | null) => {
		setSentinel(node);
	}, []);

	useEffect(() => {
		if (!sentinel) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
					fetchNextPage();
				}
			},
			{ rootMargin }
		);

		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [sentinel, hasNextPage, isFetchingNextPage, fetchNextPage, rootMargin]);

	return sentinelRef;
}