<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="authentication" :title="$t('authentication.common.sign_in')">
    <Login/>
  </NuxtLayout>
</template>

<style scoped>

</style>