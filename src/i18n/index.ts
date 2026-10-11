import { messages } from "./messages.js";
import type { Language, MessageKey } from "./messages.js";
import { readPreference, savePreference } from "../lib/preferences.js";

const locale: Record<Language, string> = { en: "en", zh: "zh-CN", ja: "ja" };
let language: Language = "en";

function supported(value: string | null): value is Language {
  return value === "en" || value === "zh" || value === "ja";
}

function messageKey(value: string | undefined): value is MessageKey {
  return value !== undefined && Object.hasOwn(messages.en, value);
}

export function translate(key: MessageKey, values: Record<string, string | number> = {}): string {
  return messages[language][key].replace(/\{(\w+)\}/g, (match: string, name: string) => String(values[name] ?? match));
}

export function applyLanguage(next: Language): void {
  language = next;
  document.documentElement.lang = locale[next];
  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach(element => {
    if (messageKey(element.dataset.i18n)) element.textContent = translate(element.dataset.i18n);
  });
  document.querySelectorAll<HTMLImageElement>("[data-i18n-alt]").forEach(element => {
    if (messageKey(element.dataset.i18nAlt)) element.alt = translate(element.dataset.i18nAlt);
  });
  document.querySelectorAll<HTMLElement>("[data-i18n-aria]").forEach(element => {
    if (messageKey(element.dataset.i18nAria)) element.setAttribute("aria-label", translate(element.dataset.i18nAria));
  });
  document.querySelectorAll<HTMLButtonElement>("[data-language]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.language === next));
  });
  document.querySelectorAll<HTMLAnchorElement>("[data-language-link]").forEach(link => {
    const target = new URL(link.href);
    target.searchParams.set("lang", next);
    link.href = target.href;
  });
  savePreference("hukai-language", next);
  document.dispatchEvent(new Event("site:language-change"));
}

export function initLanguage(): void {
  const requested = new URL(location.href).searchParams.get("lang");
  const saved = readPreference("hukai-language", "en");
  applyLanguage(supported(requested) ? requested : supported(saved) ? saved : "en");
  document.querySelectorAll<HTMLElement>(".language-switcher").forEach(element => { element.hidden = false; });
  document.querySelectorAll<HTMLButtonElement>("[data-language]").forEach(button => {
    button.addEventListener("click", () => {
      const next = button.dataset.language;
      if (!next || !supported(next)) return;
      applyLanguage(next);
      const url = new URL(location.href);
      url.searchParams.set("lang", next);
      history.replaceState(null, "", url);
    });
  });
}
