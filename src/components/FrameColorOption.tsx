import { FrameColor } from "@/domain/frame";
import { colors } from "@/theme/tokens";
import { Pressable, View } from "react-native";

type FrameColorOptionProps = {
	color: FrameColor;
	selected: boolean;
	onPress: () => void;
};

export default function FrameColorOption({
	color,
	selected,
	onPress,
}: FrameColorOptionProps) {
	return (
		<Pressable accessibilityRole="button" accessibilityState={{ selected }}>
			<View
				style={[
					{
						borderRadius: 22,
						width: 44,
						height: 44,
						borderColor: colors.border,
					},
					selected && { borderWidth: 2, borderColor: colors.brand },
				]}
			></View>
			{color}
		</Pressable>
	);
}
