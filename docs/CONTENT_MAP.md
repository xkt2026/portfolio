# 内容地图 — huyml.co 首页

> 用途：**填充 / 更换内容时的对照表**。页面上每一块可见内容，都能在下表找到它所在的组件与数据键。
>
> 所有内容都是 `https://huyml.co/` 的原站抓取文案，没有占位文本。唯一需要改的地方是 `data.ts`。

---

## 1. 内容入口

全部内容集中在 `src/components/sites/huyml-co-eb36a18b/root-8a5edab2/data.ts`：

| 导出 | 位置 | 作用 |
| --- | --- | --- |
| `SITE` | `data.ts:87` | 全站文案：顶栏、印章、信息带、浮层、卡片标题、社媒与署名 |
| `NAV` | `data.ts:232` | 浮层里的 4 条导航 |
| `WHEEL` | `data.ts:251` | 右侧项目轮的 8 张卡 |
| `ARCHIVE` | `data.ts:334` | 底部归档的 19 个项目；同时是 19 个下一级页面的数据源 |
| `assetUrl()` | `data.ts:862` | 文件名 → `/sites/huyml-co-eb36a18b/shared/<file>` |
| `STAMP_FACES` | `data.ts:865` | 印章立方体的 4 个 logo 面 |

写内容是纯数据编辑：**只改字面量，不要改键名**（键名被组件引用）。

> 详情页（`/project/<slug>`）另有两处内容源，不在本表的首页分区里：
>
> | 来源 | 作用 |
> | --- | --- |
> | `ARCHIVE[i].about` | 案例导语整段（`/project/<slug>` 左上 About 用）；19 个条目已全部回填 |
> | `galleries.ts` → `PROJECT_GALLERIES` | 每个 slug 的通栏图文件名列表，由 `scripts/fetch-project-galleries.mjs` 生成，**不要手改** |

---

## 2. 分区对照表

画布由 `HomeView.tsx` 装配，共 10 个渲染单元 + 3 个状态层。

### 区域 1 — 顶栏（固定右上）
`SiteNav.tsx` · `.framer-n2xgl8-container`

> 原站顶栏在 `Menu` 与邮箱之间还塞了两簇：`Audio On·Off` 音效开关、`Working globally` / `HCMC, 15:26` 时钟。**两簇已按需求删除**，组件、`data.ts` 键、只服务于它的 `SpeakerIcon` 一并清掉，顶栏现在只剩两端。

| 屏上位置 | 数据键 | 当前值 |
| --- | --- | --- |
| 最左按钮 | `SITE.menuLabel` | Menu |
| 邮箱行小标题 | `SITE.inquiriesLabel` | For inquiries |
| 邮箱行内容 | `SITE.email` | xkt202311@163.com |
| 复制后小标题（临时） | `SITE.copiedLabel` | Copied |

### 区域 2 — 左上印章
`SiteStamp.tsx`

| 屏上位置 | 数据键 |
| --- | --- |
| 立方体 4 个面 | `STAMP_FACES[0..3]` → `shared/stamp-face-1..4.svg`（顺序 = 旋转顺序） |
| 右下链接 | `SITE.showreelLabel`（ALL → 站内首页 `/`） |

**替换方式**（按改动量从少到多）：

1. **只换 logo，不动结构**（推荐）—— 从 Figma 导出 4 张 SVG，命名 `stamp-face-1.svg` … `stamp-face-4.svg`，直接覆盖 `public/sites/huyml-co-eb36a18b/shared/` 下的同名文件，**零代码改动**。
2. **换名或换数量的 logo** —— 新文件放进同一目录，改 `data.ts` 的 `STAMP_FACES`：数组 4 项 = 4 个面，顺序即旋转顺序。

**Figma → SVG 导出规范**（`SiteStamp.tsx` 把每个面渲染在 56×123 的框里，`object-contain` 等比缩放）：

| 项 | 要求 |
| --- | --- |
| 画板尺寸 | 四个面用**同一个**画板尺寸，56×123 或它的整数倍（112×246）。原站四张不统一（46×106 / 50×107），转面时会有约 2.6% 的大小跳动 |
| 不透明底板 | 每个面自带 `#ECECEC` 底色矩形（原站 4 张都带 `fill="#ECECEC"`）。缺底板立方体会透光，能看见背面的字 |
| 出血 | 有描边或装饰溢出画板的面（原站 face-3/4 就是 50×107 的 2px 出血版），要么统一把画板放大 2px 并居中，要么干脆不溢出 |
| 文字 | logo 如果是文字，导出时勾 **Outline text**，否则换台机器缺字体就回退 |
| 交付形式 | 4 个独立 `.svg` 文件。**不要**内联成 React 组件 —— Figma 导出会带 `<mask id="a">`、`clip-path` 这类短 id，4 份塞进同一 DOM 会互相抢 id；保持 `<img src>` 让每个文件自成文档最稳 |
3. **换成别的模块**（单张平面 logo / 文字标 / 不要 3D 旋转）—— 直接改 `SiteStamp.tsx`：`FACE_W` / `FACE_H` / `DEPTH` 是立方体尺寸，`.hu-stamp-stage` + `.hu-stamp-cube` + `@keyframes hu-stamp-spin`（`globals.css`）提供 3D 旋转，不需要就一并删掉。

两个注意点：顶栏骨架 `h-[219px] grid-cols-2 grid-rows-[repeat(3,minmax(0,1fr))] gap-x-5 gap-y-2.5 p-5` 里，logo 在第 1 行第 1 列、链接在第 3 行第 1 列，改动时保留这两处定位；`CreditsCard.tsx` 复用了 `STAMP_FACES.slice(0, 2)` 作 Rive 动图替身，换 logo 会同时影响 Credits 卡片。

### 区域 3 — 中央信息带（随轮播联动）
`HeroBand.tsx` · `.framer-thcsc6`，画布垂直居中，194px 高

`HeroBand` 接收 `HomeView` 传入的 `active`，右侧整块信息跟着轮播位置切换：

| 屏上位置 | 数据键 |
| --- | --- |
| 左侧两行字 | `SITE.owner` + `SITE.ownerAlias`（QTING / QTING） |
| Role 行标签 | `SITE.roleLabel` |
| Role 行值 | `WHEEL[active].roles`（换行分隔） |
| Launch 行标签 / 值 | `SITE.launchLabel` / `WHEEL[active].launch` |

- 左侧两行是**同一个字符串渲染两遍**（上灰下实），这是原站的重影效果，不是重复内容。
- 原站的 `Launch 2023` / `Recognition FWA…` 是静态快照；这里改成按 `active` 重读 `WHEEL`，容器 `key={active}` 触发 `.hu-info-swap`（`globals.css`）做 520ms 淡入，保证信息带和左下角大号计数说的是同一个项目。
- 原站的第三行 `Recognition` **已整体删除**（首页信息带、详情页、`data.ts` 里的 `WHEEL[i].recognition` / `ARCHIVE[i].recognition` / `SITE.recognitionLabel` / `SITE.heroRecognition` 全部移除），现在信息带只剩 Role / Launch 两行。
- 因此 `SITE.year` 不再被渲染，保留在 `data.ts` 作原站快照参考。
- 节奏沿用原站 `.framer-14jind7` 的 `gap: 48px`；每行标签 64px 宽、走 `hu-text-quiet`（灰），值用 `\n` 换行。

### 区域 4 — 右侧项目轮
`ProjectWheel.tsx` · 卡片宽 337px，间距 250px

| 屏上位置 | 数据键 |
| --- | --- |
| 分类小字 | `WHEEL[i].tag` |
| 标题（选中 24px / 未选中 16px） | `WHEEL[i].title` |
| 描述（选中 337px / 未选中 250px） | `WHEEL[i].description` |
| 画布右缘三色块 | `WHEEL[active].colors` |

8 张卡顺序即数组顺序：

| # | title | tag |
| --- | --- | --- |
| 1 | Mathijs Hanenkamp | Photography - portfolio |
| 2 | Silent Waves | Brand - editorial |
| 3 | North Arc | Studio - website |
| 4 | Noir Capsule | Fashion - campaign |
| 5 | Vector Grid | Product - launch |
| 6 | Memory Atlas | Archive - collection |
| 7 | House of Noise | Agency - case study |
| 8 | Future Echo | Creative - direction |

> 标题、分类、描述均已逐条比对原站 DOM，确认是真实内容。**但色板有问题，见第 4 节。**

### 区域 5 — 底部计数带
`WorkCounter.tsx` · `.framer-1e0z5mv`

| 屏上位置 | 数据键 |
| --- | --- |
| 左下按钮 | `SITE.contactTitle`（Come say hi） |
| 左下按钮（灰） | `SITE.creditsTitle`（Credits） |
| 计数行左 | `SITE.selectedLabel`（Selected work） |
| 计数行右 | `SITE.counterTotal`（`/00`） |
| 大号数字 | **计算值**：`index + 1` 补零，随轮播位置变化 |

`/00` 是原站写死的静态文案，不是占位符；真正变化的是下面的大号数字。

### 区域 6 — 归档走马灯（滚过轮播尽头才出现）
`ArchiveRail.tsx` · `.framer-1ikkddz`

19 条 × 7 个字段，全部来自 `ARCHIVE[i]`：

| 屏上位置 | 数据键 |
| --- | --- |
| 缩略图 36×28 | `ARCHIVE[i].image` |
| 标题 | `ARCHIVE[i].title` |
| slug（小写） | `ARCHIVE[i].slug` |
| 日期 | `ARCHIVE[i].date`（`dateLabel` 供详情页用） |
| 三色块 | `ARCHIVE[i].colors` |
| 分类 | `ARCHIVE[i].category` |
| 描述（截断 320px） | `ARCHIVE[i].description` |
| 链接目标 | `/project/${slug}` |

整条轨道渲染两遍（`[...ARCHIVE, ...ARCHIVE]`）以实现无缝循环 —— 改一条数据会同时影响两处，这是预期行为。

### 区域 7 — 滚动提示
`ScrollHint.tsx` · `SITE.scrollLabel`（Scroll）

### 区域 8 — 菜单浮层
`MenuOverlay.tsx`

| 屏上位置 | 数据键 |
| --- | --- |
| 两行简介 | `SITE.ownerLines[0..1]` |
| 关闭按钮 | `SITE.closeLabel` |
| 4 条导航 | `NAV[i].label` / `NAV[i].href` |
| showreel 链接 | `SITE.showreelLabel` |

`NAV` 当前指向页内锚点：`#work` `#about` `#playground` `#contact`。

### 区域 9 — 联络卡（Come say hi）
`ContactCard.tsx` · 标题 `SITE.contactTitle`

正文来自 `SITE.contactGroups`，当前 2 组 / 2 个链接：

| 组 | caption | 链接 |
| --- | --- | --- |
| 1 | Drop me a line | xkt202311@163.com |
| 2 | Hear me yapping about design | YouTube → https://youtu.be/OtqKieUon78?feature=shared |

> 分组按每行 2 组自动折行（`ContactCard.tsx:15-20` 的 `PER_ROW`），每组 `flex-1`；奇数时末行单组占满整行。**增删分组只改 `data.ts` 即可，版面自适应。**

### 区域 10 — Credits
`CreditsCard.tsx` · 标题 `SITE.creditsTitle`

| role | people |
| --- | --- |
| Development & Rive | Chien Pham |
| Illustration | Yup Nguyen |
| Fonts | BT Glyphius / BT Grotesk |
| Copywriting | Ha Nguyen (the wife) |

### 区域 11 — 复制邮箱按钮
`InquiryButton.tsx` · `SITE.email` / `inquiriesLabel` / `copyLabel` / `copiedLabel`

### 区域 12 — 关闭按钮
`CloseButton.tsx` · `SITE.closeLabel`

### 区域 13 — 页面元信息（浏览器标签 / 分享卡）

| 位置 | 来源 |
| --- | --- |
| 首页标题 | `page.tsx` → `SITE.owner` |
| 首页描述 | `page.tsx` → `SITE.owner` + `ownerAlias` + `role` |
| 全站标题模板 | `layout.tsx` → `%s — ${SITE.owner}` |
| 详情页标题 | `project/[slug]/page.tsx` → `ARCHIVE[i].title` |

---

## 3. 资源清单

`public/sites/huyml-co-eb36a18b/shared/` 共 38 个文件：

| 类型 | 数量 | 对应内容 |
| --- | --- | --- |
| `.jpg` | 18 | 项目缩略图 |
| `.png` | 1 | 项目缩略图 |
| `.svg` | 4 | `STAMP_FACES` → `stamp-face-1..4.svg`（原抓取文件哈希名见 `docs/research/…/assets-manifest.json`） |
| `.woff2` | 15 | 自托管字体（BT Glyphius / BT Grotesk） |

19 张缩略图 ↔ 19 个归档项目，一一对应，无缺失。

替换图片时**保持文件名不变**即可，无需改代码；若必须换名，改 `ARCHIVE[i].image` / `STAMP_FACES[i]`。

---

## 4. 已知问题 —— 填充前建议先处理

| # | 项 | 现状 | 建议 |
| --- | --- | --- | --- |
| **1** | **`WHEEL[i].colors`（i ≥ 1）配对不可靠** | `gen-data.mjs:9-11` 的注释明确写着：只有第 1 组（Mathijs Hanenkamp）是 DOM 实测值，其余是 *complementary palettes*（推测补全）。实测这些色值确实存在于原站 DOM，但归属是别的项目 —— `rgb(206,255,69)` 属 RLY NETWORK、`rgb(227,232,236)` 属 DAFI TROPICDANE、`rgb(251,193,212)` + `rgb(195,171,255)` 属 SERIOUS BUSINESS | **色值是真的，配对是错的**。这 7 组需要替换成真实配色，或直接自定义 |
| 2 | ~~Audio 开关 / `Working globally` 时钟~~ | **已删除**：`SITE.audioLabel` / `audioOnLabel` / `audioOffLabel` / `timezoneLabel` / `cities` / `localTime` 与 `SpeakerIcon` 都不再存在 | 要找回，原文案在 `docs/research/huyml-co-eb36a18b/root-8a5edab2/typography.txt` 的 `TEXT "Audio"` 与 `TEXT "Working globally"` 两处 |
| 3 | `src/components/ui/`（`ProjectCard.tsx` / `ScrollReveal.tsx` / `button.tsx`） | 模板脚手架，全站未引用 | 可删，避免被误当成页面内容 |
| 4 | `public/sites/huyml-co-eb36a18b/root-8a5edab2/` | 空目录，无引用 | 可删 |

第 1 项已修复（把归档条目补回 `<a href="/project/<slug>">`，恢复原站丢失的链接层）。

---

## 5. 改动注意事项

- 只改 `data.ts` 的字面量，**不要改键名**。
- `WHEEL` / `ARCHIVE` / `NAV` / `STAMP_FACES` 都是 `as const`：增删数组项**不需要**改组件（轮播和归档都按数组长度渲染），但 `ContactCard` 的三栏分布是写死的 `slice`，见区域 9。
- **不要重跑 `scripts/gen-data.mjs`** —— 它会覆盖 `data.ts`，把你填的内容全部冲掉。
