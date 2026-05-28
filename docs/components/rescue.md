# Rescue 迷路救援

当用户迷失时提供温和的引导支持。支持悬浮按钮、语音输入和 AI 导航。

## 基础用法

```html
<warm-rescue>
  <warm-button>返回首页</warm-button>
  <warm-button>求助家人</warm-button>
</warm-rescue>
```

## 悬浮模式（固定在角落）

当 `float` 属性启用时，组件会变成右下角的圆形浮动按钮。

```html
<warm-rescue
  float
  pages='[{"name":"首页","keywords":["首页","回去"]},{"name":"挂号","keywords":["挂号","看病","预约"]}]'
>
  <span slot="page">挂号页面</span>
  <warm-button>返回首页</warm-button>
</warm-rescue>
```

## 语音导航

在 `float` 模式下点击展开，点击"🎤 用语音告诉我您要找什么"，对着麦克风说出想找的内容，组件会自动匹配页面。

```html
<warm-rescue
  float
  pages='[{"name":"查询账单","keywords":["账单","查费","多少钱"]}]'
>
</warm-rescue>
```

## API

| 属性    | 类型            | 默认值  | 说明                             |
| ------- | --------------- | ------- | -------------------------------- |
| `float` | `boolean`       | `false` | 启用悬浮按钮模式                 |
| `pages` | `string` (JSON) | —       | 可用页面列表（用于语音导航匹配） |

| 方法         | 说明         |
| ------------ | ------------ |
| `expand()`   | 展开悬浮模式 |
| `collapse()` | 收起悬浮模式 |

| 事件                   | 说明                     |
| ---------------------- | ------------------------ |
| `warm-rescue-navigate` | 语音匹配到目标页面时触发 |
