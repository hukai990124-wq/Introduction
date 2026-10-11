# Hu Kai — Personal Archive

A responsive personal website with a home page, CV, eight original certificate scans and a MyWorks directory. The directory label is MyWorks in English, 我的作品 in Chinese and 私の作品 in Japanese. MyWorks provides MyGithub, MyMods and MyQuizSite buttons linking to my GitHub profile, Nexus Mods profile and Quizbank website. MyQuizSite currently uses https://quizbank.hukai990124.workers.dev/; update its link and displayed address in myWorks.html when a custom domain is available. Its visual style uses military green, muted gold, self-hosted blackletter type and the original Imperial artwork.

## TypeScript structure

The browser loads native ES modules compiled from strict TypeScript. The runtime has no third-party JavaScript dependencies. TypeScript is pinned in package.json and pnpm-lock.yaml; Node.js 22 or newer is required for development.

| Path | Responsibility |
| --- | --- |
| src/main.ts | Shared page entry point |
| src/i18n/ | Typed English, Chinese and Japanese messages and language selection |
| src/features/motion.ts | Scroll reveals, reading progress and portrait tilt |
| src/features/certificates.ts | Category filters and accessible certificate dialog |
| src/features/stamp.ts | Imperial seal animation and original impact sound |
| src/audio/player.ts | Playback controls, preferences and audio lifecycle |
| src/audio/march.ts | Original synthesized marching soundscape |
| src/audio/organ.ts | Original twelve-bar organ score and synthesis |
| src/lib/ | Storage fallbacks and shared Web Audio helpers |
| styles/site.css | Responsive layout, design tokens and motion preferences |
| app/ | Compiled browser modules; committed for Cloudflare's static deployment |
| scripts/build.mjs | Compile TypeScript and prepare the complete static dist/ |
| scripts/preview.mjs | Local static preview server |
| assets/certificates/ | Eight full certificate scans |
| assets/experience/ | Original photos for university work and study tour experiences |

The four HTML files preserve complete content, original scan links and work profile links when JavaScript is unavailable. Previous root JavaScript/CSS files and their existing regression fixtures are retained as historical references; current pages load app/main.js and styles/site.css.

## Develop

~~~sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm build
pnpm preview
~~~

Open http://127.0.0.1:8765. After editing TypeScript, run pnpm build again or use pnpm watch while previewing. Native ES modules require an HTTP server. The compiler rejects type errors before emitting JavaScript. No runtime bundler or remote font/audio services are required.

## Languages and motion

English is the default. ?lang=en, ?lang=zh or ?lang=ja selects a language directly. Language controls update content, image descriptions, accessible labels and internal links. The preference is remembered when browser storage is available; navigation retains the language when storage is blocked.

Scroll reveals, portrait tilt, drifting embers and the audio visualizer honor prefers-reduced-motion. Keyboard users can skip navigation, operate category filters and close the certificate dialog with Escape. Arrow keys navigate scans; focus returns to the image or link that opened the dialog.

## Original synthesized audio

Both soundtracks start off. The certificate page offers Astra Militarum — Muster: a forty-second loop of alternating marching boots, military drums, original brass phrases and low engine rumble. The CV retains Imperial Hymn, the original twelve-bar pipe-organ instrumental. Audio is synthesized locally with Web Audio only after the visitor clicks Enable sound.

Each player has an explicit on/off button, mute and volume control. Mute and volume preferences are stored independently for each track. Playback pauses while the page is hidden and stops when leaving it. Unsupported audio leaves the website usable and displays a localized status.

The CV seal starts hidden. Stamp / 盖章 / 押印 reveals it with a brief animation and synthesized wooden impact. The player mute also silences the stamp. Reduced motion skips the animation; stamping never resumes a paused soundtrack.

## TOEIC Listening & Reading

The L&R image is rendered from the supplied original digital PDF at 2600 pixels high, replacing the earlier scan at the same asset URL. The result remains total 800, Listening 460 and Reading 340, tested March 1, 2025. Japanese labels on the home summary, CV and gallery use リスニング＆リーディング（L&R）.

## TOEIC Speaking & Writing

The certificate gallery and CV include the September 13, 2026 result: Speaking 120 / 200 and Writing 130 / 200. The full certificate page is rendered from the supplied PDF as assets/certificates/toeic-speaking-writing.jpg. Each component is presented separately.

## Experience and achievements

The certificates page is labeled Certificates & Achievements / 证书&成就 / 資格・実績. After the certificate gallery, a separate experience section presents university hotel banquet service and busboy work from April 2022 to August 2025, and a September 2023 Papua New Guinea Study Tour with a group visit to JICA for learning and exchange. Both entries use the user's original photographs with their full proportions preserved. These experience entries are separate from the eight-certificate gallery and its filters and viewer.

The English JICA name follows its [official organization profile](https://www.jica.go.jp/english/about/basic/jica/). Dates and participation descriptions are supplied by the user; no employer or additional duties are inferred.

## Certificate labels

The English FP3 label is FinancialPlanner Level3. Institution names are localized independently from the original certificate image: the English names follow [KINZAI's publication site](https://kinzai-online.jp/about-kinzai) and the [JAFP organization profile](https://www.jafp.or.jp/eng/about_JAFP/gene/); Chinese names are translated for readability, and Japanese retains the source institution names.

## Deployment

Always run pnpm build before publishing and commit both TypeScript source and generated app/ modules.

- Cloudflare: GitHub main is connected to Workers Builds. wrangler.jsonc identifies the existing hukaicv Worker. .assetsignore limits uploaded files to root HTML, styles/, app/ and assets/, excluding installed dependencies and development sources. The dashboard deploy command remains npx wrangler deploy; compiled app/ modules are committed before publishing.
- OpenAI Sites: its managed source repository contains the same source and compiled site. .openai/hosting.json serves dist/; publish that directory as a new version of the existing public project.

The self-hosted UnifrakturCook font includes its SIL Open Font License in assets/fonts/OFL.txt. Certificate dates and scores are transcribed from the original documents. Existing regression fixtures target the previous scripts; they do not establish coverage for the TypeScript implementation.

© 2026 Hu Kai
