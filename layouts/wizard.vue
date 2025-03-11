<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import {Toaster} from "~/components/ui/toast";

const toastStore = useToastStore();
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))"/>

  <div class="h-svh flex flex-col">
    <Header/>

    <div class="h-[calc(100svh-var(--header-height))] flex-1 pt-10">
      <slot/>
    </div>
  </div>

  <Toaster :toasts="toastStore.toasts" />

</template>