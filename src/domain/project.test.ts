import {
	makeCancelledProject,
	makeDraftProject,
	makeMediaReadyProject,
	makePhoto,
	makeVideo,
} from "./common-test-func";
import {
	CancelledProject,
	cancelProject,
	getProjectLabel,
	markMediaReady,
} from "./project";

describe("getProjectLabel", () => {
	it("get draft project", () => {
		expect(getProjectLabel(makeDraftProject())).toBe("Draft");
	});
	it("get media ready project", () => {
		const mediaReadyProject = makeMediaReadyProject();
		expect(getProjectLabel(mediaReadyProject)).toBe(
			`Media ready with ${mediaReadyProject.video.durationSeconds}`,
		);
	});
	it("get cancelled project", () => {
		const now = new Date("2026-10-01T08:51:00.000Z");
		const cancelledProject = makeCancelledProject(now);
		expect(getProjectLabel(cancelledProject)).toBe(
			`Cancelled because ${cancelledProject.reason}`,
		);
	});
});

describe("markMediaReady", () => {
	it("draft missing photo", () => {
		const video = makeVideo();
		const prj = makeDraftProject({ video });
		expect(markMediaReady(prj)).toEqual({
			ok: false,
			error: "MISSING_PHOTO",
		});
	});
	it("draft missing video", () => {
		const photo = makePhoto();
		const prj = makeDraftProject({ photo });
		expect(markMediaReady(prj)).toEqual({
			ok: false,
			error: "MISSING_VIDEO",
		});
	});
	it("draft video too long", () => {
		const photo = makePhoto();
		const video = makeVideo({ durationSeconds: 31 });
		const prj = makeDraftProject({ photo, video: video });
		expect(markMediaReady(prj)).toEqual({
			ok: false,
			error: "VIDEO_TOO_LONG",
		});
	});
	it("draft video not uploaded", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "local" });
		const prj = makeDraftProject({ photo, video: video });
		expect(markMediaReady(prj)).toEqual({
			ok: false,
			error: "VIDEO_NOT_UPLOADED",
		});
	});
	it("correct media_ready draft", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "uploaded" });
		const prj = makeDraftProject({
			photo: photo,
			video: video,
		});
		const targetPrj = makeMediaReadyProject({
			...prj,
			status: "media_ready",
		});
		expect(markMediaReady(prj)).toEqual({
			ok: true,
			project: targetPrj,
		});
	});
	it("Project gốc không bị thay đổi sau khi chuyển", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "uploaded" });
		const prj = makeDraftProject({ photo, video });
		const snapshot = structuredClone(prj);

		markMediaReady(prj);
		expect(prj).toEqual(snapshot);
	});
});

describe("cancelProject", () => {
	it("Successfully cancel draft", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "uploaded" });
		const prj = makeDraftProject({
			photo: photo,
			video: video,
		});
		const now = new Date("2026-10-01T08:51:00.000Z");
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
		const now = new Date("2026-10-01T08:51:00.000Z");
		const cancelReason = "I don't like it";
		const cancelledPrj = makeCancelledProject(now);

		expect(cancelProject(cancelledPrj, cancelReason, now)).toEqual({
			ok: false,
			error: "ALREADY_CANCELLED",
		});
	});
	it("Can't cancel project with empty reason", () => {
		const photo = makePhoto();
		const video = makeVideo({ uploadStatus: "uploaded" });
		const prj = makeDraftProject({
			photo: photo,
			video: video,
		});
		const now = new Date("2026-10-01T08:51:00.000Z");
		const cancelReason = "   ";
		expect(cancelProject(prj, cancelReason, now)).toEqual({
			ok: false,
			error: "EMPTY_REASON",
		});
	});
});
