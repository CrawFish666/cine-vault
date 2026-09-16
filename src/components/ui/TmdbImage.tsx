// components/ui/TmdbImage.tsx
import { useState } from "react";
import { FALLBACK_IMAGE } from "../../utils/tmdbImage";

interface TmdbImageProps {
	src: string | null;
	alt: string;
	className?: string;
	loading?: "lazy" | "eager";
	fetchPriority?: "high" | "low" | "auto";
	decoding?: "async" | "sync" | "auto";
}

export function TmdbImage({ src, alt, className = "", loading = "lazy", fetchPriority, decoding = "async", }: TmdbImageProps) {
	const [hasError, setHasError] = useState(false);
	const isFallback = !src || hasError;

	return (
		<img
			src={isFallback ? FALLBACK_IMAGE : src}
			onError={() => setHasError(true)}
			alt={alt}
			loading={loading}
			decoding={decoding}
			fetchPriority={fetchPriority}
			className={`${className} ${isFallback ? "object-contain p-4 bg-surface-08" : "object-cover"}`}
		/>
	);
}