# 内容填充清单 · huyml 克隆站

代码里所有文字/图片都收敛在 **一个文件**：

```
src/components/sites/huyml-co-eb36a18b/root-8a5edab2/data.ts
```

你只管按分区回填内容，改代码的事我来做。

> 当前滚动行为：轮播 `01→08→01` **无限循环**（8 张卡片的偏移是对称环绕，所以 08→01 只是普通的一步滑动，不会回卷）。档案轨改成点左下角 `Selected work` 打开，滚轮向上 / ↑ / Esc 返回。

---

## 一、发内容给我的格式

三条硬规则：

1. **一行一个字段**，写成 `键 = 值`（键名照抄本文档里的英文键）。
2. **一个字段要多项/多行**时，用 ` | ` 分隔（竖线前后各留一个空格）。
3. **图片位置写占位符** `[IMG-编号]`，不要写文字；等文案定稿后按编号把文件给我。

补充约定：

- 没写到的字段 = 保持现状，**不需要全部填**。
- 颜色写 `#111111` 或 `rgb(17,17,17)` 都行；每个项目 3 个颜色。
- 要增删条目（轮播卡片、档案行、联系组），直接在对应分区里增删，我按你给的数量改代码。
- 长文案整段粘贴即可，不用管换行排版。
- 链接写成 `显示文字 | https://...`。
- 也可以把填好的 `.md` / `.txt` / `.docx` 发我，格式同上。

---

## 二、分区总览

| 编号 | 分区 | 组件文件 | 屏上位置 | 含图片 |
| --- | --- | --- | --- | --- |
| 1 | 左上印章 | `SiteStamp.tsx` | 画布左上固定 | 是 ×4 |
| 2 | 顶栏 | `SiteNav.tsx` | 视口最顶端一行 | 否 |
| 3 | 中央信息带 | `HeroBand.tsx` | 画布垂直居中，左半 | 否 |
| 4 | 项目轮播 | `ProjectWheel.tsx` | 画面中部 | 否，只有色块 |
| 5 | 左下计数区 | `WorkCounter.tsx` | 画布左下角 | 否 |
| 6 | 档案轨 | `ArchiveRail.tsx` | 点左下 `Selected work` 后居中滚动 | 是 ×19 |
| 7 | 菜单全屏层 | `MenuOverlay.tsx` | 点 `Menu` 后覆盖全屏 | 否 |
| 8 | 联系卡 | `ContactCard.tsx` | 点 `Come say hi` 后弹出 | 否 |
| 9 | Credits 卡 | `CreditsCard.tsx` | 点 `Credits` 后弹出 | 复用 1 的图 |
| 10 | 右下 Scroll 提示 | `ScrollHint.tsx` | 视口右下角 | 否 |
| 11 | 项目详情页 | `src/app/project/[slug]/page.tsx` | `/project/xxx` | 复用 6 的图 |
| 12 | 网页标题/描述 | `src/app/layout.tsx` | 浏览器标签、搜索结果 | 否 |

---

## 分区 1 · 左上印章

- 组件：`SiteStamp.tsx`
- 结构：旋转立方体（4 个面 = 4 张 SVG）+ 下方 `ALL` 链接（指向站内首页，`SiteStamp.tsx`）
- 当前图：`public/sites/huyml-co-eb36a18b/shared/` 下 4 个 svg，每个按 **56×123** 渲染

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `showreelLabel` | `ALL` | 印章下方那行文字 |
| `showreelHref`（写死在 `SiteStamp.tsx` / `ShowreelLink.tsx`） | `/`（站内首页） | 已改为内部 `Link`，不再新开标签页 |
| `[IMG-S1] … [IMG-S4]` | 4 个原站 svg | 4 个面，顺序＝旋转顺序 |

---

## 分区 2 · 顶栏

- 组件：`SiteNav.tsx`
- 从右到左：`Menu` / 邮箱两行 —— 原站中间的 `Audio On·Off` 与 `Working globally` / `HCMC, 15:26` 两簇**已删除**（`data.ts` 里 `audioLabel` / `audioOnLabel` / `audioOffLabel` / `timezoneLabel` / `cities` / `localTime` 同步移除）

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `menuLabel` | `Menu` | 菜单按钮 |
| `inquiriesLabel` | `For inquiries` | 邮箱上方小字 |
| `copiedLabel` | `Copied` | 复制成功后替换的文案 |
| `email` | `xkt202311@163.com` | 邮箱本体 + 点击复制 |

> 注意：MENU 浮层左上那两行仍会显示 `ownerLines = ["Independent designer", "Working globally"]`，`Working globally` 在那里还在。要一起去掉就说一声。

---

## 分区 3 · 中央信息带

- 组件：`HeroBand.tsx`
- 左侧两行字是**同一个字符串渲染两遍**（上灰下实），原站的重影效果，不是重复内容
- 右侧 Role / Launch **随轮播 01–08 联动**（已实现）；原第三行 `Recognition` **已整体删除**（首页、详情页、`data.ts` 里的奖项数据一起清掉）

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `owner` | `QTING` | 重影行主字 |
| `ownerAlias` | `QTING` | 重影行副字 |
| `roleLabel` | `Role` | 第一行标签 |
| `launchLabel` | `Launch` | 第二行标签 |
| `WHEEL[i].roles` | 每张卡不同 | 值，多项用 ` | ` 分隔 |
| `WHEEL[i].launch` | 每张卡不同 | 值，建议 4 位年份 |

> 信息带是固定 194px 高，每项建议 **不超过 3 行**，否则会溢出。

---

## 分区 4 · 项目轮播（8 张卡）

- 组件：`ProjectWheel.tsx`
- 每张卡只有：项目名、类型标签、一句描述、3 个色块
- 键盘 ↑↓ / 滚轮切换；**01→08→01 无限循环**，卡片改成几张都能自动适配

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `title` | 项目名 | 大字 |
| `tag` | `Photography - portfolio` | 类型标签，格式 `大类 - 小类` |
| `description` | 一句话 | 建议 60–90 字符 |
| `colors[0..2]` | 3 个颜色 | 卡片上的 3 个色块，也是详情页色板 |

当前 8 张（替换时按编号对应）：

| # | title | tag |
| --- | --- | --- |
| 01 | Mathijs Hanenkamp | Photography - portfolio |
| 02 | Silent Waves | Brand - editorial |
| 03 | North Arc | Studio - website |
| 04 | Noir Capsule | Fashion - campaign |
| 05 | Vector Grid | Product - launch |
| 06 | Memory Atlas | Archive - collection |
| 07 | House of Noise | Agency - case study |
| 08 | Future Echo | Creative - direction |

---

## 分区 5 · 左下计数区

- 组件：`WorkCounter.tsx`

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `contactTitle` | `Come say hi` | 上排按钮，点开联系卡 |
| `creditsTitle` | `Credits` | 下排按钮，点开署名卡 |
| `selectedLabel` | `Selected work` | 计数上方小字，**点它开关档案轨** |
| `archiveLabel` | `View the full archive` | 只作鼠标悬停提示，界面上不显示 |
| `counterTotal` | `/00` | **静态文字**，见待确认第 1 条 |

---

## 分区 6 · 档案轨（19 行）

- 组件：`ArchiveRail.tsx`
- 点左下 `Selected work` 打开（滚轮向上 / ↑ / Esc 返回），整列居中向上匀速滚动（19 条 ×2 做无缝循环）
- 条目数变了要同步改 `ArchiveRail.tsx` 里的 `90s` 滚动时长
- 每行顺序：缩略图 → 标题 → slug → 日期 → 3 色块 → 分类 → 描述（过长截断）

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `slug` | `district2-studio` | 小写，会**显示在屏上**，也决定详情页网址 `/project/<slug>` |
| `title` | `DISTRICT2 STUDIO` | 全大写 |
| `date` | `2019-09-24` | 屏上显示，`YYYY-MM-DD` |
| `dateLabel` | `2019` | 详情页 `Launch` 行显示，年份或英文月份都行 |
| `colors[0..2]` | 3 个颜色 | 色块 + 详情页色板 |
| `category` | `Agency & Studio` | 分类 |
| `description` | 一句话 | 轨道上超 320px 会截断，详情页整段显示 |
| `roles` | `Jiuyi Advertising Co., Ltd.` / `Visual Designer` | 详情页 `Team` / `Role` 行，第 1 项对应 `ruler[0]`（公司），后面是角色 |
| `ruler` | `Team` / `Role` | 详情页小标题，一般不用改 |
| `image` | `[IMG-A01] … [IMG-A19]` | 缩略图 **36×28**，详情页做通栏大图 |

当前 19 条（替换时按编号对应）：

| # | slug | title | category |
| --- | --- | --- | --- |
| 01 | district2-studio | DISTRICT2 STUDIO | Agency & Studio |
| 02 | dafi | DAFI TROPICDANE | Furniture |
| 03 | est-populo | EST POPULO | Agency & Studio |
| 04 | bison-studio | BISON STUDIO | Agency & Studio |
| 05 | huyml-2022 | HUYML VOL.1 | Portfolio |
| 06 | rly-network | RLY NETWORK | Blockchain - Web3 |
| 07 | mathijs-hanenkamp | MATHIJS HANENKAMP | Photography |
| 08 | ascon-system | ASCON SYSTEMS | Corporate |
| 09 | uncommon-studio | UNCOMMON STUDIO | Agency & Studio |
| 10 | serious-business | SERIOUS BUSINESS | Agency & Studio |
| 11 | by-kin | BY 'KIN | Agency & Studio |
| 12 | defiant | DEFIANT | Venture Capital |
| 13 | mat-voyce | MAT VOYCE | Portfolio |
| 14 | eislab | EISLAB | Food & Beverage |
| 15 | markwoodland | MARK WOODLAND | Personal Brand |
| 16 | miuxstudio | MIUX STUDIO | Agency & Studio |
| 17 | wonjyou | WON J. YOU STUDIOS | Personal Brand |
| 18 | iventions | IVENTIONS | Promotional |
| 19 | fromanother | FROMANOTHER | Agency & Studio |

---

## 分区 7 · 菜单全屏层

- 组件：`MenuOverlay.tsx`（点顶栏 `Menu`）

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `ownerLines[0..1]` | `Independent designer` / `Working globally` | 左上两行 |
| `NAV[0..3].label` | WORK / ABOUT / PLAYGROUND / CONTACT | 四行导航 |
| `NAV[0..3].href` | `#work` `#about` `#playground` `#contact` | 见待确认第 4 条 |

---

## 分区 8 · 联系卡

- 组件：`ContactCard.tsx`（点左下 `Come say hi`）
- 2 个分组，排版是 **每行 2 组**（`ContactCard.tsx` 自动折行，奇数时末行单组占满整行，增删组不影响版面）

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `contactTitle` | `Come say hi` | 卡片大标题 |
| `contactGroups[n].caption` | `Drop me a line` 等 | 分组小标题 |
| `contactGroups[n].links[]` | 平台名 + 链接 | 格式 `平台名 | https://...`，邮箱用 `mailto:` |

现 2 组：Drop me a line（邮箱）／Hear me yapping about design（YouTube → https://youtu.be/OtqKieUon78?feature=shared）

---

## 分区 9 · Credits 卡

- 组件：`CreditsCard.tsx`（点左下 `Credits`）

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `creditsTitle` | `Credits` | 标题 + 卡片 aria-label |
| `credits[n].role` | `Development & Rive` 等 | 角色 |
| `credits[n].people[]` | 人名 + 链接 | 格式 `人名 | https://...` |

现 4 行：Development & Rive（Chien Pham）／Illustration（Yup Nguyen）／Fonts（BT Glyphius・BT Grotesk）／Copywriting（Ha Nguyen）
卡片底部那个小图案复用**印章的 SVG**（`[IMG-S1]`、`[IMG-S2]`），换 logo 会一起变。

---

## 分区 10 · 右下 Scroll 提示

| 键 | 现在 | 说明 |
| --- | --- | --- |
| `scrollLabel` | `Scroll` | 右下角文字，仅在首页轮播时显示 |

---

## 分区 11 · 项目详情页

- 路由：`src/app/project/[slug]/page.tsx` → 视图 `ProjectView.tsx`（**原站真实版式已抓取落地**，不再是脚手架）
- 图：`galleries.ts`（由 `scripts/fetch-project-galleries.mjs` 生成），每页 3–11 张通栏图，文件名对应 `public/sites/huyml-co-eb36a18b/shared/`
- 文案：`ARCHIVE[i]` 的 `title` / `description` / `about` / `dateLabel` / `category` / `ruler` + `roles`
- `about`：案例导语整段，**19 个条目已全部从原站抓取回填**；`description` 只用于归档轨道与缺省降级
- `about` 可以是多段（`\n\n` 分隔，`hu-text` 是 `white-space: pre-line`），`district2-studio` 目前是英文在上、中文在下；整块放不下时会顶到信息带下沿，控制在 ~500 字符以内较稳
- `Visit site →` 外链**已整体删除**（`ARCHIVE[i].visitUrl` / `SITE.visitLabel` / 渲染层一起移除），不再需要补数据
- 版式：页面本身不滚动，只有图片列滚动；中间的 About / Team·Role / Launch 信息带（原 `Recognition` 行已删除）与底部 24% 条绝对定位吸附，`Next project` 按 `ARCHIVE` 逆序串联
- 进出路径（原站真实动线）：
  - 首页 `/`（`HomeView`）→ 左下角 `View the full archive` 展开 `ArchiveRail` → **点某个项目的照片**（每行是 `<a href="/project/<slug>">`，带缩略图）→ 进入案例页
  - 案例页 → 右上角 `Menu` → 菜单里的 `WORK` / `ABOUT` / `PLAYGROUND` / `CONTACT` 都指回首页区块，点任意一条即**回到首页**（`ProjectView.goToSection` 会把 `#work` 补成 `/#work`；首页同名回调只改 hash，因为它本来就在 `/`）
  - 案例页 → 图片列滚到底 → `Next project` → 按 `ARCHIVE` 逆序进入下一个案例

---

## 分区 12 · 网页标题与描述

| 键 | 现在 | 说明 |
| --- | --- | --- |
| 站点标题 | `{owner} — Award-winning designer` | 浏览器标签 |
| 标题模板 | `%s — {owner}` | 详情页标题 |
| 站点描述 | `{owner} ({ownerAlias}) — {role}. Selected work, playground and inquiries.` | 搜索结果摘要 |
| `role` | `Independent designer` | 只在这里用到 |

---

## 三、图片怎么给（最后一步，先不用管）

**现在不要给图**。等文字全部定稿，按编号把文件发我，或者只告诉我文件夹路径，我自己放。

放置目录统一是 `public/sites/huyml-co-eb36a18b/shared/`，格式 `jpg / png / svg / webp` 都行，透明底用 `png` 或 `svg`。

| 编号 | 用途 | 屏上尺寸 | 建议源图 |
| --- | --- | --- | --- |
| `IMG-S1` … `IMG-S4` | 印章立方体 4 个面 | 56 × 123 | 竖长图，比例 ≈ 0.46:1，深色底 |
| `IMG-A01` … `IMG-A19` | 档案缩略图 + 详情页通栏图 | 缩略图 36 × 28；详情页通栏 | 建议 16:9 或 3:2，≥1600px 宽 |

补充说明：

- 印章 4 个面建议是**同一 logo 的 4 个变体或 4 个角度**，旋转时观感最好。
- 档案图 `IMG-A**` 会在详情页被拉成通栏大图，**同一张图要同时撑住 36×28 的缩略图和通栏**，所以要选构图简单的图。
- 原站的 showreel 视频、音频在克隆时没有抓到，现在 `ALL` 只跳站内首页 `/`；要真播放器／背景视频的话，把文件给我（放 `public/videos/`，现在是空的）。
- `public/seo/` 也是空的：favicon、分享卡片图（OG image）需要的话一起给。

---

## 四、等你填的模板

直接复制下面这段，填完发我即可。填不出来的字段留空，我不会覆盖。

```
# ===== 分区 1 · 左上印章 =====
showreelLabel =
showreelHref =
[IMG-S1] = （图，最后给）
[IMG-S4] =

# ===== 分区 2 · 顶栏 =====
menuLabel =
inquiriesLabel =
copiedLabel =
email =

# ===== 分区 3 · 中央信息带 =====
owner =
ownerAlias =
roleLabel =
launchLabel =

# ===== 分区 4 · 轮播卡（01–08，每张一段）=====
--- CARD 01 ---
title =
tag =
description =
role =              （多项用 | 分隔）
launch =
colors = #111111 | #eeeeee | #ff0000
--- CARD 02 ---
（同 01 的字段，重复到 08；要增删卡片就多写 / 少写几段）

# ===== 分区 5 · 左下计数 =====
contactTitle =
creditsTitle =
selectedLabel =
counterTotal =

# ===== 分区 6 · 档案行（01–19，每行一段）=====
--- ARCHIVE 01 ---
slug =
title =
date = 2024-01-01
dateLabel = January 2024
category =
colors = #111111 | #eeeeee | #ff0000
description =
role =              （第 1 项是公司／Team，后面是角色，多项用 | 分隔）
[IMG-A01] = （图，最后给）
--- ARCHIVE 02 ---
（同 01 的字段，重复到 19）

# ===== 分区 7 · 菜单 =====
ownerLine1 =
ownerLine2 =
nav1 = WORK | #work
nav2 = ABOUT | #about
nav3 = PLAYGROUND | #playground
nav4 = CONTACT | #contact

# ===== 分区 8 · 联系卡 =====
contactTitle =
group1-caption =
group1-link1 =
group2-caption =
group2-link1 =
（按需要加到 group5，每组 1–3 条链接）

# ===== 分区 9 · Credits =====
creditsTitle =
credit1-role =
credit1-person =
credit2-role =
credit2-person =
（按需要加到 credit4）

# ===== 分区 10 · 右下提示 =====
scrollLabel =

# ===== 分区 12 · 标题描述 =====
siteTitle =
siteDescription =
role =              （用于描述，如 Independent designer）

# ===== 补充问题 =====
（见下方待确认清单，直接写答案）
```

---

## 五、需要你拍板的 6 件事

1. **`counterTotal` 现在是静态 `/00`** —— 计数会跟着循环走 `01→08→01`，要不要把总数改成真实数字（8 张卡就 `/08`）？改一行代码的事。
2. **顶栏时间 `15:26` 是静态的** —— 要不要按你的时区自动实时更新？
3. **轮播卡片和档案行的数量** —— 轮播卡现在改几张都行（01⇄08 无限循环，数学上自动适配）；档案轨滚动的 90s 是按 19 条 ×2 调的时间，条目数变了要一起改。
4. **菜单里 4 个导航**（WORK / ABOUT / PLAYGROUND / CONTACT）目前只改 URL 的 `#hash`，页面上没有对应区块可以跳 —— 保持现状，还是要我把它们接到真实区块？
5. **纯英文还是中英混排**？原站是纯英文。要中文的话字体和断行我要单独调。
6. **项目详情页**现在是脚手架 —— 这轮要不要一起做成完整案例页？原站有 19 个页面，需要我再抓一轮素材。

---

## 六、文字定稿后我会做的事

1. 按分区替换 `data.ts` 里的内容（图片先留占位）。
2. 条目增删后同步调整滚动时长、计数、信息带行数等联动数值。
3. 跑 `npm run typecheck` + 刷新 `localhost:3000` 预览。
4. 图片到位后按编号替换文件、验证缩略图与通栏大图的裁切。
