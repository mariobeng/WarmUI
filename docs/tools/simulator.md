# 老龄化模拟器浏览器插件

让开发者一键体验老年人的视、触、知世界。

## 概述

老龄化模拟器是一个 Chrome 浏览器插件（Manifest V3），属于 WarmUI 适老化设计体系的**开发者工具层**。它通过实时修改网页的视觉呈现、交互行为和认知负载，模拟老年人在使用 Web 产品时可能遇到的各种障碍。

插件安装在 Chrome 后，右上角工具栏会出现 👁️ 图标，点击即可打开控制面板，自由组合多种模拟模式。

---

## 前置条件

| 条件              | 说明                          |
| ----------------- | ----------------------------- |
| **Node.js**       | >= 18，用于构建插件           |
| **npm**           | 随 Node.js 自带，用于安装依赖 |
| **Chrome 浏览器** | 建议使用最新稳定版            |

---

## 一、构建插件

插件源码位于 `packages/plugin` 目录。构建前需确认依赖已安装。

### 1. 安装项目依赖

在项目根目录执行：

```bash
cd e:\my\warm-ui
npm install
```

执行成功后，项目根目录会生成 `node_modules` 文件夹，所有工作区（含插件）的依赖均安装完成。

### 2. 构建插件

进入插件目录并构建：

```bash
cd packages/plugin
npm run build
```

或使用 npx 直接调用：

```bash
npx vite build
```

构建成功后，`packages/plugin/dist` 目录会生成以下产物：

```
dist/
├── assets/
│   └── popup-CkBYu_nt.css   # 弹出面板样式
├── popup/
│   └── popup.html            # 弹出面板入口
```

### 3. 确认图标文件

插件需要三个图标文件（16px / 48px / 128px），位于 `packages/plugin/icons/` 目录：

```
icons/
├── icon16.png
├── icon48.png
└── icon128.png
```

如果该目录缺失，可运行以下 Node.js 脚本快速生成蓝色占位图标：

```bash
node -e "
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function createPNG(size) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData.writeUInt8(8, 8);
  ihdrData.writeUInt8(2, 9);
  ihdrData.writeUInt8(0, 10);
  ihdrData.writeUInt8(0, 11);
  ihdrData.writeUInt8(0, 12);
  const ihdr = createChunk('IHDR', ihdrData);

  const rawData = [];
  for (let y = 0; y < size; y++) {
    rawData.push(0);
    for (let x = 0; x < size; x++) {
      rawData.push(66, 133, 244);
    }
  }
  const compressed = zlib.deflateSync(Buffer.from(rawData));
  const idat = createChunk('IDAT', compressed);
  const iend = createChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc32(crcData), 0);
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c;
  }
  for (let i = 0; i < buf.length; i++) {
    crc = table[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

const iconsDir = path.join('packages', 'plugin', 'icons');
[16, 48, 128].forEach(size => {
  fs.writeFileSync(path.join(iconsDir, 'icon' + size + '.png'), createPNG(size));
  console.log('Created icon' + size + '.png');
});
"
```

> **提示**：你也可以使用自己设计的图标替换这些占位文件，保持文件名和尺寸一致即可。

---

## 二、安装到 Chrome

### 1. 打开扩展管理页面

在 Chrome 地址栏输入并回车：

```
chrome://extensions/
```

### 2. 开启开发者模式

在页面 **右上角** 找到 **"开发者模式"** 开关，点击开启。

开启后，页面顶部会出现一排工具按钮，包括：

- 加载已解压的扩展程序
- 打包扩展程序
- 其他调试工具

### 3. 加载插件

1. 点击 **"加载已解压的扩展程序"** 按钮
2. 在弹出的文件选择器中，导航到插件目录：
   ```
   e:\my\warm-ui\packages\plugin
   ```
3. **选择该文件夹**（选中 `plugin` 这一级，不是 `packages`）

> **两种加载方式任选其一**：
>
> - **加载源码目录**：直接选择 `packages/plugin`，Chrome 会使用源码运行（需要 content/content.js 等文件就位）
> - **加载构建产物**：如果你希望使用构建后的版本，需要调整 `manifest.json` 中的路径指向 `dist` 目录

### 4. 确认安装成功

加载成功后，你会看到：

- 扩展列表中出现 **"WarmUI 老龄化模拟器"** 卡片
- Chrome 右上角工具栏出现 👁️ 图标
- 卡片状态显示为 **"已启用"**

---

## 三、使用插件

### 基本流程

1. 打开任意网页（如百度、知乎、你自己的项目页面）
2. 点击 Chrome 右上角的 👁️ 图标
3. 在弹出的控制面板中勾选想要模拟的模式
4. 点击 **"应用到当前页面"** 按钮
5. 页面会立即应用模拟效果，你可以在页面上正常操作，感受老年用户的真实体验

### 模拟模式说明

| 类别        | 模式             | 模拟的生理特征     | 对设计的影响                     |
| ----------- | ---------------- | ------------------ | -------------------------------- |
| 👓 **视觉** | 模糊视觉         | 老花眼、白内障早期 | 文字必须足够大，对比度必须足够高 |
| 👓 **视觉** | 黄化视觉         | 晶状体变黄         | 蓝白配色失效，色彩区分困难       |
| 👓 **视觉** | 管状视野         | 周边视野收窄       | 导航栏、侧边栏等边缘信息被忽略   |
| 👓 **视觉** | 对比度下降       | 视觉敏感度降低     | 灰色文字消失，按钮边界模糊       |
| 🖐️ **触觉** | 手抖（页面抖动） | 老年性震颤         | 页面抖动干扰阅读                 |
| 🖐️ **触觉** | 手抖（光标抖动） | 精细运动控制下降   | 精准点击困难                     |
| 🖐️ **触觉** | 精细动作减弱     | 手指灵活性降低     | 小按钮、小间距成为噩梦           |
| 🧠 **认知** | 信息处理变慢     | 反应速度下降       | 操作反馈必须足够慢、足够清晰     |
| 🧠 **认知** | 注意力易分散     | 抑制干扰能力下降   | 广告弹窗、闪烁动效的危害         |
| 🧠 **认知** | 认知降级         | 理解能力下降       | 行业术语、图标隐喻的门槛         |

### 最佳实践

1. **组合体验**：单独开启一种模式感受有限，建议至少组合开启 2-3 种模式（如"模糊视觉 + 手抖 + 信息处理变慢"）
2. **真实场景测试**：在你的项目关键流程（注册、下单、填写表单）中开启模拟，验证完整链路
3. **对比测试**：先关闭所有模拟录制正常操作视频，再开启模拟录制对比视频，向团队展示差异
4. **团队推广**：在 Code Review 或设计评审时打开模拟器，让团队成员亲眼看到问题

---

## 四、常见问题

### 加载时提示"未找到图标"

**原因**：`icons/` 目录缺失图标文件。

**解决**：运行前文 Node.js 脚本生成占位图标，或放入你自己的图标文件。

### 点击工具栏图标后弹窗空白

**原因**：`dist` 目录未构建或构建失败。

**解决**：确保先执行 `npm install`，再执行 `npm run build`。

### 勾选模式并点击"应用"后页面无变化

**原因**：

1. content script 尚未注入
2. 浏览器权限受限（如 `chrome://` 等内部页面）

**解决**：

- **刷新当前页面**后重试
- 确保不是 Chrome 内部页面（如 `chrome://extensions/`、`chrome://settings/`）

### 模拟效果在页面跳转后消失

**原因**：Chrome 在每个新页面加载时会重新注入 content script。

**解决**：这是正常现象。每次进入新页面后需重新点击 👁️ 并应用模拟模式。

### 想移除插件

在 `chrome://extensions/` 中找到 "WarmUI 老龄化模拟器"，点击 **"移除"** 即可。

---

## 五、打包分发

如果需要将插件打包成 `.crx` 文件分发给团队成员：

```bash
# 1. 构建
cd packages/plugin
npm run build

# 2. 在 chrome://extensions/ 中点击"打包扩展程序"
# 3. "扩展程序根目录"选择 packages/plugin/dist
# 4. 点击"打包扩展程序"，生成 .crx 文件
```

---

## 模拟模式对照表

| 类别    | 操作         | 输入框 ID               |
| ------- | ------------ | ----------------------- |
| 👓 视觉 | 模糊视觉     | `vision-blur`           |
| 👓 视觉 | 黄化视觉     | `vision-yellow`         |
| 👓 视觉 | 管状视野     | `vision-tunnel`         |
| 👓 视觉 | 对比度下降   | `vision-contrast`       |
| 🖐️ 触觉 | 手抖（页面） | `motor-tremor`          |
| 🖐️ 触觉 | 手抖（光标） | `motor-tremor-cursor`   |
| 🖐️ 触觉 | 精细动作减弱 | `motor-reduced`         |
| 🧠 认知 | 信息处理变慢 | `cognitive-speed`       |
| 🧠 认知 | 注意力易分散 | `cognitive-distraction` |
| 🧠 认知 | 认知降级     | `cognitive-degrade`     |
