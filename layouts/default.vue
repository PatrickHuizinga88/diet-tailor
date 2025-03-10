<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import {Toaster} from "~/components/ui/toast";

const toastStore = useToastStore();
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))"/>
  <Header/>

  <div class="h-svh">
    <slot/>
  </div>

  <Toaster :toasts="toastStore.toasts" />

</template>