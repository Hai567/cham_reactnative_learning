import { DraftProvider } from "@/state/DraftContext";
import { Stack } from "expo-router";

import { colors } from "@/theme/tokens";

export default function RootLayout() {
	return (
		<DraftProvider>
			<Stack
				screenOptions={{
					headerStyle: { backgroundColor: colors.canvas },
					headerTintColor: colors.ink,
					headerShadowVisible: false,
					contentStyle: { backgroundColor: colors.canvas },
				}}
			>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen
					name="create"
					options={{ title: "Tạo kỷ niệm" }}
				/>
				<Stack.Screen
					name="projects/[id]"
					options={{ title: "Chi tiết" }}
				/>
			</Stack>
		</DraftProvider>
	);
}
