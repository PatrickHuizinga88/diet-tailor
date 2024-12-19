<script setup lang="ts">
import {ArrowRight, ExternalLink} from "lucide-vue-next";

definePageMeta({
  layout: 'default'
})
</script>

<template>
  <section id="hero" class="text-center">
    <h1 class="mb-3">Create Your Personalized Meal Plan in Minutes!</h1>
    <p class="text-lg text-muted-foreground">Tell us your goals and preferences, and get a meal plan tailored just for you.</p>
  </section>
  <section id="steps">

  </section>
  <div class="fixed left-0 bottom-8 w-full px-4">
    <Button class="group w-full shadow-2xl mb-4" size="lg" asChild>
      <NuxtLink to="/wizard">
        Let's get Started
        <ArrowRight class="size-5 ml-2 group-hover:translate-x-0.5 duration-200" />
      </NuxtLink>
    </Button>
    <Button class="group w-full shadow-2xl" variant="outline" size="lg">
      More about DietTailor
      <ExternalLink class="size-5 ml-2 group-hover:scale-105 duration-200" />
    </Button>
  </div>
</template>