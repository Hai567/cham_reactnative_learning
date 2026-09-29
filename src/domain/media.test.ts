import {
	validateVideo,
	validateVideoReadyForCheckout,
	type VideoAsset,
} from "./media";

function makeVideo(overrides: Partial<VideoAsset> = {}): VideoAsset {
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

describe("validateVideo", () => {
	it("valid", () => {
		expect(validateVideo(makeVideo())).toEqual({
			ok: true,
		});
	});
	it("duration must >0", () => {
		expect(validateVideo(makeVideo({ durationSeconds: 0 }))).toEqual({
			ok: false,
			error: "INVALID_DURATION",
		});
	});
	it("valid 30 sec duration", () => {
		expect(validateVideo(makeVideo({ durationSeconds: 30 }))).toEqual({
			ok: true,
		});
	});
	it("31 sec duration", () => {
		expect(validateVideo(makeVideo({ durationSeconds: 31 }))).toEqual({
			ok: false,
			error: "VIDEO_TOO_LONG",
		});
	});
	it("0 byte file size", () => {
		expect(validateVideo(makeVideo({ fileSizeBytes: 0 }))).toEqual({
			ok: false,
			error: "INVALID_FILE_SIZE",
		});
	});
	it("avi file type", () => {
		expect(validateVideo(makeVideo({ mimeType: "video/avi" }))).toEqual({
			ok: false,
			error: "UNSUPPORTED_MIME_TYPE",
		});
	});
	it("ready to checkout", () => {
		expect(validateVideoReadyForCheckout(makeVideo())).toBe(true);
	});
	it("not ready to checkout", () => {
		expect(
			validateVideoReadyForCheckout(
				makeVideo({ uploadStatus: "uploading" }),
			),
		).toBe(false);
	});
});
