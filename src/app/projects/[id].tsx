import { colors, spacing } from "@/theme/tokens";

import { PrimaryButton } from "@/components/PrimaryButton";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { findSampleProject } from "@/dev/sample-data";
import type { MemoryProject } from "@/domain/project";
import { assertNever, getProjectLabel } from "@/domain/project";
import { useLocalSearchParams, useRouter } from "expo-router";

function ProjectStatusDetails({ prj }: { prj: MemoryProject }) {
	switch (prj.status) {
		case "draft":
			return (
				<View>
					<Text>{prj.photo ? "Đã có ảnh" : "Chưa có ảnh"}</Text>
				</View>
			);
		case "media_ready":
			return (
				<View>
					<Text>Video {prj.video.durationSeconds}s</Text>
					<Text>Photo {prj.photo.uri}s</Text>
				</View>
			);
		case "cancelled":
			return (
				<View>
					<Text>Lý do hủy: {prj.reason}</Text>
					<Text>At: {prj.cancelledAt.toLocaleString("vi-VN")}</Text>
				</View>
			);
		default:
			return assertNever(prj);
	}
}

export default function ProjectDetailScreen() {
	const id = useLocalSearchParams<{ id: string }>().id;
	const prj = findSampleProject(id);
	const router = useRouter();

	if (prj) {
		return (
			<ScrollView contentContainerStyle={styles.content}>
				<Text style={styles.sectionTitle}>{getProjectLabel(prj)}</Text>
				<Text>{id}</Text>
				<ProjectStatusDetails prj={prj} />
			</ScrollView>
		);
	}
	return (
		<ScrollView contentContainerStyle={styles.content}>
			<Text style={styles.sectionTitle}>Không tìm thấy dự án này</Text>
			<PrimaryButton
				label="Về trang chủ"
				onPress={() =>
					router.canGoBack() ? router.back() : router.replace("/")
				}
			/>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: { padding: spacing.lg, gap: spacing.xl },
	sectionTitle: {
		fontSize: 20,
		lineHeight: 28,
		fontWeight: "600",
		color: colors.ink,
	},
	selectedLabel: { fontSize: 14, color: colors.inkMuted },
});
