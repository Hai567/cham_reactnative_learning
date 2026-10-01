import { FRAME_COLOR_INFO, FrameColor } from "@/domain/frame";
import { colors, radius, spacing } from "@/theme/tokens";
import { Pressable, StyleSheet, Text, View } from "react-native";

type FrameColorOptionProps = {
	color: FrameColor;
	selected: boolean;
	onPress: () => void;
};

export function FrameColorOption({
	color,
	selected,
	onPress,
}: FrameColorOptionProps) {
	return (
		<Pressable
			accessibilityRole="button"
			accessibilityState={{ selected }}
			onPress={onPress}
			style={({ pressed }) => [
				styles.option,
				pressed && styles.pressed,
				selected && styles.ringSelected,
			]}
		>
			<View style={[styles.ring, selected && styles.ringSelected]}>
				<View
					style={[
						styles.swatch,
						{ backgroundColor: FRAME_COLOR_INFO[color].hex },
					]}
				></View>
			</View>
			<Text style={[styles.label, selected && styles.labelSelected]}>
				{color}
			</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	option: {
		alignItems: "center",
		gap: spacing.xs,
		minWidth: 64,
		paddingVertical: spacing.xs,
	},
	pressed: { opacity: 0.7 },
	ring: {
		width: 52,
		height: 52,
		borderRadius: radius.pill,
		borderWidth: 2,
		borderColor: "transparent",
		alignItems: "center",
		justifyContent: "center",
	},
	ringSelected: { borderColor: colors.brand },
	swatch: {
		width: 40,
		height: 40,
		borderRadius: radius.pill,
		borderWidth: 1,
		borderColor: colors.border,
	},
	label: { fontSize: 13, color: colors.inkMuted },
	labelSelected: { color: colors.ink, fontWeight: "600" },
});
