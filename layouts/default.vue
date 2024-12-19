<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
</script>

<template>
  <NuxtLoadingIndicator color="#4f46e5"/>
  <Header/>

  <div class="h-[calc(100svh-var(--header-height))] pt-[72px] overflow-y-auto">
    <div class="container h-full pb-4">
      <slot/>
    </div>
  </div>
</template>