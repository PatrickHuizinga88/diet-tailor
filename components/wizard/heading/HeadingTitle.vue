<script setup lang="ts">
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <h2 id="heading-title" :class="cn('font-bold', props.class)">
    <slot/>
  </h2>
</template>