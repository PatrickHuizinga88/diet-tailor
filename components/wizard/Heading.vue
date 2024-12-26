<script setup lang="ts">
const props = defineProps<{
  heading: string
  subheading?: string
  description?: string
  formFieldType?: 'input' | 'radio' | 'checkbox'
}>()

const description = computed(() => {
  if (props.formFieldType === 'radio') {
    return 'Select one of the options below.'
  }

  if (props.formFieldType === 'checkbox') {
    return 'Select one of more of the options below.'
  }
})
</script>

<template>
  <section id="heading" class="mb-10">
    <h1 class="text-base font-medium font-sans text-primary-dark">{{subheading}}</h1>
    <h2 id="heading-title" class="h1 mt-2">{{heading}}</h2>
    <p v-if="description" class="text-lg text-muted-foreground mt-2">{{description}}</p>
  </section>
</template>

<style scoped>

</style>