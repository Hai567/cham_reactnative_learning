import { validatePrice } from "./price";

describe("validatePrice", () => {
	it("allow >0 int", () => {
		expect(validatePrice(250_000)).toEqual({ ok: true });
	});
	it("disallow <0 value", () => {
		expect(validatePrice(-1)).toEqual({
			ok: false,
			error: "NEGATIVE_PRICE",
		});
	});
	it("disallow decimal value", () => {
		expect(validatePrice(1.2)).toEqual({
			ok: false,
			error: "NON_INTEGER_PRICE",
		});
	});
});
