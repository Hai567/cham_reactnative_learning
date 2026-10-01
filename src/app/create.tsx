import { FrameColorOption } from "@/components/FrameColorOption";
import { FRAME_COLOR_INFO, FRAME_COLORS } from "@/domain/frame";
import { MAX_MESSAGE_LENGTH } from "@/domain/message";
import { colors, radius, spacing } from "@/theme/tokens";

import type { FrameColor } from "@/domain/frame";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function CreateScreen() {
	const [selectedColor, setSelectedColor] = useState<FrameColor>("walnut");
	const [message, setMessage] = useState<string>("");
	const trimmedMessage = message.trim();
	return (
		<ScrollView contentContainerStyle={styles.content}>
			<View style={styles.section}>
				<Text style={styles.sectionTitle}>Chọn màu khung</Text>
				<View style={styles.colorRow}>
					{FRAME_COLORS.map((color) => (
						<FrameColorOption
							key={color}
							color={color}
							selected={color === selectedColor}
							onPress={() => setSelectedColor(color)}
						/>
					))}
				</View>
				<Text style={styles.selectedLabel}>
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
						style={styles.input}
					/>
					<Text style={styles.counter}>
						{message.length}/{MAX_MESSAGE_LENGTH}
					</Text>
				</View>
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
					{trimmedMessage.length !== 0 ? (
						<Text style={styles.previewMessage}>
							{trimmedMessage}
						</Text>
					) : (
						<Text style={styles.previewPlaceholder}>
							Lời nhắn sẽ hiện ở đây
						</Text>
					)}
				</View>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	content: { padding: spacing.lg, gap: spacing.xl },
	section: { gap: spacing.md },
	sectionTitle: {
		fontSize: 20,
		lineHeight: 28,
		fontWeight: "600",
		color: colors.ink,
	},
	colorRow: { flexDirection: "row", justifyContent: "space-between" },
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
