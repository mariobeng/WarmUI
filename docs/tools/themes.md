# 高对比度动态配色系统

预设多套色弱适配主题，一键切换。

## 使用方式

```js
import { applyTheme, getAvailableThemes } from '@warm-ui/components';

// 切换为红绿色盲主题
applyTheme('deuteranopia');

// 获取可选主题列表
const themes = getAvailableThemes();
```

## 预设主题

| 主题 ID | 名称 | 适用人群 |
|---------|------|---------|
| `default` | 默认主题 | 正常视觉 |
| `deuteranopia` | 红绿色盲（绿色弱） | 绿色弱视 |
| `protanopia` | 红绿色盲（红色弱） | 红色弱视 |
| `tritanopia` | 蓝黄色盲 | 蓝黄色盲 |
| `high-contrast` | 高对比度 | 低视力 |
