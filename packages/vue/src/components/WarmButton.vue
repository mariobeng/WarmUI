<template>
  <warm-button
    :elder-friendly="elderFriendly ? '' : undefined"
    :disabled="disabled ? '' : undefined"
  >
    <slot />
  </warm-button>
</template>

<script setup>
defineProps({
  elderFriendly: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
</script>
