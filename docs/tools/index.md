# 一键合规检查

集成到浏览器或 CI/CD 流程中，自动检查无障碍合规问题。

## 使用方法

```js
import { runAccessibilityCheck, formatReport } from '@warm-ui/components';

const report = await runAccessibilityCheck();
console.log(formatReport(report));
```

## 检查项目

| 规则 | 严重级别 | 说明 |
|------|---------|------|
| `touch-target-size` | 错误 | 可点击区域 ≥44x44dp |
| `contrast-ratio` | 错误 | 对比度 ≥4.5:1 |
| `alt-text` | 警告 | 图片是否有替代文本 |
| `age-discrimination` | 错误 | 是否存在年龄歧视逻辑 |
