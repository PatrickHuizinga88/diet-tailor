<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))"/>
  <Header/>

  <div class="h-svh">
    <slot/>
  </div>

</template>