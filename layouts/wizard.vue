<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import {Toaster} from "~/components/ui/toast";

definePageMeta({
  middleware: 'auth'
})

const toastStore = useToastStore();

onMounted(() => {
  if (process.env.NODE_ENV === 'production') {
    window.addEventListener('beforeunload', (event) => {
      event.preventDefault();
      event.returnValue = true;
    });
  }
})
</script>

<template>
  <NuxtLoadingIndicator color="var(--color-primary)"/>

  <div class="h-svh flex flex-col">
    <Header/>

    <div class="flex-1 pt-8">
      <slot/>
    </div>
  </div>

  <Toaster :toasts="toastStore.toasts"/>

</template>