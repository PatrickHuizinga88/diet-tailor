<script setup lang="ts">
import {ArrowDown} from "lucide-vue-next";
import stepOneImage from "../assets/images/how-it-works/step-1.webp";
import stepTwoImage from "../assets/images/how-it-works/step-2.webp";

definePageMeta({
  middleware: 'auth'
})

const steps = [
  {
    image: stepOneImage,
    title: "Tell us about yourself",
    description: "Tell us about your dietary needs, goals, and favorite foods so we can customize your plan."
  },
  {
    image: stepTwoImage,
    title: "Get Your Personalized Plan",
    description: "Receive a fully personalized weekly meal plan, generated instantly by AI."
  },
  {
    image: '',
    title: "Enjoy & Adjust",
    description: "Easily swap meals, explore new recipes, and fine-tune your plan anytime."
  }
]
</script>

<template>
  <div class="container">
    <section id="hero" class="flex flex-col items-center max-w-3xl text-center mx-auto mb-24 sm:mb-40 mt-8">
      <h1 class="mb-8">Personalized Meal Plans, Tailored to <span
          class="bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary">Your</span>
        Preferences</h1>
      <p class="text-lg">Get a customized daily meal plan based on your dietary needs, preferences, and health goals.
        effortless and accurate. All within <strong>minutes</strong>!</p>
      <div class="w-full sm:w-auto flex flex-col items-stretch sm:flex-row gap-2 sm:gap-4 mt-10">
        <Button class="group" as-child>
          <NuxtLink to="/wizard">
            Create your meal plan
          </NuxtLink>
        </Button>
        <Button variant="ghost" class="group sm:-mr-[30px]" as-child>
          <NuxtLink to="#steps">
            See how it works
            <ArrowDown
                class="hidden sm:block opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 duration-150"
                aria-hidden="true"/>
          </NuxtLink>
        </Button>
      </div>
    </section>
    <section id="steps" class="mb-16 sm:mb-32">
      <div class="flex flex-col items-center mb-8 sm:mb-16">
        <div class="text-primary font-medium mb-4">How it works</div>
        <h2 class="text-center mb-4">A Meal Plan Within Minutes</h2>
        <p class="text-center text-muted-foreground">Get you personalized meal planning in just three simple steps.</p>
      </div>
      <div class="relative">
        <div class="md:hidden absolute left-1/2 inset-y-0 w-1 bg-gradient-to-b from-primary to-secondary opacity-50"></div>
        <div class="hidden md:block absolute top-1/2 inset-x-0 h-1 bg-gradient-to-r from-primary to-secondary opacity-50"></div>
        <ol class="relative grid md:grid-cols-3 gap-4">
          <li v-for="(step, index) in steps" class="flex flex-col bg-background border rounded-2xl pt-4 pr-5 pb-5 pl-4">
<!--            <img :src="step.image" alt="Answer some questions so we get to know you" class="h-48 md:h-56 rounded-xl mb-5 object-cover object-top">-->
            <div class="flex">
              <div class="flex items-center justify-center shrink-0 h4 text-primary font-semibold bg-secondary/50 rounded size-8 mr-4">
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="h4 mb-1">{{ step.title }}</h3>
                <p class="text-sm text-muted-foreground">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>