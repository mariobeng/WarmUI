<template>
  <warm-speech
    :text="text"
    :mode="mode"
    :lang="lang"
    :rate="rate"
  >
    <slot />
  </warm-speech>
</template>

<script setup>
defineProps({
  text: String,
  mode: {
    type: String,
    default: 'text'
  },
  lang: {
    type: String,
    default: 'zh-CN'
  },
  rate: {
    type: Number,
    default: 0.9
  }
})
</script>
