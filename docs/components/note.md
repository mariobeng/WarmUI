# Note 家人便签

让家人在应用内留下温馨提醒，支持远程便签系统。

## 基础用法

```html
<warm-note>
  明天上午 10 点记得去医院复查哦！
  <span slot="author">小明</span>
</warm-note>
```

## 便签类型

```html
<warm-note type="reminder">提醒类型</warm-note>
<warm-note type="tip">提示类型</warm-note>
<warm-note type="warning">注意类型</warm-note>
<warm-note type="encourage">鼓励类型</warm-note>
```

## 可关闭便签

```html
<warm-note dismissable note-id="note1">
  这是一条可以关闭的通知
  <span slot="author">管理员</span>
</warm-note>
```

## 远程便签（子女端使用）

```js
// 子女端保存便签（例如话费充值页面）
WarmNote.saveRemoteNote("bill-reminder", {
  content: "妈，点这里充100就行，别选200的套餐",
  author: "女儿",
});

// 老人端自动加载
// <warm-note remote note-id="bill-reminder">
// 便签内容会自动从 localStorage 加载
// </warm-note>
```

## API

| 属性          | 类型                                              | 说明                       |
| ------------- | ------------------------------------------------- | -------------------------- |
| `type`        | `'reminder' \| 'tip' \| 'warning' \| 'encourage'` | 便签类型                   |
| `time`        | `string`                                          | 显示时间                   |
| `note-id`     | `string`                                          | 便签唯一 ID                |
| `remote`      | `string`                                          | 远程模式（加载存储的便签） |
| `dismissable` | `boolean`                                         | 是否可关闭                 |

| 静态方法                            | 说明             |
| ----------------------------------- | ---------------- |
| `WarmNote.saveRemoteNote(id, data)` | 保存远程便签     |
| `WarmNote.listRemoteNotes()`        | 列出所有远程便签 |
