// Types
type PriceValidationResult =
	| { ok: true }
	| { ok: false; error: "NEGATIVE_PRICE" | "NON_INTEGER_PRICE" };

// Validation
export function validatePrice(price: number): PriceValidationResult {
	if (price < 0) return { ok: false, error: "NEGATIVE_PRICE" };
	else if (!Number.isInteger(price))
		return { ok: false, error: "NON_INTEGER_PRICE" };
	else return { ok: true };
}
