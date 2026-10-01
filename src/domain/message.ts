export const MAX_MESSAGE_LENGTH = 120;

type MessageValidationResult =
	| {
			ok: true;
			message: string;
	  }
	| {
			ok: false;
			error: "MESSAGE_TOO_LONG";
	  };

export function validateMessage(message: string): MessageValidationResult {
	const mes = message.trim();
	if (mes.length > 120) return { ok: false, error: "MESSAGE_TOO_LONG" };
	return { ok: true, message: mes };
}
