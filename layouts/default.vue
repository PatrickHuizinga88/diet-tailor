<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
</script>

<template>
  <NuxtLoadingIndicator color="#40AD76"/>
  <Header/>

  <div class="h-svh pt-[calc(64px+var(--header-height))] overflow-y-auto">
    <LayoutContainer class="h-full pb-4">
      <slot/>
    </LayoutContainer>
  </div>
</template>