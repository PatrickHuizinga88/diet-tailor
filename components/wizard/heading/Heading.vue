<script setup lang="ts">
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  class?: HTMLAttributes['class']
}>()
</script>

<template>
  <section id="heading" :class="cn('mb-8', props.class)">
    <slot/>
  </section>
</template>

<style scoped>

</style>