# Speech 语音朗读

不仅仅是 TTS，而是能把页面结构"读"出来。

## 基础用法

```html
<warm-speech text="您好，欢迎使用">
  朗读欢迎语
</warm-speech>
```

## 页面大纲模式

自动分析页面标题结构，生成自然语言大纲并朗读。

```html
<warm-speech mode="outline">
  朗读页面结构
</warm-speech>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `text` | `string` | — | 要朗读的文字 |
| `mode` | `'text' \| 'outline'` | `'text'` | 朗读模式 |
| `lang` | `string` | `'zh-CN'` | 语言 |
| `rate` | `number` | `0.9` | 语速 |
