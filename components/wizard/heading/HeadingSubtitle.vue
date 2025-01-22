<script setup lang="ts">
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h1 :class="cn('text-base font-medium font-sans text-primary-dark', props.class)">
    <slot/>
  </h1>
</template>