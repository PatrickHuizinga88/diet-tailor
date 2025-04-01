<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import {Toaster} from "~/components/ui/toast";
import NavBar from "~/components/layout/NavBar.vue";

const toastStore = useToastStore();
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))"/>

  <main class="h-svh flex flex-col">
    <Header :wide="true"/>

    <div class="flex-1 pt-8">
      <slot/>
    </div>

<!--    <NavBar class="md:hidden sticky bottom-0"/>-->
  </main>

  <Toaster :toasts="toastStore.toasts"/>

</template>