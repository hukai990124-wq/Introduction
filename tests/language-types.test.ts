import type { Language } from "../src/ts/language.js";

// TypeScript accepts the website's supported language codes.
const supported: Language = "zh";

// This line must be rejected by TypeScript; removing the comment reveals the error.
// @ts-expect-error "fr" is not one of the supported language codes.
const unsupported: Language = "fr";

void supported;
void unsupported;
