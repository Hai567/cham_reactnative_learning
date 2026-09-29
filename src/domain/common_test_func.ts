import { PhotoAsset, VideoAsset } from "./media";
import { CancelledProject, DraftProject, MediaReadyProject } from "./project";

export function makePhoto(overrides: Partial<PhotoAsset> = {}): PhotoAsset {
	return {
		id: "1",
		uri: "link",
		width: 1280,
		height: 980,
		...overrides,
	};
}

export function makeVideo(overrides: Partial<VideoAsset> = {}): VideoAsset {
	return {
		id: "1",
		uri: "link",
		durationSeconds: 20,
		fileSizeBytes: 20_000,
		mimeType: "video/mp4",
		uploadStatus: "uploaded",
		...overrides,
	};
}

export function makeDraftProject(
	rest: Partial<DraftProject> = {},
): DraftProject {
	return {
		id: "1",
		status: "draft",
		...rest,
	};
}

export function makeMediaReadyProject(
	rest: Partial<MediaReadyProject> = {},
): MediaReadyProject {
	return {
		id: "1",
		status: "media_ready",
		photo: makePhoto(),
		video: makeVideo({ uploadStatus: "uploaded" }),
		...rest,
	};
}

export function makeCancelledProject(
	cancelledAt: Date,
	rest: Partial<CancelledProject> = {},
): CancelledProject {
	return {
		id: "1",
		status: "cancelled",
		reason: "I don't like it",
		cancelledAt: cancelledAt,
		...rest,
	};
}
