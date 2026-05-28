# Text 文字

适老化文字组件，支持语义级别字号和"大白话"简化文案模式。

## 基础用法

```html
<warm-text size="heading">标题文字</warm-text>
<warm-text size="body">正文文字</warm-text>
<warm-text size="button">按钮文字</warm-text>
<warm-text size="caption">辅助说明</warm-text>
<warm-text size="large">大号文字</warm-text>
```

## 大白话模式

```html
<warm-text plain>简化后的文案，更易懂</warm-text>
```

## 级别缩放

```html
<warm-text size="body" level="2">二级缩放（level 每级放大 8%）</warm-text>
```

## API

| 属性    | 类型                                                                  | 默认值   | 说明                   |
| ------- | --------------------------------------------------------------------- | -------- | ---------------------- |
| `size`  | `'heading' \| 'body' \| 'button' \| 'caption' \| 'large' \| 'normal'` | `'body'` | 语义字号级别           |
| `level` | `number`                                                              | —        | 额外缩放级别 (每级+8%) |
| `plain` | `boolean`                                                             | `false`  | 启用白话模式           |
