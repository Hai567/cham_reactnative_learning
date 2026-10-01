import { getProjectLabel, type MemoryProject } from "@/domain/project";
import { colors, radius, spacing } from "@/theme/tokens";
import { StyleSheet, Text, View } from "react-native";

type ProjectCardProps = {
	project: MemoryProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
	console.log("card", project.id);
	return (
		<View style={styles.card}>
			<Text style={styles.id}>#{project.id}</Text>
			<Text style={styles.label}>{getProjectLabel(project)}</Text>
			{project.status === "cancelled" && (
				<Text style={styles.muted}>
					Cancelled on {project.cancelledAt.toLocaleString("vi-VN")}
				</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: colors.surface,
		borderRadius: radius.card,
		borderWidth: 1,
		borderColor: colors.border,
		padding: spacing.md,
		gap: spacing.xs,
	},
	id: { fontSize: 12, color: colors.inkMuted },
	label: { fontSize: 16, color: colors.ink },
	muted: { fontSize: 14, color: colors.inkMuted },
});
