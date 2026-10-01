import { FrameColorOption } from "@/components/FrameColorOption";
import { ProjectCard } from "@/components/ProjectCard";
import { makePhoto, makeVideo } from "@/domain/common-test-func";
import { FRAME_COLORS } from "@/domain/frame";
import { MemoryProject } from "@/domain/project";
import { colors, spacing } from "@/theme/tokens";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const sampleProjects: MemoryProject[] = [
	{
		id: "1",
		status: "draft",
	},
	{ id: "2", status: "media_ready", photo: makePhoto(), video: makeVideo() },
	{
		id: "3",
		status: "cancelled",
		reason: "Don't like it",
		cancelledAt: new Date("2026-10-01T08:51:00.000Z"),
	},
];

export default function HomeScreen() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.header}>
					<Text style={styles.title}>Chạm</Text>
					<Text style={styles.tagline}>
						Chạm vào ảnh, sống lại khoảnh khắc
					</Text>
				</View>
				<View>
					<Text style={styles.sectionTitle}>Chọn màu khung</Text>
					<View style={styles.colorRow}>
						{FRAME_COLORS.map((color) => (
							<FrameColorOption
								key={color}
								color={color}
								selected={color === "walnut"}
								onPress={() => console.log(color)}
							></FrameColorOption>
						))}
					</View>
				</View>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Dự án của bạn</Text>
					<View>
						{sampleProjects.map((prj) => (
							<ProjectCard
								key={prj.id}
								project={prj}
							></ProjectCard>
						))}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	safeArea: { flex: 1, backgroundColor: colors.canvas },
	content: { padding: spacing.lg, gap: spacing.xl },
	header: { gap: spacing.xs },
	title: {
		fontSize: 32,
		lineHeight: 40,
		fontWeight: "700",
		letterSpacing: 2,
		color: colors.ink,
	},
	tagline: { fontSize: 16, lineHeight: 24, color: colors.inkMuted },
	section: { gap: spacing.md },
	sectionTitle: {
		fontSize: 20,
		lineHeight: 28,
		fontWeight: "600",
		color: colors.ink,
	},
	colorRow: { flexDirection: "row", justifyContent: "space-between" },
	projectList: { gap: spacing.sm },
});
