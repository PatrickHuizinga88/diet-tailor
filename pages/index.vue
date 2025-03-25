<script setup lang="ts">
import {ArrowRight, ExternalLink} from "lucide-vue-next";

definePageMeta({
  layout: 'wizard',
  middleware: 'landing'
})

const steps = [
  {
    title: "Tell us about yourself",
    description: "Tell us about your goals, preferences, and dietary restrictions."
  },
  {
    title: "Get your meal plan",
    description: "Get a personalized meal plan tailored just for you."
  },
  {
    title: "Start eating",
    description: "Start eating healthy and reach your goals."
  }
]
</script>

<template>
  <LayoutContainer>
    <section id="hero" class="text-center mb-12">
      <h1 class="mb-3">Create Your Personalized Meal Plan in Minutes!</h1>
      <p class="text-lg text-muted-foreground">Tell us your goals and preferences, and get a meal plan tailored just for
        you.</p>
      <div class="grid sm:grid-cols-1 gap-3 w-full mt-8">
        <Button class="group w-full" size="lg" asChild>
          <NuxtLink to="/wizard">
            Let's get started
            <ArrowRight class="size-5 group-hover:translate-x-0.5 duration-200"/>
          </NuxtLink>
        </Button>
<!--        <Button class="group w-full" variant="outline" size="lg">-->
<!--          More about DietTailor-->
<!--          <ExternalLink class="size-5 group-hover:scale-105 duration-200"/>-->
<!--        </Button>-->
      </div>
    </section>
    <section id="steps" class="mb-8">
      <h2 class="h3 text-center text-primary-dark mb-4">How It Works</h2>
      <ol class="space-y-2">
        <li v-for="(step, index) in steps" class="bg-muted rounded-lg p-4 flex">
          <div class="flex items-center justify-center shrink-0 h4 text-primary-dark bg-background rounded size-8 mr-4">
            {{ index + 1 }}
          </div>
          <div>
            <h3 class="h4 mb-1">{{ step.title }}</h3>
            <p>
              {{ step.description }}
            </p>
          </div>
        </li>
      </ol>
    </section>
  </LayoutContainer>
</template>