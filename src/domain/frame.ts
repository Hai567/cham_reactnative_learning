// Types
export type FrameColor = "walnut" | "natural" | "white" | "black";

export interface FrameProduct {
	id: string;
	name: string;
	widthCm: number;
	heightCm: number;
	availableColors: FrameColor[];
	priceVnd: number;
	isActive: boolean;
}
