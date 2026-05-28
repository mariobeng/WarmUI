# Praise 完成夸赞微动效

老人完成任务后，用温暖的方式给予正反馈。

## 基础用法

```html
<warm-praise id="myPraise"></warm-praise>
<warm-button onclick="document.getElementById('myPraise').show()">
  完成任务
</warm-button>
```

## 自定义消息

```html
<warm-praise id="myPraise2">
  <span slot="message">太棒了！您成功挂上了号！</span>
  <span slot="sub">明天记得按时去医院哦 😊</span>
</warm-praise>
```

## API

| 属性 | 类型 | 说明 |
|------|------|------|
| `show` | `boolean` | 是否显示 |
| `message` | `string` | 自定义主消息 |
| `voice` | `'true' \| 'false'` | 是否播放语音鼓励 |

| 方法 | 说明 |
|------|------|
| `show(index)` | 显示夸赞（可指定消息索引） |
| `hide()` | 隐藏 |
