import { FRAME_COLOR_INFO, FRAME_COLORS, FrameColor } from "@/domain/frame";
import { MAX_MESSAGE_LENGTH } from "@/domain/message";
import { MemoryProject } from "@/domain/project";
import { colors, radius, spacing } from "@/theme/tokens";
import { useState } from "react";

import { FrameColorOption } from "@/components/FrameColorOption";
import { ProjectCard } from "@/components/ProjectCard";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { makePhoto, makeVideo } from "@/domain/common-test-func";

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
	console.log("render");
	const [selectedColor, setSelectedColor] = useState<FrameColor>("walnut");
	const [message, setMessage] = useState<string>("");
	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.content}>
				<View style={styles.header}>
					<Text style={styles.title}>Chạm</Text>
					<Text style={styles.tagline}>
						Chạm vào ảnh, sống lại khoảnh khắc
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Chọn màu khung</Text>
					<View style={styles.colorRow}>
						{FRAME_COLORS.map((color) => (
							<FrameColorOption
								key={color}
								color={color}
								selected={color === selectedColor}
								onPress={() => setSelectedColor(color)}
							></FrameColorOption>
						))}
					</View>
					<Text>
						Đã chọn: {FRAME_COLOR_INFO[selectedColor].label}
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Lời nhắn</Text>
					<View>
						<TextInput
							value={message}
							onChangeText={(v) => setMessage(v)}
							multiline
							maxLength={MAX_MESSAGE_LENGTH}
							placeholder="Viết vài dòng cho người nhận..."
							placeholderTextColor={colors.inkMuted}
						></TextInput>
						<Text>{message.length}/120</Text>
					</View>
					<Text>
						Đã chọn: {FRAME_COLOR_INFO[selectedColor].label}
					</Text>
				</View>
				<View style={styles.section}>
					<Text style={styles.sectionTitle}>Xem trước</Text>
					<View style={styles.previewWrapper}>
						<View
							style={[
								styles.previewFrame,
								{
									backgroundColor:
										FRAME_COLOR_INFO[selectedColor].hex,
								},
							]}
						>
							<View style={styles.previewPhoto}>
								<Text style={styles.previewPhotoText}>
									Ảnh của bạn
								</Text>
							</View>
						</View>
						<Text style={styles.previewPlaceholder}>{message}</Text>
					</View>
					<Text>
						Đã chọn: {FRAME_COLOR_INFO[selectedColor].label}
					</Text>
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
	selectedLabel: { fontSize: 14, color: colors.inkMuted },
	input: {
		minHeight: 96,
		borderWidth: 1,
		borderColor: colors.border,
		borderRadius: radius.input,
		backgroundColor: colors.surface,
		padding: spacing.md,
		fontSize: 16,
		lineHeight: 24,
		color: colors.ink,
		textAlignVertical: "top",
	},
	counter: { fontSize: 12, color: colors.inkMuted, alignSelf: "flex-end" },
	previewWrapper: { alignItems: "center", gap: spacing.md },
	previewFrame: {
		width: 200,
		padding: 14,
		borderRadius: 6,
		boxShadow: "0 8px 24px rgba(41, 33, 29, 0.18)",
	},
	previewPhoto: {
		aspectRatio: 2 / 3,
		borderRadius: 2,
		backgroundColor: colors.border,
		alignItems: "center",
		justifyContent: "center",
	},
	previewPhotoText: { fontSize: 12, color: colors.inkMuted },
	previewMessage: {
		maxWidth: 260,
		fontSize: 15,
		lineHeight: 22,
		fontStyle: "italic",
		textAlign: "center",
		color: colors.ink,
	},
	previewPlaceholder: { color: colors.inkMuted },
});
