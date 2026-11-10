import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";
import { isMessageKey } from "../src/js/language.js";
import { qualificationMonths, qualificationMonth } from "../src/js/qualification-dates.js";

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

const fullDate = /\b\d{4}[-/]\d{1,2}[-/]\d{1,2}\b|\d{4}\s*年\s*\d{1,2}\s*月\s*\d{1,2}\s*日|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/i;
const yearMonth = /\b\d{4}-(?:0[1-9]|1[0-2])\b|\d{4}\s*年\s*\d{1,2}\s*月|\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{4}\b/i;

function assertQualificationMonths(document) {
  const dates = document.querySelectorAll('.qualifications-list li > span[data-i18n], .certificate-record time');
  assert.ok(dates.length > 0, "qualification dates must be present");
  for (const date of dates) {
    assert.doesNotMatch(date.textContent, fullDate, date.outerHTML);
    assert.match(date.textContent, yearMonth, date.outerHTML);
    assert.ok(date.hasAttribute('data-qualification-date') || date.hasAttribute('data-qualification-dates'), "every qualification date must use a shared date tag");
  }
  for (const time of document.querySelectorAll('.certificate-record time')) {
    assert.match(time.dateTime, /^\d{4}-(?:0[1-9]|1[0-2])$/, time.outerHTML);
    assert.equal(time.dateTime, qualificationMonth(time.dataset.qualificationDate));
  }
  for (const record of document.querySelectorAll('.qualification-panel, .certificate-record')) {
    assert.doesNotMatch(record.textContent, fullDate, "certificate text must omit the day");
    assert.doesNotMatch(record.textContent, /\{date:[^}]+\}/, "date placeholders must be resolved");
    for (const description of record.querySelectorAll('.certificate-details p')) {
      if (yearMonth.test(description.textContent)) assert.ok(description.hasAttribute('data-qualification-dates'), "certificate date descriptions must use a shared date tag");
    }
    for (const image of record.querySelectorAll('img')) {
      assert.doesNotMatch(image.alt, fullDate, "certificate image descriptions must omit the day");
      assert.doesNotMatch(image.alt, /\{date:[^}]+\}/);
      if (yearMonth.test(image.alt)) assert.ok(image.hasAttribute('data-qualification-dates'), "certificate image dates must use a shared date tag");
    }
  }
}

test("qualification dates show only year and month before JavaScript loads", async () => {
  for (const filename of ["myCV.html", "certificates.html"]) {
    const html = await readFile(new URL(`../src/html/${filename}`, import.meta.url), "utf8");
    const { window } = new JSDOM(html);
    try { assertQualificationMonths(window.document); }
    finally { window.close(); }
  }
});

test("qualification dates stay month-only across all three languages and the certificate viewer", async () => {
  for (const filename of ["myCV.html", "certificates.html"]) {
    const window = await openPage(filename);
    const document = window.document;
    try {
      for (const language of ["en", "zh", "ja", "en"]) {
        document.querySelector(`[data-language="${language}"]`).click();
        assertQualificationMonths(document);
        for (const record of document.querySelectorAll('.certificate-record')) {
          record.querySelector('.certificate-open').click();
          const dialog = document.querySelector('.certificate-dialog');
          assert.equal(dialog.open, true);
          assert.doesNotMatch(dialog.querySelector('.viewer-image').alt, fullDate);
          dialog.querySelector('.viewer-close').click();
        }
      }
    } finally { window.close(); }
  }
});

test("every certificate date comes from shared data in the CV, descriptions and gallery", async () => {
  const original = { ...qualificationMonths };
  for (const key of Object.keys(qualificationMonths)) qualificationMonths[key] = '2031-02';
  try {
    for (const filename of ["myCV.html", "certificates.html"]) {
      const window = await openPage(filename);
      try {
        for (const [language, expected] of [['en', 'February 2031'], ['zh', '2031年2月'], ['ja', '2031年2月']]) {
          window.document.querySelector(`[data-language="${language}"]`).click();
          const dates = window.document.querySelectorAll('[data-qualification-date], [data-qualification-dates]');
          assert.ok(dates.length > 0);
          for (const date of dates) {
            const text = date.tagName === 'IMG' ? date.alt : date.textContent;
            const months = text.match(new RegExp(yearMonth.source, 'gi'));
            assert.ok(months?.length > 0, `${filename} (${language}): ${text}`);
            assert.ok(months.every(month => month === expected), `${filename} (${language}): ${text}`);
          }
        }
      } finally { window.close(); }
    }
  } finally { Object.assign(qualificationMonths, original); }
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
