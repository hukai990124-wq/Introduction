import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { isMessageKey } from "../src/js/language.js";

let pageNumber = 0;

test("every page refers to existing translation keys", async () => {
  for (const filename of ["index.html", "myCV.html", "certificates.html", "myWorks.html", "artworks.html"]) {
    const html = await readFile(new URL(`../src/html/${filename}`, import.meta.url), "utf8");
    const { window } = new JSDOM(html);
    for (const attribute of ["data-i18n", "data-i18n-alt", "data-i18n-aria"]) {
      for (const element of window.document.querySelectorAll(`[${attribute}]`)) {
        const key = element.getAttribute(attribute);
        assert.ok(isMessageKey(key), `${filename}: unknown ${attribute} key ${key}`);
      }
    }
    window.close();
  }
});

async function openPage(filename, query = "?lang=en") {
  const html = await readFile(new URL(`../src/html/${filename}`, import.meta.url), "utf8");
  const dom = new JSDOM(html, { url: `https://example.test/${filename}${query}`, pretendToBeVisual: true });
  const { window } = dom;
  const media = { matches: true, addEventListener() {}, removeEventListener() {} };
  window.matchMedia = () => media;
  window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute("open", ""); };
  window.HTMLDialogElement.prototype.close = function () {
    this.removeAttribute("open");
    this.dispatchEvent(new window.Event("close"));
  };
  Object.assign(globalThis, {
    window, document: window.document, localStorage: window.localStorage,
    location: window.location, history: window.history, Event: window.Event,
    matchMedia: window.matchMedia, addEventListener: window.addEventListener.bind(window),
    requestAnimationFrame: () => 1, cancelAnimationFrame: () => {}, innerHeight: 800, scrollY: 0
  });
  const entry = new URL("../src/js/site.js", import.meta.url).href;
  await import(`${entry}?page=${pageNumber++}`);
  return window;
}

test("the home page switches among all three languages and carries the selection in links", async () => {
  const window = await openPage("index.html");
  const document = window.document;
  assert.equal(document.querySelector('[data-i18n="home.about"]').textContent, "About Me");
  document.querySelector('[data-language="zh"]').click();
  assert.equal(document.documentElement.lang, "zh-CN");
  assert.equal(document.querySelector('[data-i18n="home.about"]').textContent, "关于我");
  assert.equal(new URL(document.querySelector('[data-language-link]').href).searchParams.get("lang"), "zh");
  document.querySelector('[data-language="ja"]').click();
  assert.equal(document.documentElement.lang, "ja");
  assert.equal(document.querySelector('[data-i18n="home.about"]').textContent, "私について");
  window.close();
});

test("certificates can be filtered, viewed, navigated, and translated", async () => {
  const window = await openPage("certificates.html");
  const document = window.document;
  const records = [...document.querySelectorAll(".certificate-record")];
  document.querySelector('[data-filter="language"]').click();
  const visible = records.filter(record => !record.hidden);
  assert.ok(visible.length > 1);
  assert.ok(visible.every(record => record.dataset.category === "language"));
  const dialog = document.querySelector(".certificate-dialog");
  visible[0].querySelector(".certificate-open").click();
  assert.equal(dialog.open, true);
  assert.equal(dialog.querySelector(".viewer-title").textContent, visible[0].querySelector("h2").textContent);
  dialog.querySelector(".viewer-next").click();
  assert.equal(dialog.querySelector(".viewer-title").textContent, visible[1].querySelector("h2").textContent);
  document.querySelector('[data-language="zh"]').click();
  assert.equal(dialog.querySelector(".viewer-title").textContent, visible[1].querySelector("h2").textContent);
  assert.ok(document.querySelector(".certificate-count").textContent.includes("份证书"));
  dialog.querySelector(".viewer-close").click();
  assert.equal(dialog.open, false);
  window.close();
});

test("the CV stamp works and audio controls handle unavailable audio", async () => {
  const window = await openPage("myCV.html");
  const document = window.document;
  const button = document.querySelector(".stamp-button");
  const image = document.querySelector(".stamp-image");
  assert.equal(button.hidden, false);
  assert.equal(image.hidden, true);
  button.click();
  assert.equal(image.hidden, false);
  assert.equal(button.hidden, true);
  assert.equal(button.getAttribute("aria-expanded"), "true");
  assert.equal(document.querySelector(".audio-player").hidden, false);
  assert.equal(document.querySelector(".audio-toggle").disabled, true);
  window.close();
});
