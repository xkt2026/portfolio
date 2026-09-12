# 下一级页面 — 19 个 case study

> 用途：抄 `huyml.co/project/*` 之前的**清单与准备说明**。首页已具备抓取管线，这里记录怎么把它复用到详情页。

---

## 1. 结论：一共 19 个

证据来自首页抓取源 `docs/research/huyml-co-eb36a18b/root-8a5edab2/source.html`：

```html
<a class="framer-1tr28s framer-245120" href="./project/district2-studio">
```

归档走马灯的每一行在原站都是 `<a href="./project/<slug>">`。全站共 **19** 个这样的链接，与 `ARCHIVE` 的 19 个条目完全对应。

> 补充：首页右侧项目轮的 8 张卡（Silent Waves / North Arc / …）**不在这 19 个里**，它们没有对应详情链接，是另一组精选内容。

---

## 2. 已完成的前期准备

| 项 | 状态 |
| --- | --- |
| 归档条目补回 `<a href="/project/<slug>">` | 已完成（`ArchiveRail.tsx`），原站有链接层、之前的克隆丢了 |
| 动态路由骨架 `src/app/project/[slug]/page.tsx` | 已完成 —— 19 个链接可点通，不再 404 |
| 数据源打通 | 骨架直接用 `ARCHIVE` 渲染标题、日期、分类、描述、角色、荣誉、色板、主图 |
| `generateStaticParams` | 已就绪，会为 19 个 slug 生成静态页 |
| 标题模板 | `layout.tsx` 定义了 `%s — Huy Phan`，详情页自动继承 |
| 未知 slug | 走 `notFound()` |
| 真实案例版式 `ProjectView.tsx` | 已完成 —— 按第 1 个页面抓取的结构落地（图片列滚动 + 双信息带 + `Next project` 链） |
| 19 页图集 `galleries.ts` | 已完成 —— `scripts/fetch-project-galleries.mjs` 抓取 + 下载，脚本可重跑 |
| 19 页案例导语 `ARCHIVE[i].about` | 已完成 —— 逐页从原站抓取回填 |

**已取消**：`Visit site →` 外链按需求整体删除，`ARCHIVE[i].visitUrl` / `SITE.visitLabel` / `ProjectView` 里的渲染块一起移除，不再需要补齐各页 `<a>` `href`。

---

## 3. 19 个页面与目录名

抓取结果按 `docs/research/<site-key>/<page-key>/` 存放。命名规则已核对：

- `site-key` = `sha256("https://huyml.co")[0:8]` → `eb36a18b`
- `page-key` = `<路径 slug>-<sha256(路径)[0:8]>`；首页 `/` 得到 `root-8a5edab2`

19 个详情页的目录名（可直接复制使用）：

| # | URL | page-key |
| --- | --- | --- |
| 1 | `/project/district2-studio` | `project-district2-studio-596b2c56` |
| 2 | `/project/dafi` | `project-dafi-2379497b` |
| 3 | `/project/est-populo` | `project-est-populo-95f340cd` |
| 4 | `/project/bison-studio` | `project-bison-studio-40df50f2` |
| 5 | `/project/huyml-2022` | `project-huyml-2022-5bbd6b5d` |
| 6 | `/project/rly-network` | `project-rly-network-fa543a02` |
| 7 | `/project/mathijs-hanenkamp` | `project-mathijs-hanenkamp-db1ee852` |
| 8 | `/project/ascon-system` | `project-ascon-system-b37d3cbe` |
| 9 | `/project/uncommon-studio` | `project-uncommon-studio-e5842bf8` |
| 10 | `/project/serious-business` | `project-serious-business-3ffe5335` |
| 11 | `/project/by-kin` | `project-by-kin-30085a76` |
| 12 | `/project/defiant` | `project-defiant-4b32dea0` |
| 13 | `/project/mat-voyce` | `project-mat-voyce-8ec33758` |
| 14 | `/project/eislab` | `project-eislab-878a0ef8` |
| 15 | `/project/markwoodland` | `project-markwoodland-1c9e777f` |
| 16 | `/project/miuxstudio` | `project-miuxstudio-097e821c` |
| 17 | `/project/wonjyou` | `project-wonjyou-b769ea8e` |
| 18 | `/project/iventions` | `project-iventions-ef33053d` |
| 19 | `/project/fromanother` | `project-fromanother-735db027` |

顺序与 `ARCHIVE` 数组一致（即首页归档轨道的显示顺序）。

---

## 4. 抓取方案

### 4.1 每个页面要走一遍的流程

1. **抓 HTML + CSS** —— 用 `clone-website` skill 抓 `https://huyml.co/project/<slug>`，产出
   `docs/research/huyml-co-eb36a18b/<page-key>/source.html` 与 `extracted-styles.css`。
2. **结构与样式分析**（下面这些脚本已经支持传入页面目录，可直接用于详情页）：
   - `node scripts/analyze-source.mjs <page-dir>`
   - `node scripts/analyze-dom.mjs <page-dir> [深度]`
   - `node scripts/outline.mjs <page-dir> [层级]`
   - `node scripts/css-query.mjs <page-dir> <选择器...>`
   - `node scripts/extract-media.mjs <page-dir>`
3. **下载资源** —— 详情页的图基本都在同一个 origin，应与首页共用
   `public/sites/huyml-co-eb36a18b/shared/`，无需另建目录。
4. **抽数据** —— 写进独立文件，例如
   `src/components/sites/huyml-co-eb36a18b/root-8a5edab2/projects/<slug>.ts`。
5. **替换版式** —— 把 `src/app/project/[slug]/page.tsx` 里第 2 节提到的临时结构换成抓到的真实结构。

### 4.2 脚本限制（开工前必须先处理）

以下脚本把首页目录**写死在代码里**，直接对详情页运行会读到首页数据：

| 脚本 | 写死内容 | 影响 |
| --- | --- | --- |
| `download-assets.mjs` | `root` / `siteKey` / `pageKey`（第 5-7 行） | 资源会下载到首页目录 |
| `build-data.mjs` | `root`（第 5 行） | 抽取的是首页数据 |
| `gen-data.mjs` | `root`（第 4 行） | **会覆盖 `data.ts`** |
| `typography.mjs` | `root`（第 5 行） | 字型分析对象错误 |

建议把 `root` 改成 `process.argv[2]`（其余脚本已经是这个写法），保持一套管线通吃 20 个页面。

> **红线：不要对详情页跑 `gen-data.mjs`。** 它会把首页 `data.ts` 整体重写，直接冲掉你正在填的内容。

### 4.3 建议的共享组件重构

复制首页之前，先把跨页面复用的部分提升到 `src/components/sites/huyml-co-eb36a18b/shared/`：

| 组件 | 复用理由 |
| --- | --- |
| `SiteStamp.tsx` | 每个页面都有左上印章 |
| `SiteNav.tsx` | 顶栏固定，全站一致 |
| `MenuOverlay.tsx` | 菜单浮层全站一致 |
| `ContactCard.tsx` / `CreditsCard.tsx` | 页脚式浮层，全站一致 |
| `CloseButton.tsx` / `NavArrowList.tsx` / `ShowreelLink.tsx` / `InquiryButton.tsx` / `primitives.tsx` | 上述组件的依赖 |
| `data.ts` | 全站文案与 `ARCHIVE` 的唯一来源 |

`HomeView.tsx`、`HeroBand.tsx`、`ProjectWheel.tsx`、`WorkCounter.tsx`、`ArchiveRail.tsx`、`ScrollHint.tsx` 是首页专属，留在 `root-8a5edab2/`。

当前**先不动**这个重构：详情页的真实结构还没抓到，等看清哪些组件确实被复用、以及是否需要按页面传入不同内容后再拆，避免拆错。

---

## 5. 开工检查清单

- [ ] 先解决 `docs/CONTENT_MAP.md` 第 4 节的问题 1（`WHEEL` 色板配对）——它影响首页内容完整性
- [ ] 把 `download-assets.mjs` / `build-data.mjs` / `gen-data.mjs` / `typography.mjs` 的 `root` 参数化
- [x] 抓第 1 个页面 `project-district2-studio-596b2c56`，跑通完整流程
- [x] 确认详情页的资源是否真的共用 `shared/`，还是各有独立图集 —— 19 页图集全部落在 `shared/`（`fetch-project-galleries.mjs`）
- [x] 用第 1 个页面验证共享组件重构方案，再批量做剩下 18 个 —— 19 页统一走 `ProjectView.tsx` + `galleries.ts`
- [x] ~~补 `ARCHIVE[i].visitUrl`~~ —— 已取消：外链与字段一起删除
