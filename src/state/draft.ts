import type { FrameColor } from "@/domain/frame";
import { assertNever } from "@/domain/project";

export interface DraftState {
	frameColor: FrameColor;
	message: string;
}

export type DraftAction =
	| {
			type: "color_selected";
			color: FrameColor;
	  }
	| { type: "message_changed"; message: string }
	| { type: "reset" };

export const initDraftState: DraftState = {
	frameColor: "walnut",
	message: "",
};

export function draftReducer(
	state: DraftState,
	action: DraftAction,
): DraftState {
	switch (action.type) {
		case "color_selected":
			return { ...state, frameColor: action.color };

		case "message_changed":
			return { ...state, message: action.message };

		case "reset":
			return initDraftState;

		default:
			assertNever(action);
	}
}

export function hasDraftChanged(draft: DraftState): boolean {
	return (
		draft.frameColor !== initDraftState.frameColor ||
		draft.message.trim() !== initDraftState.message
	);
}
