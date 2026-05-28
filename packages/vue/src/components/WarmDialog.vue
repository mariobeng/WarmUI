<template>
  <warm-dialog
    :open="open ? '' : undefined"
    :close-on-overlay="closeOnOverlay ? 'true' : 'false'"
    ref="dialogRef"
  >
    <span slot="header">
      <slot name="header" />
    </span>
    <slot />
    <span slot="footer">
      <slot name="footer" />
    </span>
  </warm-dialog>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  closeOnOverlay: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits(['close'])
const dialogRef = ref(null)

function onClose() {
  emit('close')
}

watch(() => props.open, (val) => {
  const el = dialogRef.value
  if (!el) return
  if (val) {
    el.open()
  } else {
    el.close()
  }
})

onMounted(() => {
  const el = dialogRef.value
  if (el) {
    el.addEventListener('warm-dialog-close', onClose)
  }
})

onBeforeUnmount(() => {
  const el = dialogRef.value
  if (el) {
    el.removeEventListener('warm-dialog-close', onClose)
  }
})
</script>
