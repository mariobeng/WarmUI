# Card 卡片

适老化卡片容器，提供内容分组和视觉焦点引导。

## 基础用法

```html
<warm-card>
  <h3>今日健康提醒</h3>
  <p>记得按时服药</p>
</warm-card>
<warm-card highlight>
  <h3>重要通知</h3>
  <p>医保年度报销即将截止</p>
</warm-card>
```

## API

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `highlight` | `boolean` | `false` | 高亮模式（边框变色） |
