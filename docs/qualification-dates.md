# 证书日期的统一维护方式

所有证书日期只显示年和月。唯一的数据来源是 `src/ts/qualification-dates.ts` 中的 `qualificationMonths`，格式必须为 `YYYY-MM`。

- 调整日期：只修改对应证书事件的年月，不要在三语文案或 HTML 中分别填写日期。
- 证书页的日期标签：`<time data-qualification-date="awsClf.issued" datetime="2026-09">September 2026</time>`。
- 简历、说明和图片替代文本：在 `language.ts` 的三语文案中使用 `{date:awsClf.issued}`。对应 HTML 元素加上 `data-qualification-dates`，同时保留原有的 `data-i18n` 或 `data-i18n-alt`。
- 取得、颁发、考试年月分别保留其含义；同一事件在简历和证书页必须引用相同的编号。

`npm run check`、`npm test`、`npm run build` 和开发服务器都会同步带这些标签的 HTML 默认内容；语言切换时也使用同一份数据，并按中、英、日文格式显示年月。

新增证书时，先在数据表中增加事件，再接入以上标签。`npm test` 会检查未启用 JavaScript 时的内容、三语切换、证书查看器、日期标签，以及修改一处数据后简历和证书页是否同时更新。

日期显示规则适用于网页中的资格信息，不适用于工作经历、出生日期或证书原件图片上的文字。
