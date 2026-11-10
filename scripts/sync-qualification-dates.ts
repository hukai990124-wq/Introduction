// Run in a fresh process after compilation so development edits never use cached dates.
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const languageUrl = new URL("../../src/js/language.js", import.meta.url).href;
const datesUrl = new URL("../../src/js/qualification-dates.js", import.meta.url).href;
const { createLanguageController, isMessageKey } = await import(languageUrl) as {
    createLanguageController(preferences: { readPreference: (_key: string, fallback: string) => string; savePreference: () => void }): { translate: (key: string) => string };
    isMessageKey: (key: string | undefined) => boolean;
};
const { qualificationMonth, formatQualificationMonth } = await import(datesUrl) as {
    qualificationMonth: (key: string) => string;
    formatQualificationMonth: (key: string, locale: string) => string;
};
const { translate } = createLanguageController({ readPreference: (_key, fallback) => fallback, savePreference: () => {} });
const escapeHtml = (text: string) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");

function translatedAttribute(tag: string, attribute: string): string {
    const key = tag.match(new RegExp(`\\b${attribute}="([^"]+)"`))?.[1];
    if (!key || !isMessageKey(key)) throw new Error(`Unknown qualification date message: ${tag}`);
    return escapeHtml(translate(key));
}

for (const name of ["myCV.html", "certificates.html"]) {
    const file = fileURLToPath(new URL(`../../src/html/${name}`, import.meta.url));
    const original = readFileSync(file, "utf8");
    const html = original
        .replace(/(<time\b[^>]*\bdata-qualification-date="([^"]+)"[^>]*>)[^<]*(<\/time>)/g, (_match, start: string, key: string, end: string) => {
            if (!/\sdatetime="[^"]*"/.test(start)) throw new Error(`Missing datetime for qualification: ${key}`);
            return start.replace(/\sdatetime="[^"]*"/, ` datetime="${qualificationMonth(key)}"`) + escapeHtml(formatQualificationMonth(key, "en")) + end;
        })
        .replace(/(<(span|p)\b[^>]*\bdata-qualification-dates\b[^>]*>)[^<]*(<\/\2>)/g, (_match, start: string, _tag: string, end: string) =>
            start + translatedAttribute(start, "data-i18n") + end)
        .replace(/<img\b[^>]*\bdata-qualification-dates\b[^>]*>/g, tag =>
            tag.replace(/\salt="[^"]*"/, ` alt="${translatedAttribute(tag, "data-i18n-alt")}"`));
    if (html !== original) writeFileSync(file, html);
}
