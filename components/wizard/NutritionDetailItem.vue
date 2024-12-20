<script setup lang="ts">
defineProps<{
  label: string
  amount: number
  unit: string
}>()
</script>

<template>
  <div class="flex items-center justify-between py-2">
    <dt class="font-medium">{{ label }}</dt>
    <dd>{{ amount }} {{ unit }}</dd>
  </div>
</template>

<style scoped>

</style>