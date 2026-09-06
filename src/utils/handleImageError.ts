import { FALLBACK_IMAGE } from "./tmdbImage";
import type { SyntheticEvent } from "react";

export function handleImageError(event: SyntheticEvent<HTMLImageElement>) {
	const img = event.currentTarget;
	if (img.src.includes(FALLBACK_IMAGE)) return; // уже фолбэк — не пытаться снова
	img.src = FALLBACK_IMAGE;
}