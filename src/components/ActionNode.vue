<script setup>
import { computed } from 'vue'
import { Position, Handle } from '@vue-flow/core'

// Node class for special buttons

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  data: {
    type: Object,
    required: true,
  },
})

const x = computed(() => `${Math.round(props.position.x)}px`)
const y = computed(() => `${Math.round(props.position.y)}px`)
</script>

<template>
  <div>
    <p>{{ props.data.label }}</p>
  </div>
</template>