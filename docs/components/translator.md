# Translator 大白话翻译器

把复杂文案转为老人能听懂的语言。

## 基础用法

```html
<warm-translator translation="就是让你确认一下，你是本人">
  请您核实身份信息以确保账户安全。
</warm-translator>
```

## 自动翻译

不指定翻译内容时，长按或悬停会自动调用翻译 API。

```html
<warm-translator>
  请您提交申请后等待审核结果。
</warm-translator>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `translation` | `string` | — | 大白话翻译结果 |
| `original` | `string` | — | 原文（默认取 slot 内容） |
