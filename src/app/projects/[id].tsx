import { spacing } from "@/theme/tokens";

import { PrimaryButton } from "@/components/PrimaryButton";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { findSampleProject } from "@/dev/sample-data";
import { getProjectLabel } from "@/domain/project";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function ProjectDetailScreen() {
	const id = useLocalSearchParams<{ id: string }>().id;
	const prj = findSampleProject(id);
	const router = useRouter();

	if (prj) {
		return (
			<ScrollView contentContainerStyle={styles.content}>
				<Text>{id}</Text>
				<Text>{getProjectLabel(prj)}</Text>
				{(() => {
					switch (prj.status) {
						case "draft":
							return (
								<View>
									<Text>
										{prj.photo
											? "Đã có ảnh"
											: "Chưa có ảnh"}
									</Text>
								</View>
							);
						case "media_ready":
							return (
								<View>
									<Text>
										Video {prj.video.durationSeconds}s
									</Text>
								</View>
							);
						case "cancelled":
							return (
								<View>
									<Text>Lý do hủy: {prj.reason}</Text>
									<Text>
										At:{" "}
										{prj.cancelledAt.toLocaleString(
											"vi-VN",
										)}
									</Text>
								</View>
							);
					}
				})()}
			</ScrollView>
		);
	}
	return (
		<View>
			<Text>Không tìm thấy dự án này</Text>
			<PrimaryButton
				label="Về trang chủ"
				onPress={() => router.push("/")}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	content: { padding: spacing.lg, gap: spacing.xl },
});
