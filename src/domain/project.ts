import type { PhotoAsset, VideoAsset, VideoValidationError } from "./media";

import { validateVideo } from "./media";

// Types
export interface DraftProject {
	status: "draft";
	id: string;
	photo?: PhotoAsset;
	video?: VideoAsset;
}

export interface MediaReadyProject {
	status: "media_ready";
	id: string;
	photo: PhotoAsset;
	video: VideoAsset;
}

export interface CancelledProject {
	status: "cancelled";
	id: string;
	reason: string;
	cancelledAt: Date;
}

export type MemoryProject = DraftProject | MediaReadyProject | CancelledProject;

type MarkMediaReadyResult =
	| { ok: true; project: MediaReadyProject }
	| {
			ok: false;
			error:
				| "MISSING_PHOTO"
				| "MISSING_VIDEO"
				| "VIDEO_NOT_UPLOADED"
				| VideoValidationError;
	  };

type CancelProjectError = "EMPTY_REASON" | "ALREADY_CANCELLED";

type CancelProjectResult =
	| { ok: true; project: CancelledProject }
	| { ok: false; error: CancelProjectError };

function assertNever(value: never): never {
	throw new Error(`State not processed: ${JSON.stringify(value)}`);
}

export function getProjectLabel(project: MemoryProject): string {
	switch (project.status) {
		case "draft":
			return "Draft";
		case "media_ready":
			return `Media ready with ${project.video.durationSeconds}`;
		case "cancelled":
			return `Cancelled because ${project.reason}`;
		default:
			return assertNever(project);
	}
}

export function markMediaReady(project: DraftProject): MarkMediaReadyResult {
	if (!project.video) return { ok: false, error: "MISSING_VIDEO" };
	if (!project.photo) return { ok: false, error: "MISSING_PHOTO" };

	const results = validateVideo(project.video);

	if (results.ok === false) return results;
	if (project.video.uploadStatus !== "uploaded")
		return { ok: false, error: "VIDEO_NOT_UPLOADED" };

	const readyProject: MediaReadyProject = {
		status: "media_ready",
		id: project.id,
		photo: project.photo,
		video: project.video,
	};
	return { ok: true, project: readyProject };
}

export function cancelProject(
	project: MemoryProject,
	reason: string,
	now: Date,
): CancelProjectResult {
	if (project.status === "cancelled")
		return { ok: false, error: "ALREADY_CANCELLED" };
	if (reason.trim() === "") return { ok: false, error: "EMPTY_REASON" };

	const cancelledProject: CancelledProject = {
		status: "cancelled",
		id: project.id,
		reason: reason,
		cancelledAt: now,
	};
	return { ok: true, project: cancelledProject };
}
