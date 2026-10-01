import type { DraftAction } from "./draft";
import { draftReducer, hasDraftChanged, initDraftState } from "./draft";

describe("draftReducer", () => {
	it("return new color, message unchanged", () => {
		const action: DraftAction = { type: "color_selected", color: "black" };
		expect(draftReducer(initDraftState, action)).toEqual({
			...initDraftState,
			frameColor: action.color,
		});
	});
	it("change message, keep the 2 ends spaces", () => {
		const action: DraftAction = {
			type: "message_changed",
			message: " Hello WOrld  ",
		};
		expect(draftReducer(initDraftState, action)).toEqual({
			...initDraftState,
			message: action.message,
		});
	});
	it("reset state", () => {
		const action: DraftAction = { type: "reset" };
		expect(draftReducer(initDraftState, action)).toEqual(initDraftState);
	});
	it("doesn't change the input state", () => {
		const action: DraftAction = {
			type: "message_changed",
			message: " Hello WOrld  ",
		};
		const snapshot = structuredClone(initDraftState);
		draftReducer(initDraftState, action);
		expect(initDraftState).toEqual(snapshot);
	});
});

describe("hasDraftChanged", () => {
	it("state ban đầu là false", () => {
		expect(hasDraftChanged(initDraftState)).toBe(false);
	});
	it("đổi màu là true", () => {
		expect(
			hasDraftChanged({ ...initDraftState, frameColor: "natural" }),
		).toBe(true);
	});
	it("lời nhắn chỉ có khoảng trắng là false", () => {
		expect(hasDraftChanged({ ...initDraftState, message: "    " })).toBe(
			false,
		);
	});
});
