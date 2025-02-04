<script setup lang="ts">
defineProps<{
  label: string
  value: string | number
}>()
</script>

<template>
  <div class="flex items-center justify-between py-2">
    <dt class="font-medium">{{ label }}</dt>
    <dd>{{ value }}</dd>
  </div>
</template>

<style scoped>

</style>