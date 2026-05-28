<template>
  <warm-praise
    :show="show ? '' : undefined"
    :message="message"
    ref="praiseRef"
  >
    <template #message>
      <slot name="message" />
    </template>
    <template #sub>
      <slot name="sub" />
    </template>
  </warm-praise>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  message: String,
  messageIndex: Number
})

const praiseRef = ref(null)

watch(() => props.show, (val) => {
  const el = praiseRef.value
  if (!el) return
  if (val) {
    el.show(props.messageIndex)
  } else {
    el.hide()
  }
})
</script>
