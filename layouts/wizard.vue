<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import {Toaster} from "~/components/ui/toast";

const toastStore = useToastStore();
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))"/>

  <div class="h-svh flex flex-col">
    <Header/>

    <div class="flex-1 pt-8">
      <slot/>
    </div>
  </div>

  <Toaster :toasts="toastStore.toasts" />

</template>