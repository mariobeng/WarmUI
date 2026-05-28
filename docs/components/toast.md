# Toast 轻提示

温和的全局消息提示。

## 基础用法

```html
<warm-toast id="myToast">操作成功！</warm-toast>
<warm-button onclick="document.getElementById('myToast').show()">
  显示提示
</warm-button>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `show` | `boolean` | `false` | 是否显示 |
| `type` | `'success' \| 'error'` | — | 提示类型 |

| 方法 | 说明 |
|------|------|
| `show(duration)` | 显示提示，`duration` 为显示时长（毫秒） |
| `hide()` | 隐藏提示 |
