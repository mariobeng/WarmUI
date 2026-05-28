# Buddy 老友模式

远程协助组件，让子女安全地帮助老人。

## 基础用法

```html
<warm-buddy id="myBuddy"></warm-buddy>
```

## 在支架应用中集成

```html
<warm-buddy id="myBuddy"></warm-buddy>
<script>
  const buddy = document.getElementById('myBuddy');
  // 监听到连接后，在帮手端高亮指引
  buddy.addEventListener('warm-buddy-connected', () => {
    buddy.highlightTarget('#submitBtn', '点这个蓝色按钮完成支付');
  });
</script>
```

## API

| 事件 | 说明 |
|------|------|
| `warm-buddy-code` | 安全码生成时触发 |
| `warm-buddy-connected` | 连接成功时触发 |
| `warm-buddy-disconnected` | 断开连接时触发 |

| 方法 | 说明 |
|------|------|
| `highlightTarget(selector, speech)` | 在老人屏幕上高亮目标并语音说明 |
| `clearHighlight()` | 清除高亮 |
