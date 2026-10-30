import test from "node:test";
import assert from "node:assert/strict";
import { createLanguageController } from "../src/js/language.js";

class Element extends EventTarget {
  constructor(dataset = {}) {
    super();
    this.dataset = dataset;
    this.attributes = {};
    this.hidden = true;
    this.textContent = "";
  }
  setAttribute(name, value) { this.attributes[name] = value; }
}

function setup(url, saved) {
  const title = new Element({ i18n: "home.about" });
  const image = new Element({ i18nAlt: "art.acanthusAlt" });
  const nav = new Element({ i18nAria: "nav.label" });
  const buttons = ["en", "zh", "ja"].map(language => new Element({ language }));
  const link = new Element();
  link.href = "https://example.test/myCV.html";
  const switcher = new Element();
  const document = new EventTarget();
  document.documentElement = { lang: "" };
  document.querySelectorAll = selector => ({
    "[data-i18n]": [title], "[data-i18n-alt]": [image], "[data-i18n-aria]": [nav],
    "[data-language]": buttons, "[data-language-link]": [link], ".language-switcher": [switcher]
  })[selector] ?? [];
  globalThis.document = document;
  globalThis.location = { href: url };
  globalThis.history = { replaceState: (_state, _title, next) => { globalThis.location.href = String(next); } };
  let preference = saved;
  const controller = createLanguageController({
    readPreference: (_key, fallback) => preference ?? fallback,
    savePreference: (_key, value) => { preference = value; }
  });
  return { ...controller, document, title, image, nav, buttons, link, switcher, getPreference: () => preference };
}

test("URL language takes precedence and the page can switch and remember languages", () => {
  const page = setup("https://example.test/?lang=zh", "ja");
  let changes = 0;
  page.document.addEventListener("site:language-change", () => changes++);
  page.initLanguage();
  assert.equal(page.document.documentElement.lang, "zh-CN");
  assert.equal(page.title.textContent, "关于我");
  assert.ok(page.image.alt);
  assert.ok(page.nav.attributes["aria-label"]);
  assert.equal(page.buttons[1].attributes["aria-pressed"], "true");
  assert.equal(page.switcher.hidden, false);
  assert.equal(new URL(page.link.href).searchParams.get("lang"), "zh");
  page.buttons[2].dispatchEvent(new Event("click"));
  assert.equal(page.document.documentElement.lang, "ja");
  assert.equal(page.buttons[2].attributes["aria-pressed"], "true");
  assert.equal(page.getPreference(), "ja");
  assert.equal(new URL(page.link.href).searchParams.get("lang"), "ja");
  assert.equal(new URL(globalThis.location.href).searchParams.get("lang"), "ja");
  assert.equal(changes, 2);
});

test("invalid language falls back to the saved preference and then English", () => {
  const saved = setup("https://example.test/?lang=fr", "ja");
  saved.initLanguage();
  assert.equal(saved.document.documentElement.lang, "ja");
  const fallback = setup("https://example.test/?lang=fr", "invalid");
  fallback.initLanguage();
  assert.equal(fallback.document.documentElement.lang, "en");
  assert.equal(fallback.title.textContent, "About Me");
  assert.equal(fallback.translate("cert.count", { count: 3 }), "3 certificates");
});
