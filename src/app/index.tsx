import { sampleProjects } from "@/dev/sample-data";
import { colors, spacing } from "@/theme/tokens";

import { PrimaryButton } from "@/components/PrimaryButton";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useRouter } from "expo-router";

export default function HomeScreen() {
	const router = useRouter();

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.header}>
					<Text style={styles.title}>Chạm</Text>
					<Text style={styles.tagline}>
						Chạm vào ảnh, sống lại khoảnh khắc
					</Text>
					<PrimaryButton
						label="Tạo kỷ niệm mới"
						onPress={() => router.push("/create")}
					/>
				</View>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Dự án của bạn</Text>
					<View style={styles.projectList}>
						{sampleProjects.map((prj) => (
							<ProjectCard
								onPress={() =>
									router.push({
										pathname: "/projects/[id]",
										params: { id: prj.id },
									})
								}
								key={prj.id}
								project={prj}
							/>
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
	projectList: { gap: spacing.sm },
});
