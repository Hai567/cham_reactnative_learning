import { Pressable, StyleSheet, Text } from "react-native";

import { colors, radius, spacing } from "@/theme/tokens";

interface PrimaryButtonProps {
	label: string;
	onPress: () => void;
}

export function PrimaryButton({ label, onPress }: PrimaryButtonProps) {
	return (
		<Pressable
			accessibilityRole="button"
			onPress={onPress}
			style={({ pressed }) => [styles.button, pressed && styles.pressed]}
		>
			<Text style={styles.label}>{label}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		minHeight: 48,
		paddingHorizontal: spacing.lg,
		borderRadius: radius.pill,
		backgroundColor: colors.brand,
		alignItems: "center",
		justifyContent: "center",
	},
	pressed: { opacity: 0.85 },
	label: { fontSize: 16, fontWeight: "600", color: colors.surface },
});
