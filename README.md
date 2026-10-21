# Hu Kai 个人网站

这是可以直接用 VS Code 继续维护的完整项目。只编辑 `src/` 中的一套源码：五个 HTML 页面、一份 CSS、一份 JavaScript，以及分类存放的原始素材。没有第三方运行依赖，也不需要安装 npm 包。

## 目录

```text
Hu-Kai-Website/
├─ src/                         唯一需要编辑的网页源码
│  ├─ html/                     页面内容
│  │  ├─ index.html             首页
│  │  ├─ myCV.html              简历
│  │  ├─ certificates.html      证书与经历
│  │  ├─ myWorks.html           项目链接（包含 QuizSite）
│  │  └─ artworks.html          艺术作品
│  ├─ css/site.css              全站样式、布局、纹章闪光效果
│  ├─ js/site.js                全站逻辑及中英日文案
│  └─ assets/
│     ├─ images/
│     │  ├─ site/               肖像、背景、纹章、印章
│     │  ├─ artworks/           艺术作品截图
│     │  ├─ certificates/       证书图片
│     │  └─ experience/         经历照片
│     ├─ documents/             简历 PDF
│     │  └─ certificates/       证书 PDF
│     └─ fonts/                 本地哥特字体及其许可证
├─ scripts/site.mjs             开发、检查与构建工具（一个文件）
├─ Hu-Kai-Website.code-workspace VS Code 工作区与任务配置
├─ package.json                 常用命令
├─ wrangler.jsonc               Cloudflare 发布配置
├─ .openai/hosting.json         当前 Sites 站点标识与发布配置
└─ dist/                        构建后自动生成，编辑器默认隐藏
```

## 用 VS Code 打开

1. 安装 Node.js 18 或更高版本，并确认终端能运行 `node --version`。
2. 在 VS Code 中打开 `Hu-Kai-Website.code-workspace`，或直接打开这个完整文件夹。
3. 在项目根目录的终端运行 `npm run dev`，浏览器打开 `http://127.0.0.1:8765`。
4. 修改源码后刷新浏览器即可。按 `Ctrl+C` 停止预览服务。

也可以按 F5 启动 Edge 预览；按 `Ctrl+Shift+B` 生成发布文件。所有 VS Code 任务都保存在同一个工作区文件里。

```sh
npm run dev       # 直接预览 src，无需构建或安装依赖
npm run check     # 检查 JavaScript 语法、页面链接、图片、字体和 PDF 路径
npm run build     # 检查后重新生成完整 dist
npm run preview   # 预览已生成的 dist
```

请通过本地预览服务打开网页；双击源 HTML 文件使用 file:// 打开不适用于本站的模块脚本与页面资源路径。

## 日常修改的位置

- **页面内容**：修改 `src/html/` 对应页面。五个页面各自完整，页面名称与线上地址保持对应。
- **样式与纹章**：修改 `src/css/site.css`。这里集中管理颜色、响应式布局、哥特字体、纹章的光晕与扫光。
- **行为与翻译**：修改 `src/js/site.js`。文件用可折叠的区域分为文案、语言切换、动效、证书查看器、音频、印章和初始化；可在 VS Code 中搜索区域名称或函数名定位。
- **新增素材**：放入 `src/assets/` 对应分类，再修改 HTML/CSS 的路径。页面中的资源路径使用 `assets/...`，CSS 中使用 `../assets/...`。
- **QuizSite**：链接在 `src/html/myWorks.html`，三种语言的介绍位于 `src/js/site.js` 的多语言文案区域；当前地址是 `https://quizsite.p8.ink/`。

`dist/` 是发布产物，每次构建都会重建，不需要手动编辑，也不提交到 Git。旧的 TypeScript、编译目录和重复源码已经整合；开发不再需要 TypeScript 编译器或包管理器锁文件。

## 功能与发布

中英日切换、证书筛选与大图查看、页面动效、纹章与格言、印章互动和原有的本地合成音频都集中在当前源码中。音频由访问者主动开启；动效遵循系统的减少动态效果设置。

运行 `npm run build` 后，将 `dist/` 的内容上传到静态网站托管即可。页面依然使用 `index.html`、`myCV.html`、`certificates.html`、`myWorks.html` 和 `artworks.html` 的地址。Cloudflare 配置与 Sites 配置均指向 `dist/`。

当前个人网站：<https://hu-kai-hkcv.tastybloom33.chatgpt.site/>。

如以后连接 Cloudflare Workers Builds，请在其控制台把 Build command 设为 `npm run build`；本地 Wrangler 发布已经配置相同的构建命令。相关说明见 [Cloudflare 官方构建文档](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/)。
