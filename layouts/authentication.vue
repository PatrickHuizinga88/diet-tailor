<script setup lang="ts">
import {Toaster} from "~/components/ui/toast";

defineProps<{
  title?: string
  description?: string
}>()

const toastStore = useToastStore()
</script>

<template>
  <div class="min-h-svh flex flex-col">
    <img src="~/assets/images/logo.svg" alt="Logo" class="mx-auto h-7 w-auto mt-8">

    <div class="flex-1 flex flex-col justify-center py-12">

      <div class="sm:mx-auto sm:w-full sm:max-w-sm text-center px-6 sm:px-0 sm:mb-6 md:mb-10">
        <transition
            enter-active-class="duration-500 delay-100"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-1 translate-y-none"
            appear
        >
          <div>
            <h1 v-if="title" class="text-center text-3xl sm:text-4xl font-bold">{{ title }}</h1>
            <p v-if="description" class="text-sm text-muted-foreground mt-2">{{ description }}</p>
          </div>
        </transition>
      </div>

      <div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
        <transition
            enter-active-class="duration-500 delay-200"
            enter-from-class="opacity-0 translate-y-2"
            enter-to-class="opacity-1 translate-y-none"
            appear
        >
          <div class="bg-background sm:bg-card sm:border px-6 py-8 gradient-shadows sm:rounded-xl sm:px-8">
            <slot/>
          </div>
        </transition>
      </div>

      <transition
          enter-active-class="duration-500 delay-300"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-1 translate-y-none"
          appear
      >
        <div class="sm:mt-6 md:mt-10 text-center text-sm text-muted-foreground">
          <slot name="footer"/>
        </div>
      </transition>

      <img src="../assets/images/logo.svg" alt="" aria-hidden="true" class="fixed left-1/2 -translate-x-1/2 bottom-0 translate-y-3/4 w-screen max-w-2xl aspect-square opacity-[4%] -z-10"/>
    </div>
  </div>

  <Toaster :toasts="toastStore.toasts"/>

</template>

<style scoped>

</style>