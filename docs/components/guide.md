# Guide 引导提示

为用户提供温和的操作引导。支持浮层模式和呼吸动画高亮光圈。

## 基础用法

```html
<warm-guide>接下来请填写您的身份信息</warm-guide>
```

## 浮层模式（覆写全屏）

```html
<warm-guide overlay target="#nextBtn" voice="false">
  您办完这个业务，点这个橘色按钮就能完成。
</warm-guide>
```

## 浮层+目标高亮

```html
<warm-guide id="myGuide" overlay target="#submitBtn">
  点这个蓝色按钮提交。
</warm-guide>
<script>
  setTimeout(() => {
    document.getElementById("myGuide").showWithTarget("#submitBtn");
  }, 1000);
</script>
```

## API

| 属性      | 类型                | 默认值   | 说明               |
| --------- | ------------------- | -------- | ------------------ |
| `overlay` | `boolean`           | `false`  | 启用浮层模式       |
| `target`  | `string`            | —        | 高亮目标元素选择器 |
| `voice`   | `'true' \| 'false'` | `'true'` | 是否语音朗读       |

| 方法                       | 说明               |
| -------------------------- | ------------------ |
| `showWithTarget(selector)` | 显示浮层并高亮目标 |
| `dismiss()`                | 关闭引导           |

| 事件                 | 说明           |
| -------------------- | -------------- |
| `warm-guide-dismiss` | 引导关闭时触发 |
