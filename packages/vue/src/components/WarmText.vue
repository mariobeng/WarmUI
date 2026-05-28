<template>
  <warm-text
    :size="size"
    :plain="plain ? '' : undefined"
  >
    <slot />
  </warm-text>
</template>

<script setup>
defineProps({
  size: {
    type: String,
    default: 'normal'
  },
  plain: {
    type: Boolean,
    default: false
  }
})
</script>
