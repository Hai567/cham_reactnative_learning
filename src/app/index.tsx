import FrameColorOption from "@/components/FrameColorOption";
import { frameColors } from "@/domain/frame";
import { colors } from "@/theme/tokens";
import { ScrollView, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
	return (
		<SafeAreaView
			style={{
				flex: 1,
				//alignItems: "center",
				//justifyContent: "center",
				backgroundColor: colors.canvas,
			}}
		>
			<ScrollView>
				<Text> Chạm </Text>
				<Text>Chạm vào ảnh, sống lại khoảnh khắc</Text>
				{frameColors.map((color) => (
					<FrameColorOption
						key={color}
						color={color}
						selected={color === "walnut"}
						onPress={() => console.log(color)}
					></FrameColorOption>
				))}
			</ScrollView>
		</SafeAreaView>
	);
}
