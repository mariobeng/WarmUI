# Button 按钮

适老化增强按钮，支持大触控区、防抖操作和可配置容差区域。

## 基础用法

```html
<warm-button>普通按钮</warm-button>
<warm-button elder-friendly>适老化按钮</warm-button>
```

## 自定义防抖和容差

```html
<!-- 防抖延迟 500ms，触控容差 16px -->
<warm-button elder-friendly debounce-delay="500" tolerance="16">
  安全提交
</warm-button>
```

## API

| 属性             | 类型      | 默认值         | 说明               |
| ---------------- | --------- | -------------- | ------------------ |
| `elder-friendly` | `boolean` | `false`        | 启用大触控区和防抖 |
| `debounce-delay` | `number`  | `300` (适老化) | 防抖延迟（毫秒）   |
| `tolerance`      | `number`  | `12` (适老化)  | 触控容差区域（px） |
| `disabled`       | `boolean` | `false`        | 禁用状态           |

| 事件         | 说明                   |
| ------------ | ---------------------- |
| `warm-click` | 点击事件（防抖处理后） |
