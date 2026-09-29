// Types
type UploadStatus = "local" | "uploading" | "uploaded" | "failed";

export const supportedMimeTypes = ["video/mp4", "video/quicktime"];

type VideoValidationError =
	| "INVALID_DURATION"
	| "VIDEO_TOO_LONG"
	| "INVALID_FILE_SIZE"
	| "UNSUPPORTED_MIME_TYPE";

export type VideoValidationResult =
	| { ok: true }
	| { ok: false; error: VideoValidationError };

export type UploadResult =
	| { status: "success"; url: string }
	| { status: "failure"; message: string };

export interface VideoAsset {
	id: string;
	uri: string;
	durationSeconds: number;
	fileSizeBytes: number;
	mimeType: string;
	uploadStatus: UploadStatus;
}

// Validation
export function validateVideo(metadata: VideoAsset): VideoValidationResult {
	if (metadata.durationSeconds <= 0)
		return { ok: false, error: "INVALID_DURATION" };
	else if (metadata.durationSeconds > 30)
		return { ok: false, error: "VIDEO_TOO_LONG" };
	else if (!supportedMimeTypes.includes(metadata.mimeType))
		return { ok: false, error: "UNSUPPORTED_MIME_TYPE" };
	else if (metadata.fileSizeBytes <= 0)
		return { ok: false, error: "INVALID_FILE_SIZE" };
	return { ok: true };
}

export function validateVideoReadyForCheckout(video: VideoAsset): boolean {
	const isVideoValid = validateVideo(video);

	if (!isVideoValid.ok) return false;

	return video.uploadStatus == "uploaded";
}
