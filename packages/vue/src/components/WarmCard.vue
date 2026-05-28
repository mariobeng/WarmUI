<template>
  <warm-card
    :highlight="highlight ? '' : undefined"
  >
    <slot />
  </warm-card>
</template>

<script setup>
defineProps({
  highlight: {
    type: Boolean,
    default: false
  }
})
</script>
