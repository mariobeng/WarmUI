# 快速开始

## 安装

```bash
npm install @warm-ui/components
```

## 使用

```js
import '@warm-ui/components';
```

然后在 HTML 中直接使用：

```html
<warm-button elder-friendly>确认挂号</warm-button>
```

## 在 React 中使用

```bash
npm install @warm-ui/react
```

```jsx
import { WarmButton } from '@warm-ui/react';

function App() {
  return <WarmButton elderFriendly>确认挂号</WarmButton>;
}
```

## 在 Vue 中使用

```bash
npm install @warm-ui/vue
```

```vue
<template>
  <WarmButton elderFriendly>确认挂号</WarmButton>
</template>

<script setup>
import { WarmButton } from '@warm-ui/vue';
</script>
```
