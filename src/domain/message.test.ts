import { validateMessage } from "./message";

describe("validateMessage", () => {
	it("doesn't allow more than 120 chars", () => {
		expect(validateMessage("a".repeat(121))).toEqual({
			ok: false,
			error: "MESSAGE_TOO_LONG",
		});
	});
	it("allow 120 chars message", () => {
		expect(validateMessage("a".repeat(120))).toEqual({
			ok: true,
			message: "a".repeat(120),
		});
	});
	it("allow empty message", () => {
		expect(validateMessage(" ")).toEqual({
			ok: true,
			message: "",
		});
	});
	it("allow 120 char with empty char on both ends", () => {
		expect(validateMessage("    " + "a".repeat(120) + "    ")).toEqual({
			ok: true,
			message: "a".repeat(120),
		});
	});
	it("xin chào", () => {
		expect(validateMessage("  xin chào  ")).toEqual({
			ok: true,
			message: "xin chào",
		});
	});
});
