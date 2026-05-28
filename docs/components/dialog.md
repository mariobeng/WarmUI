# Dialog 对话框

温和的对话框组件，适老化防误触设计。

## 基础用法

```html
<warm-dialog id="myDialog" close-on-overlay>
  <span slot="header">提示</span>
  <p>确认要退出吗？</p>
  <span slot="footer">
    <warm-button>取消</warm-button>
    <warm-button elder-friendly>确认退出</warm-button>
  </span>
</warm-dialog>
<warm-button onclick="document.getElementById('myDialog').open()">
  打开对话框
</warm-button>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `open` | `boolean` | `false` | 是否显示 |
| `close-on-overlay` | `boolean` | `false` | 点击遮罩是否关闭 |

| 方法 | 说明 |
|------|------|
| `open()` | 打开对话框 |
| `close()` | 关闭对话框 |

| 事件 | 说明 |
|------|------|
| `warm-dialog-open` | 对话框打开时触发 |
| `warm-dialog-close` | 对话框关闭时触发 |
