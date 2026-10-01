// Types
export const FRAME_COLORS = ["walnut", "natural", "white", "black"] as const;
export type FrameColor = (typeof FRAME_COLORS)[number];

interface FrameColorInfo {
	label: string;
	hex: string;
}

export interface FrameProduct {
	id: string;
	name: string;
	widthCm: number;
	heightCm: number;
	availableColors: FrameColor[];
	priceVnd: number;
	isActive: boolean;
}

export const FRAME_COLOR_INFO: Record<FrameColor, FrameColorInfo> = {
	walnut: { label: "Gỗ óc chó", hex: "#5A3E2B" },
	natural: { label: "Gỗ tự nhiên", hex: "#C9A57A" },
	white: { label: "Trắng", hex: "#F4F1EC" },
	black: { label: "Đen", hex: "#23201E" },
};
