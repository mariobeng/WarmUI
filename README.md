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
| **动态字号引擎** `warm-text`      | 不是全局放大，而是根据内容类型智能分级 | 语义级别：heading/body/button/caption + level 缩放 |
| **防抖触控区** `warm-button`      | 老人手抖导致误触                       | 可配置防抖延迟 + 触控容差区域                      |
| **语音朗读增强版** `warm-speech`  | 不仅仅是 TTS，还能把页面结构"读"出来   | 自动生成页面大纲，自然语言朗读                     |
| **高对比度动态配色** `warm-theme` | 色弱/低视力用户看不清                  | 预设红绿色盲、蓝黄色盲、高对比度等 5 套主题        |

### 🧠 第二层：认知辅助

| 组件                               | 解决的问题                     | 技术亮点                                  |
| ---------------------------------- | ------------------------------ | ----------------------------------------- |
| **大白话翻译器** `warm-translator` | 复杂文案老人看不懂             | 长按/悬停弹出"说人话"气泡，接入大模型 API |
| **下一步引导** `warm-guide`        | 老人进新页面不知道按哪儿       | 呼吸动画高亮光圈 + 语音提示，可一键关闭   |
| **迷路救援** `warm-rescue`         | 老人不知道自己在哪儿、怎么回去 | 浮动救生圈按钮 + 语音输入 + AI 导航匹配   |

### 💬 第三层：情感连接

| 组件                       | 解决的问题                 | 技术亮点                                           |
| -------------------------- | -------------------------- | -------------------------------------------------- |
| **家人的便签** `warm-note` | 子女想给父母留言提醒       | 远程便签系统，支持 4 种类型（提醒/提示/注意/鼓励） |
| **完成夸赞** `warm-praise` | 老人完成操作需要正反馈     | 花朵绽放 + 五彩纸屑 + 语音鼓励，平等的语气         |
| **老友模式** `warm-buddy`  | 远程协助对老人来说太难描述 | 一次性安全码 + 静态截图 + 高亮指引 + 语音说明      |

### 🔧 第四层：开发者工具

| 工具                            | 解决的问题             | 技术亮点                                   |
| ------------------------------- | ---------------------- | ------------------------------------------ |
| **老龄化模拟器（浏览器插件）**  | 开发者无法感同身受     | 一键切换：视力衰退 / 手抖光标 / 认知降级   |
| **一键合规检查** `warm-checker` | 产品难以达到无障碍标准 | 自动检查触控区域 / 对比度 / alt / 年龄歧视 |

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
import { WarmButton, WarmText } from "@warm-ui/vue";
</script>
```

---

## 组件列表

### 核心组件

| 组件   | 标签名          | 说明                                    |
| ------ | --------------- | --------------------------------------- |
| Button | `<warm-button>` | 适老化按钮，防抖触控 + 容差区域         |
| Text   | `<warm-text>`   | 动态字号引擎，支持语义级别              |
| Card   | `<warm-card>`   | 卡片容器，支持高亮模式                  |
| Dialog | `<warm-dialog>` | 温和对话框，防误触                      |
| Toast  | `<warm-toast>`  | 轻提示，支持 success/error 类型         |
| Guide  | `<warm-guide>`  | 下一步引导，呼吸动画高亮 + 语音         |
| Note   | `<warm-note>`   | 家人便签，支持远程便签系统              |
| Rescue | `<warm-rescue>` | 迷路救援，浮动按钮 + 语音输入 + AI 导航 |

### 增强组件

| 组件       | 标签名              | 说明                           |
| ---------- | ------------------- | ------------------------------ |
| Speech     | `<warm-speech>`     | 语音朗读增强，支持页面大纲朗读 |
| Translator | `<warm-translator>` | 大白话翻译器，"说人话"气泡     |
| Praise     | `<warm-praise>`     | 完成夸赞，花朵绽放 + 五彩纸屑  |
| Buddy      | `<warm-buddy>`      | 老友模式，安全码联机协助       |

### 工具模块

| 模块    | 路径                                   | 说明                             |
| ------- | -------------------------------------- | -------------------------------- |
| Theme   | `src/theme/warm-theme.js`              | 高对比度动态配色系统（5 套主题） |
| Speech  | `src/speech/speech-adapter.js`         | 语音适配器（TTS + 语音识别）     |
| Checker | `src/checker/accessibility-checker.js` | 一键合规检查工具                 |
| API     | `src/utils/api-proxy.js`               | AI 翻译等服务的 API 代理         |

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

| 区域          | 可体验的内容                                       |
| ------------- | -------------------------------------------------- |
| 🎯 感官补偿   | 按钮防抖调参、字号语义切换、语音朗读、5 套色盲主题 |
| 🧠 认知辅助   | 悬停看翻译气泡、呼吸动画引导高亮、浮动救援面板     |
| 💬 情感连接   | 动态添加便签、触发花朵绽放纸屑、安全码联机模拟     |
| 🔧 开发者工具 | 6 种老龄化模拟模式实时应用、一键合规检查扫描       |

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
```

---

## 仓库结构

```
warm-ui/
├── package.json                       # Monorepo 根配置（npm workspaces）
├── .editorconfig
├── .gitignore
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
│   │   │   │   ├── warm-rescue.js    #   迷路救援（语音+AI导航）
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
│   ├── react/                        # React 封装（12 个组件）
│   │   └── src/components/
│   │
│   ├── vue/                          # Vue 封装（12 个组件）
│   │   └── src/components/
│   │
│   └── plugin/                       # 老龄化模拟器浏览器插件
│       ├── manifest.json
│       ├── popup/                    # 弹出面板（10 种模拟模式）
│       └── content/                  # 页面内容脚本
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
│   ├── button.md → buddy.md         # 10 个用户故事
│   └── README.md
│
└── .github/
    └── CONTRIBUTING.md               # 特别欢迎非技术背景贡献者
```

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
