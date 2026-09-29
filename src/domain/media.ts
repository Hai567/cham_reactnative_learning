// Constants
const MAX_VIDEO_DURATION_SECONDS = 30;
const SUPPORTED_MIME_TYPES = ["video/mp4", "video/quicktime"];

// Types
type UploadStatus = "local" | "uploading" | "uploaded" | "failed";

export type VideoValidationError =
	| "INVALID_DURATION"
	| "VIDEO_TOO_LONG"
	| "INVALID_FILE_SIZE"
	| "UNSUPPORTED_MIME_TYPE";

export type VideoValidationResult =
	| { ok: true }
	| { ok: false; error: VideoValidationError };

export interface VideoAsset {
	id: string;
	uri: string;
	durationSeconds: number;
	fileSizeBytes: number;
	mimeType: string;
	uploadStatus: UploadStatus;
}

// Photo
export interface PhotoAsset {
	id: string;
	uri: string;
	width: number;
	height: number;
}

// Validation
export function validateVideo(metadata: VideoAsset): VideoValidationResult {
	if (metadata.durationSeconds <= 0)
		return { ok: false, error: "INVALID_DURATION" };
	if (metadata.durationSeconds > MAX_VIDEO_DURATION_SECONDS)
		return { ok: false, error: "VIDEO_TOO_LONG" };
	if (!SUPPORTED_MIME_TYPES.includes(metadata.mimeType))
		return { ok: false, error: "UNSUPPORTED_MIME_TYPE" };
	if (metadata.fileSizeBytes <= 0)
		return { ok: false, error: "INVALID_FILE_SIZE" };
	return { ok: true };
}

export function isVideoReadyForCheckout(video: VideoAsset): boolean {
	const isVideoValid = validateVideo(video);

	if (!isVideoValid.ok) return false;

	return video.uploadStatus === "uploaded";
}
