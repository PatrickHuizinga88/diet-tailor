<script setup lang="ts">
import { motion } from 'motion-v'
import {ArrowDown, ArrowRight, Bot, Clock, PencilLine, PencilRuler, Utensils} from "lucide-vue-next";
import stepOneImage from "../assets/images/how-it-works/step-1.webp";
import stepTwoImage from "../assets/images/how-it-works/step-2.webp";
import stepThreeImage from "../assets/images/how-it-works/step-3.webp";

definePageMeta({
  layout: 'landing',
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
    image: stepThreeImage,
    title: "Enjoy & Adjust",
    description: "Easily swap meals, explore new recipes, and fine-tune your plan anytime."
  }
]

const features = [
  {
    title: "Truly Personalized",
    description: "Your plan adapts to your exact dietary needs, ensuring every meal is perfect for you.",
    icon: PencilRuler
  },
  {
    title: "Smart AI-Powered Plans",
    description: "Our AI generates meal plans with expert precision, considering your preferences and goals.",
    icon: Bot
  },
  {
    title: "Easily Adjustable",
    description: "Swap meals and tweak your plan anytime. Flexibility is key to consistency.",
    icon: PencilLine
  },
  {
    title: "Diverse & Delicious",
    description: "Get exciting meal suggestions with easy-to-follow recipes. Eating healthy should never be boring!",
    icon: Utensils
  },
  {
    title: "Saves You Time",
    description: "No more meal planning stress. We take care of it so you can focus on enjoying your food.",
    icon: Clock
  }
]
</script>

<template>
  <div class="container">
    <section id="hero" class="flex flex-col items-center max-w-3xl text-center mx-auto min-h-[60svh] pt-8">
      <h1 class="mb-8">Personalized Meal Plans, Tailored to <span
          class="bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary">Your</span>
        Preferences</h1>
      <p class="text-lg">Get a customized daily meal plan based on your dietary needs, preferences, and health goals.
        Effortless and accurate. All within <strong>minutes</strong>!</p>
      <div class="w-full sm:w-auto flex flex-col items-stretch sm:flex-row gap-2 sm:gap-4 mt-10">
        <Button class="group shadow-[0_0_32px_-8px_hsl(var(--secondary)/50%)]" as-child>
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
    <section id="steps" class="py-14 md:py-20 lg:py-24">
      <div class="flex flex-col sm:flex-row justify-between items-end gap-4 sm:gap-8 mb-8 sm:mb-16">
        <div class="sm:max-w-xl">
          <div class="text-primary font-semibold mb-2">How It Works</div>
          <h1 class="h2">Your Personalized Meal Plan Within Minutes</h1>
        </div>
        <p class="text-muted-foreground sm:max-w-lg">With DietTailor, you'll get you personalized meal planning in just
          three simple steps.</p>
      </div>
      <div class="relative">
        <ol class="relative grid lg:grid-cols-3 justify-center gap-4">
          <motion.li v-for="(step, index) in steps" :transition="{ duration: .5, delay: (index + 1) * .15 }"
                     :initial="{opacity: 0, translateY: 8}" :whileInView="{ opacity: 1, translateY: 0 }"
                     :inViewOptions="{ once: true }" class="flex flex-col sm:max-lg:flex-row sm:max-lg:gap-8 bg-background border rounded-2xl max-w-sm sm:max-w-none pt-4 pr-5 pb-5 pl-4">
            <img :src="step.image" alt="Answer some questions so we get to know you"
                 class="h-48 lg:h-56 rounded-xl mb-5 sm:max-lg:mb-0 object-cover object-top sm:max-lg:order-last">
            <div class="flex">
              <div
                  class="flex items-center justify-center shrink-0 h4 text-primary font-semibold bg-secondary/50 rounded-md size-8 mr-4">
                {{ index + 1 }}
              </div>
              <div>
                <h3 class="h4 mb-1">{{ step.title }}</h3>
                <p class="text-sm text-muted-foreground">
                  {{ step.description }}
                </p>
              </div>
            </div>
          </motion.li>
        </ol>
      </div>
    </section>
    <section id="features" class="py-14 md:py-20 lg:py-24">
      <div class="flex flex-col items-center max-w-md text-center mx-auto mb-8 sm:mb-16">
        <div class="text-primary font-semibold mb-2">Why DietTailor?</div>
        <h1 class="h2 mb-4">Smart, flexible and 100% personalized</h1>
      </div>
      <div class="relative">
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary to-secondary blur-[128px] w-3/4 h-1/2 rounded-full rotate-6 opacity-40 -z-10"></div>
        <ul class="flex flex-wrap justify-center gap-4">
          <motion.li
              v-for="(feature, index) in features" :transition="{ ease: 'linear',duration: .25, delay: (index + 1) * .1 }"
              :initial="{opacity: 0, scale: .98}" :whileInView="{ opacity: 1, scale: 1 }"  :inViewOptions="{ once: true }"
              class="flex flex-row sm:flex-col sm:items-center bg-background/60 backdrop-blur-xl border text-left sm:text-center rounded-xl p-4 sm:p-6 w-full md:max-w-sm">
            <div class="grid place-items-center shrink-0 size-9 bg-secondary/50 rounded-md mr-4 sm:mr-0 sm:mb-4">
              <component :is="feature.icon" class="size-6 text-primary"/>
            </div>
            <div>
              <h3 class="h4 mb-1 mt-1 sm:mt-0">{{ feature.title }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ feature.description }}
              </p>
            </div>
          </motion.li>
        </ul>
      </div>
    </section>
    <section id="cta" class="py-14 md:py-20 lg:py-24">
      <motion.div :transition="{ type: 'spring', bounce: .5, duration: .5, delay: .5 }" :initial="{scale: .95}" :whileInView="{ scale: 1 }" :inViewOptions="{ once: true }"
          class="flex flex-col sm:flex-row justify-between items-center sm:items-end bg-gradient-to-r from-secondary/60 to-lime-500/60 text-secondary-foreground rounded-3xl p-6 sm:p-8 md:p-10 sm:pb-0 md:pb-0">
        <div class="max-w-md md:max-w-xl mb-6 sm:mb-10">
          <h1 class="sm:h2 md:h1 mb-4">Get Your Personalized Plan</h1>
          <p class="font-medium">Start today and enjoy meals tailored to your taste, goals, and lifestyle. Effortless,
            healthy, and delicious!</p>
          <Button class="group mt-8" as-child>
            <NuxtLink to="/wizard">
              Create your meal plan
              <ArrowRight class="group-hover:translate-x-0.5 duration-150"/>
            </NuxtLink>
          </Button>
        </div>
        <img src="../assets/images/cta-illustration.svg" alt=""
             class="order-first sm:order-last h-64 md:h-80 lg:mr-16 xl:mr-24 mb-8 sm:mb-0 -mt-12 sm:mt-auto"/>
      </motion.div>
    </section>
  </div>
</template>