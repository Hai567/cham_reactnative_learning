import { PhotoAsset } from "./media";
import { makeVideo } from "./media.test";
import {
	CancelledProject,
	MemoryProject,
	cancelProject,
	getProjectLabel,
	markMediaReady,
} from "./project";

function makeProject(rest: Partial<MemoryProject> = {}): MemoryProject {
	return {
		id: "1",
		status: "draft",
		...rest,
	};
}

function makePhoto(overrides: Partial<PhotoAsset> = {}): PhotoAsset {
	return {
		id: "1",
		uri: "link",
		width: 1280,
		height: 980,
		...overrides,
	};
}

describe("getProjectLabel", () => {
	it("get draft project", () => {
		expect(getProjectLabel(makeProject())).toBe("Draft");
	});
	it("get media ready project", () => {
		const mediaReadyProject = makeProject({
			status: "media_ready",
			photo: makePhoto(),
			video: makeVideo(),
		});
		expect(getProjectLabel(mediaReadyProject)).toBe(
			`Media ready with ${mediaReadyProject.video.durationSeconds}`,
		);
	});
	it("get cancelled project", () => {
		const now = new Date(Date.now());
		const cancelledProject = makeProject({
			status: "cancelled",
			cancelledAt: now,
			reason: "Don't like it",
		});
		expect(getProjectLabel(cancelledProject)).toBe(
			`Cancelled because ${cancelledProject.reason}`,
		);
	});
	it("draft missing photo", () => {
		const video = makeVideo();
		const prj = makeProject({ video: video });
		expect(markMediaReady(prj)).toEqual({
			ok: false,
			error: "MISSING_PHOTO",
		});
	});
	it("draft missing video", () => {
		const photo = makePhoto();
		const prj = makeProject({ photo: photo });
		expect(markMediaReady(prj)).toEqual({
			ok: false,
			error: "MISSING_VIDEO",
		});
	});
	it("draft video too long", () => {
		const photo = makePhoto();
		const video = makeVideo({ durationSeconds: 31 });
		const prj = makeProject({ photo: photo, video: video });
		expect(markMediaReady(prj)).toEqual({
			ok: false,
			error: "VIDEO_TOO_LONG",
		});
	});
	it("draft video not uploaded", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "local" });
		const prj = makeProject({ photo: photo, video: video });
		expect(markMediaReady(prj)).toEqual({
			ok: false,
			error: "VIDEO_NOT_UPLOADED",
		});
	});
	it("correct media_ready draft", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "uploaded" });
		const prj = makeProject({
			photo: photo,
			video: video,
		});
		const targetPrj = {
			...prj,
			status: "media_ready",
		};
		expect(markMediaReady(prj)).toEqual({
			ok: true,
			project: targetPrj,
		});
	});
	it("Project gốc không bị thay đổi sau khi chuyển", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "uploaded" });
		const prj = makeProject({
			status: "media_ready",
			photo: photo,
			video: video,
		});
		expect(markMediaReady(prj).status).not.toBe(prj.status);
	});
	it("Successfully cancel draft", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "uploaded" });
		const prj = makeProject({
			status: "media_ready",
			photo: photo,
			video: video,
		});
		const now = new Date(Date.now());
		const cancelReason = "I don't like it";
		const expected: CancelledProject = {
			status: "cancelled",
			id: prj.id,
			reason: cancelReason,
			cancelledAt: now,
		};
		expect(cancelProject(prj, cancelReason, now)).toEqual({
			ok: true,
			project: expected,
		});
	});
	it("Can't cancel already cancelled draft", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "uploaded" });
		const prj = makeProject({
			status: "media_ready",
			photo: photo,
			video: video,
		});
		const now = new Date(Date.now());
		const cancelReason = "I don't like it";
		const cancelledPrj = cancelProject(prj, cancelReason, now).project;
		expect(cancelProject(cancelledPrj, cancelReason, now)).toEqual({
			ok: false,
			error: "ALREADY_CANCELLED",
		});
	});
	it("Can't cancel project with empty reason", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "uploaded" });
		const prj = makeProject({
			status: "media_ready",
			photo: photo,
			video: video,
		});
		const now = new Date(Date.now());
		const cancelReason = "   ";
		expect(cancelProject(prj, cancelReason, now)).toEqual({
			ok: false,
			error: "EMPTY_REASON",
		});
	});
});
