import type { Dispatch, ReactNode } from "react";
import { createContext, useContext, useReducer } from "react";

import type { DraftAction, DraftState } from "./draft";
import { draftReducer, initDraftState } from "./draft";

interface DraftContextValue {
	draft: DraftState;
	dispatch: Dispatch<DraftAction>;
}

const DraftContext = createContext<DraftContextValue | null>(null);

export function DraftProvider({ children }: { children: ReactNode }) {
	const [draft, dispatch] = useReducer(draftReducer, initDraftState);

	return <DraftContext value={{ draft, dispatch }}>{children}</DraftContext>;
}

export function useDraft(): DraftContextValue {
	const value = useContext(DraftContext);

	if (value === null) {
		throw new Error("useDraft must be used in DraftProvider");
	}
	return value;
}
