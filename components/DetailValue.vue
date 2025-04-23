<script setup lang="ts">
const props = defineProps<{
  title: string,
  value?: string
}>()
</script>

<template>
  <div class="flex justify-between items-center gap-x-6 odd:bg-muted rounded p-3">
    <dt>{{ props.title }}</dt>
    <dd class="font-medium text-right">{{ props.value || '-' }}</dd>
  </div>
</template>

<style scoped>

</style>