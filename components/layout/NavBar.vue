<script setup lang="ts">
import {Calendar, Home, SlidersHorizontal} from "lucide-vue-next";

const navigation = [
  {
    title: 'Home',
    icon: Home,
    to: '/dashboard'
  },
  // {
  //   title: 'Meal Plan',
  //   icon: Calendar,
  //   to: '/meal-plan'
  // },
  {
    title: 'Preferences',
    icon: SlidersHorizontal,
    to: '/preferences'
  }
]
</script>

<template>
  <div class="shrink-0 w-full h-[var(--navbar-height)] bg-background border-t border-border z-20">
    <div class="grid grid-cols-2 h-full max-w-lg mx-auto font-medium text-xs">
      <NuxtLink v-for="item in navigation" :to="item.to"
                class="inline-flex flex-col items-center justify-center gap-y-1 px-5 opacity-50"
                activeClass="!opacity-100 font-semibold"
      >
        <component :is="item.icon" class="size-5"/>
        {{ item.title }}
      </NuxtLink>
    </div>
  </div>
</template>

<style>
:root {
  --navbar-height: 64px;
}
</style>