// Types
export type FrameColor = "walnut" | "natural" | "white" | "black";
export const frameColors = ["walnut", "natural", "white", "black"] as const;

export interface FrameProduct {
	id: string;
	name: string;
	widthCm: number;
	heightCm: number;
	availableColors: FrameColor[];
	priceVnd: number;
	isActive: boolean;
}

export const FRAME_COLOR_LABELS: Record<FrameColor, string> = {
	walnut: "Gỗ óc chó",
	natural: "Gỗ tự nhiên",
	white: "Trắng",
	black: "Đen",
};

export const FRAME_COLOR_HEX: Record<FrameColor, string> = {
	walnut: "#Dontknow",
	natural: "#Dontknow",
	white: "#Dontknow",
	black: "#Dontknow",
};
