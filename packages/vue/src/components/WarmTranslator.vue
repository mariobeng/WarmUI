<template>
  <warm-translator
    :translation="translation"
    :original="original"
  >
    <slot />
  </warm-translator>
</template>

<script setup>
defineProps({
  translation: String,
  original: String
})
</script>
