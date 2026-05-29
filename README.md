# WarmUI — 为长辈而生的适老化体验增强层

**一个开源的前端组件库，让每一个产品都能温柔地拥抱老年人。**

---

## 为什么需要 WarmUI？

今天的互联网产品，大多由年轻人设计、为年轻人服务。当一位老人试图用手机挂号、缴费或与家人视频时，他面对的常常是细小的文字、繁杂的操作和陌生的提示——这不是因为他"学不会"，而是因为产品从未真正为他设计过。

市面上的"老年模式"往往只是粗暴地放大字号、提高对比度，却忽略了老年人更深层的需求：对信息真正的理解、对点错按钮的恐惧、对"被当作负担"的敏感。

**WarmUI 试图改变这一切。** 它不是一个样式主题，而是一套从认知、触觉到情感全面覆盖的适老化组件库。任何 Web 产品接入它，就像获得了一位懂老人、爱老人的交互设计师。

---

## 核心特性

### 🎯 第一层：基础感官补偿

| 组件                              | 解决的问题                             | 技术亮点                                           |
| --------------------------------- | -------------------------------------- | -------------------------------------------------- |
| **动态字号引擎** `warm-text`      | 不是全局放大，而是根据内容类型智能分级 | 语义级别：heading/body/button/caption/large + level 缩放 |
| **防抖触控区** `warm-button`      | 老人手抖导致误触                       | 可配置防抖延迟 + 触控容差区域                      |
| **语音朗读增强版** `warm-speech`  | 不仅仅是 TTS，还能把页面结构"读"出来   | 自动生成页面大纲，自然语言朗读                     |
| **高对比度动态配色** `warm-theme` | 色弱/低视力用户看不清                  | 预设红绿色盲（绿色弱/红色弱）、蓝黄色盲、高对比度等 5 套主题 |

### 🧠 第二层：认知辅助

| 组件                               | 解决的问题                     | 技术亮点                                  |
| ---------------------------------- | ------------------------------ | ----------------------------------------- |
| **大白话翻译器** `warm-translator` | 复杂文案老人看不懂             | 悬停/长按弹出"说人话"气泡，支持静态翻译和 API 动态翻译 |
| **下一步引导** `warm-guide`        | 老人进新页面不知道按哪儿       | 呼吸动画高亮光圈 + 遮罩层 + 语音提示，可一键关闭   |
| **迷路救援** `warm-rescue`         | 老人不知道自己在哪儿、怎么回去 | 浮动救生圈按钮 + 语音输入 + 关键词导航匹配   |

### 💬 第三层：情感连接

| 组件                       | 解决的问题                 | 技术亮点                                           |
| -------------------------- | -------------------------- | -------------------------------------------------- |
| **家人的便签** `warm-note` | 子女想给父母留言提醒       | 远程便签系统，支持 4 种类型（提醒/提示/注意/鼓励），可关闭 |
| **完成夸赞** `warm-praise` | 老人完成操作需要正反馈     | 花朵绽放 + 五彩纸屑 + 语音鼓励，平等的语气         |
| **老友模式** `warm-buddy`  | 远程协助对老人来说太难描述 | 一次性安全码 + 高亮指引 + 语音说明，5 分钟自动过期  |

### 🔧 第四层：开发者工具

| 工具                            | 解决的问题             | 技术亮点                                   |
| ------------------------------- | ---------------------- | ------------------------------------------ |
| **老龄化模拟器**（浏览器插件）  | 开发者无法感同身受     | 9 种模拟：4 视觉 + 3 触觉 + 3 认知        |
| **适老化助手**（浏览器插件）    | 任何网页一键适老化     | 6 种增强器 + 5 种预设场景，面向老人直接使用 |
| **一键合规检查** `warm-checker` | 产品难以达到无障碍标准 | 4 项自动检查：触控区域 / 对比度 / alt / 年龄歧视 |

---

## 技术哲学

- **框架无关**：核心基于 Web Components，提供 React/Vue 封装。
- **渐进增强**：无需重构现有项目，可单独引入任何组件。
- **隐私优先**：语音和 AI 能力优先在本地处理，调用云端时告知且不存储。
- **开源共生**：MIT 协议，欢迎设计师、社工、家属，以及每一位关心长辈的人参与贡献。

---

## 安装

### 直接使用 Web Components（框架无关）

```bash
npm install @warm-ui/components
```

```js
import "@warm-ui/components";
```

在 HTML 中直接使用：

```html
<warm-button elder-friendly>确认挂号</warm-button>
<warm-text size="heading">适老化标题</warm-text>
<warm-guide overlay target="#submitBtn">点这个蓝色按钮完成</warm-guide>
<warm-translator translation="就是确认您是本人"
  >请您核实身份信息</warm-translator
>
```

### React

```bash
npm install @warm-ui/react
```

```jsx
import {
  WarmButton,
  WarmText,
  WarmGuide,
  WarmTranslator,
  WarmPraise,
  applyTheme,
  runAccessibilityCheck,
} from "@warm-ui/react";

function App() {
  return (
    <>
      <WarmButton elderFriendly>确认挂号</WarmButton>
      <WarmText size="heading">欢迎使用</WarmText>
      <WarmGuide overlay target="#submitBtn">
        点这个蓝色按钮完成
      </WarmGuide>
    </>
  );
}
```

### Vue

```bash
npm install @warm-ui/vue
```

```vue
<template>
  <WarmButton elderFriendly>确认挂号</WarmButton>
  <WarmText size="heading">欢迎使用</WarmText>
</template>

<script setup>
import { WarmButton, WarmText, applyTheme } from "@warm-ui/vue";
</script>
```

---

## 组件 API

### 核心组件

#### WarmButton — 适老化按钮

| 属性             | 类型    | 默认值 | 说明                                     |
| ---------------- | ------- | ------ | ---------------------------------------- |
| `elder-friendly` | Boolean | false  | 开启适老模式（放大按钮 + 默认防抖 300ms + 容差 12px） |
| `debounce-delay` | Number  | 0      | 防抖延迟（毫秒），elder-friendly 时默认 300 |
| `tolerance`      | Number  | 0      | 触控容差区域（像素），elder-friendly 时默认 12 |
| `disabled`       | Boolean | false  | 禁用按钮                                 |

| 事件         | 说明               |
| ------------ | ------------------ |
| `warm-click` | 按钮点击（已过防抖） |

#### WarmText — 动态字号引擎

| 属性    | 类型   | 默认值  | 说明                                                       |
| ------- | ------ | ------- | ---------------------------------------------------------- |
| `size`  | String | `body`  | 语义级别：`heading` / `body` / `button` / `caption` / `large` / `normal` |
| `level` | Number | -       | 缩放级别，每级增加 8% 字号                                 |
| `plain` | Boolean | false  | 次要文本样式（颜色变浅）                                   |

#### WarmCard — 卡片容器

| 属性        | 类型    | 默认值 | 说明                   |
| ----------- | ------- | ------ | ---------------------- |
| `highlight` | Boolean | false  | 高亮模式（蓝色边框阴影） |

#### WarmDialog — 温和对话框

| 属性               | 类型    | 默认值 | 说明                           |
| ------------------ | ------- | ------ | ------------------------------ |
| `open`             | Boolean | false  | 是否显示                       |
| `close-on-overlay` | Boolean | false  | 点击遮罩层是否关闭（默认防误触不关闭） |

| 方法   | 说明     |
| ------ | -------- |
| `open()`   | 打开对话框 |
| `close()`  | 关闭对话框 |

| 事件               | 说明       |
| ------------------ | ---------- |
| `warm-dialog-open`  | 对话框打开 |
| `warm-dialog-close` | 对话框关闭 |

| 插槽      | 说明     |
| --------- | -------- |
| `header`  | 标题区域 |
| 默认插槽  | 内容区域 |
| `footer`  | 底部操作区 |

#### WarmToast — 轻提示

| 属性   | 类型   | 默认值 | 说明                              |
| ------ | ------ | ------ | --------------------------------- |
| `show` | Boolean | false | 是否显示                          |
| `type` | String | -      | 类型：`success` / `error`，默认无 |

| 方法            | 说明                           |
| --------------- | ------------------------------ |
| `show(duration)` | 显示提示，默认 3000ms 后自动隐藏 |
| `hide()`         | 隐藏提示                       |

#### WarmGuide — 下一步引导

| 属性     | 类型    | 默认值 | 说明                                       |
| -------- | ------- | ------ | ------------------------------------------ |
| `overlay` | Boolean | false | 全屏遮罩模式，引导浮层显示在页面底部中央   |
| `target` | String  | -      | CSS 选择器，高亮目标元素（呼吸动画光圈）   |
| `voice`  | Boolean | true   | 是否自动语音朗读引导文字                   |

| 方法                 | 说明                       |
| -------------------- | -------------------------- |
| `dismiss()`           | 关闭引导和高亮             |
| `showWithTarget(sel)` | 显示引导并高亮指定目标元素 |

| 事件                  | 说明     |
| --------------------- | -------- |
| `warm-guide-dismiss`   | 引导关闭 |

#### WarmNote — 家人便签

| 属性          | 类型    | 默认值     | 说明                                       |
| ------------- | ------- | ---------- | ------------------------------------------ |
| `type`        | String  | `reminder` | 便签类型：`reminder` / `tip` / `warning` / `encourage` |
| `author`      | String  | -          | 留言人                                     |
| `time`        | String  | -          | 留言时间                                   |
| `note-id`     | String  | -          | 便签 ID，用于远程便签存取                  |
| `remote`      | String  | -          | 远程便签标记，`own` 表示可删除             |
| `dismissable` | Boolean | false      | 显示"我知道了"关闭按钮                     |

| 事件                 | 说明                   |
| -------------------- | ---------------------- |
| `warm-note-dismiss`   | 点击"我知道了"关闭便签 |

| 静态方法                      | 说明                   |
| ----------------------------- | ---------------------- |
| `WarmNote.saveRemoteNote(id, data)` | 保存远程便签到 localStorage |
| `WarmNote.listRemoteNotes()`        | 获取所有远程便签列表       |

#### WarmRescue — 迷路救援

| 属性    | 类型    | 默认值 | 说明                                           |
| ------- | ------- | ------ | ---------------------------------------------- |
| `float` | Boolean | false  | 浮动模式，右下角圆形按钮，点击展开完整面板     |
| `pages` | String  | -      | JSON 数组，可导航页面列表 `[{name, keywords}]` |

| 方法       | 说明         |
| ---------- | ------------ |
| `expand()`  | 展开浮动面板 |
| `collapse()` | 收起浮动面板 |

| 事件                     | 说明                               |
| ------------------------ | ---------------------------------- |
| `warm-rescue-navigate`    | 语音导航匹配成功，`detail.matched` 为匹配页面 |

### 增强组件

#### WarmSpeech — 语音朗读增强

| 属性   | 类型   | 默认值 | 说明                                         |
| ------ | ------ | ------ | -------------------------------------------- |
| `text` | String | -      | 要朗读的文字，不设则读取元素文本内容         |
| `mode` | String | `text` | 朗读模式：`text`（纯文字）/ `outline`（页面大纲） |
| `lang` | String | `zh-CN` | 朗读语言                                    |
| `rate` | Number | `0.9`  | 朗读语速                                     |

#### WarmTranslator — 大白话翻译器

| 属性          | 类型   | 默认值 | 说明                                       |
| ------------- | ------ | ------ | ------------------------------------------ |
| `translation` | String | -      | 静态翻译文本，不设则调用 API 动态翻译      |
| `original`    | String | -      | 原文标注，不设则自动取元素文本内容         |

- **桌面端**：悬停 800ms 后弹出翻译气泡
- **移动端**：长按切换翻译气泡

#### WarmPraise — 完成夸赞

| 属性     | 类型    | 默认值 | 说明                       |
| -------- | ------- | ------ | -------------------------- |
| `show`   | Boolean | false  | 是否显示夸赞动画           |
| `message` | String | -      | 自定义夸赞文字             |
| `voice`  | Boolean | false  | 是否语音朗读夸赞文字       |

| 方法              | 说明                                          |
| ----------------- | --------------------------------------------- |
| `show(index?)`    | 显示夸赞，可传入消息索引（0-4），默认随机     |
| `hide()`          | 隐藏夸赞                                     |

- 内置 5 条夸赞消息，随机轮换
- 3.5 秒后自动隐藏，按 Esc 可提前关闭

#### WarmBuddy — 老友模式

| 方法                          | 说明                                     |
| ----------------------------- | ---------------------------------------- |
| `highlightTarget(selector, speech)` | 在老人屏幕上高亮目标元素 + 语音说明 |
| `clearHighlight()`            | 清除高亮指引                             |

| 事件                      | 说明                     |
| ------------------------- | ------------------------ |
| `warm-buddy-code`          | 生成安全码，`detail.code` |
| `warm-buddy-connected`     | 远程协助连接成功         |
| `warm-buddy-disconnected`  | 断开连接                 |

- 安全码 6 位，5 分钟后自动过期
- 流程：生成安全码 → 告知家人 → 家人输入安全码 → 连接成功

---

## 工具模块 API

### Theme — 高对比度动态配色

```js
import { applyTheme, getSavedTheme, getAvailableThemes, THEMES } from "@warm-ui/components";
```

| 方法/属性            | 说明                                       |
| -------------------- | ------------------------------------------ |
| `applyTheme(name)`   | 应用主题到全局，同时保存到 localStorage    |
| `getSavedTheme()`    | 获取已保存的主题名称，默认 `default`       |
| `getAvailableThemes()` | 返回所有可用主题列表 `[{id, name}]`      |
| `THEMES`             | 主题配置对象                               |

**内置主题**：

| 主题 ID          | 名称               |
| ---------------- | ------------------ |
| `default`        | 默认主题           |
| `deuteranopia`   | 红绿色盲（绿色弱） |
| `protanopia`     | 红绿色盲（红色弱） |
| `tritanopia`     | 蓝黄色盲           |
| `high-contrast`  | 高对比度           |

### SpeechAdapter — 语音适配器

```js
import { SpeechAdapter, speechAdapter } from "@warm-ui/components";
```

| 方法                                    | 说明                                     |
| --------------------------------------- | ---------------------------------------- |
| `speak(text, options?)`                 | 文字转语音朗读                           |
| `speakOutline(outline, options?)`       | 朗读页面大纲摘要                         |
| `startRecognition(options)`             | 开始语音识别                             |
| `stop()`                                | 停止朗读                                 |
| `registerProvider(name, handler)`       | 注册自定义 TTS 提供商                    |
| `registerRecognitionProvider(name, handler)` | 注册自定义语音识别提供商            |

| 静态方法                    | 说明                     |
| --------------------------- | ------------------------ |
| `SpeechAdapter.isTTSSupported()` | 检测浏览器是否支持 TTS |
| `SpeechAdapter.isRecognitionSupported()` | 检测浏览器是否支持语音识别 |

**默认实例**：`speechAdapter`，开箱即用。

### Checker — 一键合规检查

```js
import { runAccessibilityCheck, formatReport, CHECK_RULES } from "@warm-ui/components";
```

| 方法/属性                        | 说明                                           |
| -------------------------------- | ---------------------------------------------- |
| `runAccessibilityCheck(ruleIds?)` | 执行合规检查，返回 Promise<报告对象>          |
| `formatReport(report)`           | 生成友好的文本格式检查报告                     |
| `CHECK_RULES`                    | 检查规则数组                                   |

**检查规则**：

| 规则 ID              | 名称         | 级别   | 说明                          |
| -------------------- | ------------ | ------ | ----------------------------- |
| `touch-target-size`  | 触控区域大小 | error  | 可点击区域是否 ≥ 44×44dp     |
| `contrast-ratio`     | 色彩对比度   | error  | 对比度是否达到 AA 级（≥4.5:1） |
| `alt-text`           | 图片替代文本 | warning | 图片是否有 alt 属性          |
| `age-discrimination` | 年龄歧视检查 | error  | 是否存在年龄歧视性逻辑        |

### API Proxy — 服务接口代理

```js
import { translateToPlain, getNavigationSuggestion } from "@warm-ui/components";
```

| 方法                                   | 说明                     |
| -------------------------------------- | ------------------------ |
| `translateToPlain(text, lang?)`        | 大白话翻译 API           |
| `getNavigationSuggestion(query, pages)` | AI 导航建议 API         |

- 内置速率限制：每分钟最多 20 次请求
- 需要后端提供 `/api/warm/translate` 和 `/api/warm/navigate` 接口

---

## 浏览器插件

### 老龄化模拟器 `@warm-ui/plugin`

面向开发者的 Chrome 扩展，一键模拟老年人在使用 Web 产品时的真实体验。

**9 种模拟模式**：

| 类别     | 模式             | 说明                       |
| -------- | ---------------- | -------------------------- |
| 👓 视觉  | 模糊视觉         | 模拟老花眼视力衰退         |
| 👓 视觉  | 黄化视觉         | 模拟晶状体变黄             |
| 👓 视觉  | 管状视野         | 模拟周边视力丧失           |
| 👓 视觉  | 对比度下降       | 模拟对比敏感度降低         |
| 🖐️ 触觉 | 手抖（页面抖动） | 模拟手部震颤对阅读的影响   |
| 🖐️ 触觉 | 手抖（光标抖动） | 模拟手部震颤对操作的影响   |
| 🖐️ 触觉 | 精细动作减弱     | 模拟手指灵活性下降         |
| 🧠 认知  | 信息处理变慢     | 模拟认知处理速度降低       |
| 🧠 认知  | 注意力易分散     | 模拟注意力难以集中         |
| 🧠 认知  | 认知降级         | 隐藏图标 + 替换术语        |

### 适老化助手 `@warm-ui/elder-plugin`

面向老人直接使用的 Chrome 扩展，让任何网页一键变得适合长辈阅读和操作。

**5 种预设场景**：

| 场景       | 说明                               |
| ---------- | ---------------------------------- |
| 大字号模式 | 文字更大更清晰（推荐）             |
| 简洁模式   | 去掉干扰，专注内容                 |
| 语音优先   | 选中文字自动朗读                   |
| 夜间模式   | 深色背景，保护眼睛                 |
| 自定义     | 自由组合各项增强功能               |

**6 种增强器**：

| 增强器         | 说明                       |
| -------------- | -------------------------- |
| 🔤 字体放大   | 三档可调（小/中/大）       |
| 🎨 高对比度   | 三种主题（高对比/色盲/深色） |
| 📄 阅读模式   | 去掉广告和干扰，专心阅读   |
| 👆 防误触     | 按钮更大，不容易点错       |
| 🔊 语音朗读   | 选中文字，帮您读出来       |
| 🧭 页面引导   | 告诉您下一步该点哪里       |

---

## 在线体验

WarmUI 提供了一个全功能模拟体验页面，无需安装即可在浏览器中直接打开体验所有 12 个组件的交互效果。

```bash
# 1. 克隆仓库
git clone https://github.com/user/warm-ui.git
cd warm-ui

# 2. 启动静态服务（任选一种）
npx serve . -p 3000
# 或
npx http-server . -p 3000

# 3. 浏览器打开
# http://localhost:3000/demo/
```

体验页面按四层架构组织，每个组件都配有可交互控件和实时示例代码：

| 区域          | 可体验的内容                                                    |
| ------------- | --------------------------------------------------------------- |
| 🎯 感官补偿   | 按钮防抖调参、字号语义切换、语音朗读、5 套色盲主题              |
| 🧠 认知辅助   | 悬停看翻译气泡、呼吸动画引导高亮、浮动救援面板                  |
| 💬 情感连接   | 动态添加便签、触发花朵绽放纸屑、安全码联机模拟                  |
| 🔧 开发者工具 | 9 种老龄化模拟模式实时应用、6 种适老化增强器、一键合规检查扫描  |

---

## 快速示例

```html
<!-- 适老化按钮 -->
<warm-button elder-friendly debounce-delay="500" tolerance="16">
  确认挂号
</warm-button>

<!-- 大白话翻译 -->
<warm-translator translation="就是让您确认是本人操作，不是骗子">
  请您核实身份信息以确保账户安全
</warm-translator>

<!-- 下一步引导 + 语音 -->
<warm-guide overlay target="#payBtn" voice> 点这个蓝色按钮完成支付 </warm-guide>

<!-- 完成夸赞 -->
<warm-praise id="praise"></warm-praise>
<script>
  document.getElementById("praise").show();
</script>

<!-- 迷路救援（悬浮模式） -->
<warm-rescue float pages='[{"name":"首页","keywords":["首页","回去"]}]'>
  <warm-button>返回首页</warm-button>
</warm-rescue>

<!-- 老友模式 -->
<warm-buddy id="buddy"></warm-buddy>

<!-- 语音朗读页面结构 -->
<warm-speech mode="outline">朗读页面结构</warm-speech>

<!-- 卡片容器 -->
<warm-card highlight>
  <p>重要信息会高亮显示</p>
</warm-card>

<!-- 温和对话框 -->
<warm-dialog id="dialog">
  <span slot="header">确认操作</span>
  <p>您确定要继续吗？</p>
  <div slot="footer">
    <warm-button onclick="this.closest('warm-dialog').close()">取消</warm-button>
    <warm-button elder-friendly>确定</warm-button>
  </div>
</warm-dialog>
<script>
  document.getElementById("dialog").open();
</script>

<!-- 轻提示 -->
<warm-toast id="toast" type="success">操作成功</warm-toast>
<script>
  document.getElementById("toast").show();
</script>

<!-- 家人便签 -->
<warm-note type="reminder" author="小明" time="今天 10:30" dismissable>
  记得下午 3 点去社区医院量血压
</warm-note>

<!-- 使用工具模块 -->
<script type="module">
  import { applyTheme, runAccessibilityCheck, formatReport } from "@warm-ui/components";

  // 切换到高对比度主题
  applyTheme("high-contrast");

  // 运行合规检查
  const report = await runAccessibilityCheck();
  console.log(formatReport(report));
</script>
```

---

## 开发指南

### 环境要求

- Node.js ≥ 18
- npm ≥ 9

### 本地开发

```bash
# 安装依赖
npm install

# 构建所有包
npm run build

# 单独构建
npm run build:components   # 核心组件库
npm run build:react        # React 封装
npm run build:vue          # Vue 封装

# 监听模式开发
npm run dev

# 运行测试
npm run test

# 代码检查
npm run lint
```

### 文档站点

```bash
# 启动文档开发服务器
npm run docs:dev

# 构建文档
npm run docs:build
```

### 浏览器插件开发

```bash
# 构建老龄化模拟器
cd packages/plugin && npm run build

# 构建适老化助手
cd packages/elder-plugin && npm run build

# 打包为 zip（用于发布到 Chrome 商店）
cd packages/plugin && npm run zip
cd packages/elder-plugin && npm run zip
```

构建后在 Chrome 的 `chrome://extensions` 页面选择"加载已解压的扩展程序"，指向对应包的 `dist` 目录即可。

---

## 仓库结构

```
warm-ui/
├── package.json                       # Monorepo 根配置（npm workspaces）
├── .editorconfig
├── .gitignore
├── LICENSE                            # MIT 协议
│
├── packages/
│   ├── components/                    # 核心组件库（Web Components，框架无关）
│   │   ├── src/
│   │   │   ├── index.js              # 统一导出入口
│   │   │   ├── components/           # 12 个 Web Components 组件
│   │   │   │   ├── warm-button.js    #   防抖触控按钮
│   │   │   │   ├── warm-text.js      #   动态字号引擎
│   │   │   │   ├── warm-card.js      #   卡片容器
│   │   │   │   ├── warm-dialog.js    #   对话框
│   │   │   │   ├── warm-toast.js     #   轻提示
│   │   │   │   ├── warm-guide.js     #   下一步引导（呼吸动画+高亮）
│   │   │   │   ├── warm-rescue.js    #   迷路救援（语音+导航匹配）
│   │   │   │   ├── warm-note.js      #   家人便签（远程系统）
│   │   │   │   ├── warm-speech.js    #   语音朗读增强版
│   │   │   │   ├── warm-translator.js#   大白话翻译器
│   │   │   │   ├── warm-praise.js    #   完成夸赞微动效
│   │   │   │   └── warm-buddy.js     #   老友模式联机协助
│   │   │   ├── speech/               # 语音适配器
│   │   │   │   └── speech-adapter.js
│   │   │   ├── theme/                # 高对比度配色系统
│   │   │   │   └── warm-theme.js
│   │   │   ├── checker/              # 合规检查工具
│   │   │   │   └── accessibility-checker.js
│   │   │   └── utils/                # API 代理等工具
│   │   │       └── api-proxy.js
│   │   └── package.json
│   │
│   ├── react/                        # React 封装（12 个组件 + 工具模块）
│   │   └── src/components/
│   │
│   ├── vue/                          # Vue 封装（12 个组件 + 工具模块）
│   │   └── src/components/
│   │
│   ├── plugin/                       # 老龄化模拟器浏览器插件（面向开发者）
│   │   ├── manifest.json
│   │   ├── popup/                    # 弹出面板（9 种模拟模式）
│   │   └── content/                  # 页面内容脚本
│   │
│   └── elder-plugin/                 # 适老化助手浏览器插件（面向老人）
│       ├── manifest.json
│       ├── popup/                    # 弹出面板（5 种场景 + 6 种增强器）
│       ├── content/                  # 页面内容脚本
│       │   └── enhancers/            # 6 个增强器模块
│       │       ├── font-enhancer.js
│       │       ├── contrast-enhancer.js
│       │       ├── layout-enhancer.js
│       │       ├── click-enhancer.js
│       │       ├── speech-enhancer.js
│       │       └── guide-enhancer.js
│       └── background/               # Service Worker
│
├── demo/                             # 全功能模拟体验页面（即开即用）
│   └── index.html                    #   交互式组件展示 + 老龄化模拟体验
│
├── docs/                             # 文档站点（VitePress）
│   ├── guide/                        # 指南
│   ├── components/                   # 12 个组件的 API 文档
│   └── tools/                        # 主题系统 / 合规检查 / 模拟器
│
├── stories/                          # 每个组件的设计故事和使用场景
│   ├── button.md → buddy.md         # 用户故事
│   └── README.md
│
└── .github/
    └── CONTRIBUTING.md               # 特别欢迎非技术背景贡献者
```

---

## 浏览器兼容性

| 特性               | Chrome | Firefox | Safari | Edge |
| ------------------ | ------ | ------- | ------ | ---- |
| Web Components     | ✅ 54+ | ✅ 63+  | ✅ 10.1+ | ✅ 79+ |
| Speech Synthesis   | ✅ 33+ | ✅ 49+  | ✅ 7+  | ✅ 14+ |
| Speech Recognition | ✅ 33+ | ❌      | ❌     | ✅ 79+ |
| CSS Custom Props   | ✅ 49+ | ✅ 31+  | ✅ 9.1+ | ✅ 15+ |

> 语音识别（Speech Recognition）目前仅 Chromium 内核浏览器支持，其他浏览器会优雅降级。

---

## 适合谁用？

- 需要提升产品适老化体验的前端团队
- 开发医疗、政务、金融等民生应用的工程师
- 希望为家中长辈开发小工具的个人开发者
- 所有相信**"技术不该有年龄歧视"**的创造者

---

## 贡献

我们特别欢迎非技术背景的贡献者——设计师、社工、老人家属，只要你有心让科技更温暖，你的声音都非常宝贵。

查看 [CONTRIBUTING.md](.github/CONTRIBUTING.md) 了解更多。

---

**我们相信，最好的科技不是让老人"赶上时代"，而是让时代等一等、扶一把那些陪它走到今天的老人。**

[MIT License](LICENSE) | [GitHub 仓库](https://github.com/user/warm-ui) | [文档站点] | [加入社区]
