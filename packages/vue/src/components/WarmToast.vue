<template>
  <warm-toast
    :type="type"
    :show="show ? '' : undefined"
    ref="toastRef"
  >
    <slot />
  </warm-toast>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: ''
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const toastRef = ref(null)

watch(() => props.show, (val) => {
  const el = toastRef.value
  if (!el) return
  if (val) {
    el.show(props.duration)
  } else {
    el.hide()
  }
})
</script>
