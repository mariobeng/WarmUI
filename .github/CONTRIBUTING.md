# 贡献指南

感谢你对 WarmUI 的关注！我们特别欢迎非技术背景的贡献者参与——设计师、社工、老人家属，只要你有心让科技更温暖，你的声音都非常宝贵。

## 🌟 我能贡献什么？

### 设计师 / UX 研究者
- 提交适老化设计建议
- 分享用户研究成果
- 改进组件的交互和视觉
- 提供无障碍设计最佳实践

### 社工 / 老年服务者
- 分享老年人使用数字产品的真实痛点
- 提出使用场景建议
- 帮助测试和反馈
- 连接老年用户群体

### 老人家属
- 提出家人的实际需求
- 分享使用场景和案例
- 建议新的组件方向
- 帮助测试新功能

### 开发者
- 提交代码和 Bug 修复
- 完善文档和示例
- 帮助测试和 Code Review
- 添加新的组件功能

### 文档翻译
- 帮助翻译英文文档
- 改进文档可读性
- 添加更多示例代码

## 🚀 如何贡献

### 提交 Issue

如果你发现 Bug、有建议或想法，欢迎提交 Issue：

1. 在 [Issues](https://github.com/mariobeng/WarmUI/issues) 页面点击 "New Issue"
2. 选择合适的模板（Bug 报告 / 功能建议 / 问题讨论）
3. 填写详细信息

**好的 Issue 应该包含**：
- 清晰的标题
- 问题的详细描述
- 复现步骤（如果是 Bug）
- 期望的行为
- 截图或 GIF（如果适用）

### 提交 Pull Request

1. **Fork 本仓库**
   ```bash
   git clone https://github.com/你的用户名/WarmUI.git
   cd WarmUI
   ```

2. **创建特性分支**
   ```bash
   git checkout -b feature/你的特性名称
   # 或
   git checkout -b fix/你要修复的问题
   ```

3. **进行更改**
   - 遵循项目的代码风格
   - 添加必要的注释
   - 更新相关文档

4. **提交更改**
   ```bash
   git add .
   git commit -m "feat: 添加某某功能"
   # 或
   git commit -m "fix: 修复某某问题"
   ```

   **提交信息格式**：
   - `feat:` 新功能
   - `fix:` Bug 修复
   - `docs:` 文档更新
   - `style:` 代码格式调整
   - `refactor:` 代码重构
   - `test:` 测试相关
   - `chore:` 构建/工具相关

5. **推送到你的 Fork**
   ```bash
   git push origin feature/你的特性名称
   ```

6. **创建 Pull Request**
   - 在 GitHub 上打开你的 Fork
   - 点击 "New Pull Request"
   - 填写 PR 描述，说明更改内容和原因

## 📁 项目结构

```
warm-ui/
├── packages/
│   ├── components/     # 核心 Web Components
│   ├── react/          # React 封装
│   ├── vue/            # Vue 封装
│   ├── plugin/         # 老龄化模拟器插件
│   └── elder-plugin/   # 适老化助手插件
├── docs/               # VitePress 文档
├── demo/               # 演示页面
└── stories/            # 组件故事文档
```

## 🎨 代码风格

- 使用 2 空格缩进
- 使用 ES6+ 语法
- 组件使用 Web Components 标准
- 添加必要的注释

## 📝 文档规范

- 使用 Markdown 格式
- 中文文档使用简体中文
- 英文文档使用美式英语
- 代码示例添加注释

## ✅ 行为准则

- 尊重每一位贡献者
- 保持友善和包容
- 关注用户需求而非技术实现
- 欢迎不同背景的参与者

## 🙋 需要帮助？

如果你在贡献过程中遇到任何问题，可以：

- 在 [Discussions](https://github.com/mariobeng/WarmUI/discussions) 发起讨论
- 在 Issue 中提问
- 查看现有文档和代码示例

---

再次感谢你的贡献！每一个建议、每一个修复、每一份文档改进，都能让 WarmUI 帮助到更多的老年人。❤️
