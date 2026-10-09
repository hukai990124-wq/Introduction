# Introduction

My personal website — a short introduction about me, plus my CV.

Both pages support English, Chinese and Japanese. Use the language buttons at the
top of either page; the selection is remembered across reloads and navigation.
English is the default. A `?lang=en`, `?lang=zh` or `?lang=ja` URL selects a
language directly, and internal links retain it even if browser storage is blocked.

The home page links to my [Nexus Mods profile](https://www.nexusmods.com/profile/Hukai19990124)
and [GitHub profile](https://github.com/hukai990124-wq) beside the CV button.

The CV page includes an original twelve-bar pipe-organ instrumental, **Imperial
Hymn**, composed for this website and synthesized with Web Audio. It loops at a
quiet background volume. The bottom-right player provides play/pause and mute;
the mute setting is remembered. If a browser blocks autoplay, click Play. Music
stops when leaving the CV. No external recordings or audio services are used.

## Pages

| Page | What it is |
| --- | --- |
| `index.html` | Home page — who I am, my goals and direction |
| `myCV.html` | Curriculum Vitae |

## Files

| Path | Description |
| --- | --- |
| `index.html` | Home page |
| `myCV.html` | CV page |
| `home.css` | Styles for the home page |
| `CVstyle.css` | Styles for the CV page |
| `language.js` | Translations and shared language switching |
| `language.css` | Language selector and keyboard focus styles |
| `organ-hymn.js` | Original organ score, pipe synthesis and cathedral-style reverb |
| `cv-music.js` | CV music playback, mute preference and localized controls |
| `assets/me.png` | Profile photo |
| `assets/imperium-stamp-100.png` | Stamp |
| `assets/background-comissioner.png` | Page background |

## Preview locally

Just open `index.html` in a browser, or serve this folder with a local HTTP server.
There is no build step — it is plain HTML, CSS and JavaScript.

## Playback regression tests

With Node.js installed, run `node --test tests/cv-music.test.cjs`. These tests
cover blocked autoplay, pause/resume, mute persistence, language changes,
back-cache navigation, blocked storage and unavailable audio. Also verify the
actual synthesized sound and responsive player in a browser.

---

&copy; 2026 Hu Kai
