<script setup lang="ts">
import {Toaster} from "~/components/ui/toast";

const toastStore = useToastStore();
</script>

<template>
  <div class="min-h-screen flex flex-col justify-center px-6 py-12 lg:px-8">
    <slot/>
  </div>

  <Toaster :toasts="toastStore.toasts" />

</template>

<style>

</style>