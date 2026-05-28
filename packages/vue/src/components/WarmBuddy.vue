<template>
  <warm-buddy ref="buddyRef">
    <slot />
  </warm-buddy>
</template>

<script setup>
import { ref } from 'vue'

const buddyRef = ref(null)

function highlightTarget(selector, speech) {
  buddyRef.value?.highlightTarget(selector, speech)
}

function clearHighlight() {
  buddyRef.value?.clearHighlight()
}

defineExpose({ highlightTarget, clearHighlight })
</script>
