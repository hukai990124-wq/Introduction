# Hu Kai — Personal Archive

Sociology · Cloud Computing · AI · Creative Arts

[访问网站 · Visit the website · サイトを見る](https://hu-kai-hkcv.tastybloom33.chatgpt.site/)

点击语言标题展开或收起。 / Click a language to expand or collapse. / 言語名をクリックして開閉してください。

<details>
<summary><strong>简体中文</strong></summary>

## 关于本站

欢迎来到 Hu Kai 的个人网站与作品档案。我毕业于东洋大学社会学专业，现居东京，正在探索编程、云计算、AI 与数字创作。

这里汇集了我的教育与工作经历、资格证书、个人项目和 Blender 创作。希望通过这些具体的经历与作品，让你了解我的背景、兴趣和正在尝试的方向。

## 网站导览

| 页面 | 内容 |
| --- | --- |
| [首页](https://hu-kai-hkcv.tastybloom33.chatgpt.site/index.html?lang=zh) | 个人介绍、学习背景与探索方向 |
| [个人简历](https://hu-kai-hkcv.tastybloom33.chatgpt.site/myCV.html?lang=zh) | 教育背景、技能、资格与 PDF 简历 |
| [证书与经历](https://hu-kai-hkcv.tastybloom33.chatgpt.site/certificates.html?lang=zh) | 学历、AWS 与 AI 相关认证、语言成绩及经历记录 |
| [项目与作品](https://hu-kai-hkcv.tastybloom33.chatgpt.site/myWorks.html?lang=zh) | GitHub 项目、Nexus Mods 创作与 QuizSite 练习网站 |
| [艺术作品展](https://hu-kai-hkcv.tastybloom33.chatgpt.site/artworks.html?lang=zh) | Blender 制作的盔甲、服饰等模型在游戏中的展示 |

## 浏览体验

- **三语阅读**：网站支持中文、英文和日文，可通过页眉的语言按钮切换。
- **个人档案风格**：深绿色与金色、哥特字体、个人纹章和印章互动构成整体视觉。
- **证书与作品展示**：支持证书筛选、大图浏览，以及艺术作品原图查看。
- **适配不同设备**：响应式布局支持桌面与手机；动效遵循系统的减少动态效果设置，声音由访客主动开启。

## 更多作品

- [GitHub](https://github.com/hukai990124-wq)：源代码与个人项目。
- [Nexus Mods](https://www.nexusmods.com/profile/Hukai19990124)：游戏模组与创作。
- [QuizSite](https://quizsite.p8.ink/)：答题练习与复习网站。

## 本地运行

本仓库的网站源码使用 HTML、CSS 和 TypeScript 构建。需要 Node.js 18 或更高版本；首次运行时安装 TypeScript 和测试工具等开发依赖。

```sh
git clone https://github.com/hukai990124-wq/Introduction.git
cd Introduction
npm install
npm run dev
```

源码位于 `src/html/`（页面）、`src/css/`（样式）、`src/ts/site.ts`（网站交互）、`src/ts/language.ts`（三语文案与语言切换）和 `src/assets/`（图片、字体与文档）。开发与构建工具的主要逻辑位于 `scripts/site.ts`；`scripts/site.mjs` 是兼容 Node.js 18 的编译启动入口。TypeScript 会生成 `src/js/` 中的浏览器脚本，请编辑 `.ts` 源码而非生成的文件。开发服务器会在网站 TypeScript 源码更新后重新编译。

## 反馈

欢迎通过 [GitHub Issues](https://github.com/hukai990124-wq/Introduction/issues) 提交网站问题、翻译建议或浏览体验反馈。

</details>

<details>
<summary><strong>English</strong></summary>

## About

Welcome to Hu Kai's personal website and creative archive. I am a sociology graduate of Toyo University, based in Tokyo and exploring programming, cloud computing, AI, and digital art.

This website brings together my education and work experience, qualifications, personal projects, and Blender creations. These experiences and works offer a closer look at my background, interests, and the directions I am exploring.

## Explore the website

| Page | What you will find |
| --- | --- |
| [Home](https://hu-kai-hkcv.tastybloom33.chatgpt.site/index.html?lang=en) | A personal introduction, learning background, and areas of interest |
| [Curriculum Vitae](https://hu-kai-hkcv.tastybloom33.chatgpt.site/myCV.html?lang=en) | Education, skills, qualifications, and a PDF résumé |
| [Certificates & Achievements](https://hu-kai-hkcv.tastybloom33.chatgpt.site/certificates.html?lang=en) | Academic qualifications, AWS and AI certifications, language test results, and experience records |
| [MyWorks](https://hu-kai-hkcv.tastybloom33.chatgpt.site/myWorks.html?lang=en) | GitHub projects, Nexus Mods creations, and the QuizSite practice website |
| [ArtWorks Exhibit](https://hu-kai-hkcv.tastybloom33.chatgpt.site/artworks.html?lang=en) | In-game showcases of armour, clothing, and other models created in Blender |

## Browsing experience

- **Three languages**: Read in Chinese, English, or Japanese using the language buttons in the site header.
- **A personal archive aesthetic**: Deep green and gold, Gothic typography, a personal coat of arms, and an interactive stamp shape the visual identity.
- **Certificates and artwork**: Filter certificates, browse full-size scans, and view original artwork images.
- **Across devices**: Responsive layouts support desktop and mobile browsing. Animations respect the system's reduced-motion setting, and sound starts only when enabled by the visitor.

## More projects

- [GitHub](https://github.com/hukai990124-wq): Source code and personal projects.
- [Nexus Mods](https://www.nexusmods.com/profile/Hukai19990124): Game mods and creations.
- [QuizSite](https://quizsite.p8.ink/): A website for question practice and review.

## Run locally

This repository contains the website source, built with HTML, CSS, and TypeScript. Node.js 18 or later is required; install the development dependencies, including TypeScript and the test tools, before running it.

```sh
git clone https://github.com/hukai990124-wq/Introduction.git
cd Introduction
npm install
npm run dev
```

Source files are in `src/html/` (pages), `src/css/` (styles), `src/ts/site.ts` (site interactions), `src/ts/language.ts` (translations and language switching), and `src/assets/` (images, fonts, and documents). The development and build tool logic lives in `scripts/site.ts`; `scripts/site.mjs` is the compilation entry point for Node.js 18. TypeScript generates browser scripts in `src/js/`: edit the `.ts` sources rather than the generated files. The development server recompiles when the website TypeScript sources change.

## Feedback

Website issues, translation suggestions, and feedback on the browsing experience are welcome through [GitHub Issues](https://github.com/hukai990124-wq/Introduction/issues).

</details>

<details>
<summary><strong>日本語</strong></summary>

## このサイトについて

Hu Kai の個人サイト・作品アーカイブへようこそ。東洋大学で社会学を学び、現在は東京を拠点に、プログラミング、クラウド、AI、デジタル制作に取り組んでいます。

このサイトでは、学歴・職歴、資格、個人プロジェクト、Blender で制作した作品を紹介しています。これまでの経験や作品を通じて、私の背景や関心、現在取り組んでいることを知っていただければ幸いです。

## サイトガイド

| ページ | 内容 |
| --- | --- |
| [ホーム](https://hu-kai-hkcv.tastybloom33.chatgpt.site/index.html?lang=ja) | 自己紹介、学習の背景、関心のある分野 |
| [履歴書](https://hu-kai-hkcv.tastybloom33.chatgpt.site/myCV.html?lang=ja) | 学歴、スキル、資格、PDF 版の履歴書 |
| [資格・実績](https://hu-kai-hkcv.tastybloom33.chatgpt.site/certificates.html?lang=ja) | 学位、AWS・AI 関連資格、語学試験の成績、経験の記録 |
| [プロジェクト・制作物](https://hu-kai-hkcv.tastybloom33.chatgpt.site/myWorks.html?lang=ja) | GitHub のプロジェクト、Nexus Mods の制作物、QuizSite 学習サイト |
| [アート作品展示](https://hu-kai-hkcv.tastybloom33.chatgpt.site/artworks.html?lang=ja) | Blender で制作した鎧や衣装などのモデルをゲーム内で展示 |

## サイトの特徴

- **3 言語に対応**：ヘッダーの言語ボタンから、中国語・英語・日本語を切り替えられます。
- **個人アーカイブの世界観**：深緑と金色、ゴシック書体、個人の紋章、スタンプの仕掛けを取り入れています。
- **資格と作品の閲覧**：資格の絞り込み、証明書画像の拡大表示、作品の元画像の閲覧に対応しています。
- **さまざまな端末で閲覧**：PC・スマートフォンに合わせたレイアウトを採用しています。アニメーションはシステムの「視差効果を減らす」設定に従い、音声は閲覧者が有効にした場合に再生されます。

## その他のプロジェクト

- [GitHub](https://github.com/hukai990124-wq)：ソースコードと個人プロジェクト。
- [Nexus Mods](https://www.nexusmods.com/profile/Hukai19990124)：ゲーム MOD と制作物。
- [QuizSite](https://quizsite.p8.ink/)：問題演習と復習のための学習サイト。

## ローカルで実行する

このリポジトリには、HTML・CSS・TypeScript で構築したサイトのソースコード一式を収録しています。Node.js 18 以降が必要です。初回実行前に TypeScript やテストツールなどの開発用依存パッケージをインストールしてください。

```sh
git clone https://github.com/hukai990124-wq/Introduction.git
cd Introduction
npm install
npm run dev
```

ソースコードは `src/html/`（ページ）、`src/css/`（スタイル）、`src/ts/site.ts`（サイトの動作）、`src/ts/language.ts`（翻訳と言語切り替え）、`src/assets/`（画像・フォント・文書）に配置しています。開発・ビルド用ツールの主要な処理は `scripts/site.ts` にあり、`scripts/site.mjs` は Node.js 18 用のコンパイル起動ファイルです。TypeScript から `src/js/` にブラウザー用スクリプトが生成されます。生成されたファイルではなく `.ts` のソースを編集してください。開発サーバーはサイトの TypeScript ソースの変更後に再コンパイルします。

## フィードバック

サイトの不具合、翻訳の改善案、閲覧時の気づきなどは、[GitHub Issues](https://github.com/hukai990124-wq/Introduction/issues) からお寄せください。

</details>
