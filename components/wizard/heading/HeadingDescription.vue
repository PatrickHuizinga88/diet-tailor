<script setup lang="ts">
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <p :class="cn('text-lg text-muted-foreground mt-2', props.class)">
    <slot/>
  </p>
</template>