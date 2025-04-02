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
    title: "Truly Personalized & AI-Powered",
    description: "Your meal plan adapts perfectly to your dietary needs, goals, and preferences with expert AI precision.",
    icon: PencilRuler
  },
  {
    title: "Flexible & Easy to Adjust",
    description: "Swap meals and tweak your plan anytime, designed for your lifestyle and consistency.",
    icon: PencilLine
  },
  {
    title: "Delicious & Diverse Recipes",
    description: "Enjoy a variety of exciting, easy-to-follow meals that make healthy eating enjoyable.",
    icon: Utensils
  },
  {
    title: "Time-Saving & Stress-Free",
    description: "No more meal planning hassle. We take care of it so you can focus on enjoying your food.",
    icon: Clock
  }
]
</script>

<template>
  <div class="container">
    <section id="hero" class="flex flex-col items-center text-center mx-auto pt-0 sm:pt-8 pb-14 md:pb-20 lg:pb-24">
      <div class="max-w-3xl">
        <motion.h1
            :transition="{duration: .4}"
            :initial="{opacity: 0, translateY: 6}" :whileInView="{ opacity: 1, translateY: 0 }"
            :inViewOptions="{ once: true }"
            class="mb-8">
          Personalized Meal Plans, Tailored to
          <span class="bg-clip-text text-transparent bg-gradient-to-br from-primary via-primary to-secondary">
            Your
          </span>
          Preferences
        </motion.h1>
        <motion.p
            :transition="{duration: .4, delay: .1}"
            :initial="{opacity: 0, translateY: 6}" :whileInView="{ opacity: 1, translateY: 0 }"
            :inViewOptions="{ once: true }"
            class="text-lg leading-loose">
          Get a customized daily meal plan based on your dietary needs, preferences, and health goals.
          Effortless and accurate!
        </motion.p>
      </div>
      <motion.div
          :transition="{duration: .4, delay: .2}"
          :initial="{opacity: 0, translateY: 6}" :whileInView="{ opacity: 1, translateY: 0 }"
          :inViewOptions="{ once: true }"
          class="w-full sm:w-auto flex flex-col items-stretch sm:flex-row gap-3 sm:gap-4 mt-12">
        <Button size="lg" class="group shadow-[0_0_32px_-8px_hsl(var(--secondary)/50%)]" as-child>
          <NuxtLink to="/wizard">
            Create your meal plan
          </NuxtLink>
        </Button>
        <Button size="lg" variant="ghost" class="group sm:-mr-[30px]" as-child>
          <NuxtLink to="#steps">
            See how it works
            <ArrowDown
                class="hidden sm:block opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0 duration-150"
                aria-hidden="true"/>
          </NuxtLink>
        </Button>
      </motion.div>
      <motion.div
        :transition="{duration: .5, delay: .7}" :initial="{opacity: 0, scale: .95}" :whileInView="{ opacity: 1, scale: 1 }" :inViewOptions="{ once: true }"
          class="relative rounded-2xl bg-white overflow-hidden shadow-2xl p-2 mt-12 sm:mt-24">
        <img src="../assets/images/woman-cooking.webp" class="h-[320px] sm:h-[500px] object-cover rounded-xl"/>
        <div class="absolute inset-2 bg-gradient-to-b from-primary to-secondary-dark rounded-xl opacity-40"></div>
        <div class="absolute">

        </div>
      </motion.div>
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
                <h2 class="h4 mb-1">{{ step.title }}</h2>
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
      <div class="relative max-w-5xl mx-auto">
        <div
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-primary to-secondary blur-[128px] w-3/4 h-1/2 rounded-full rotate-6 opacity-40 -z-10"></div>
        <ul class="grid sm:grid-cols-2 gap-4">
          <motion.li
              v-for="(feature, index) in features" :transition="{ ease: 'linear',duration: .25, delay: (index + 1) * .1 }"
              :initial="{opacity: 0, scale: .98}" :whileInView="{ opacity: 1, scale: 1 }"  :inViewOptions="{ once: true }"
              class="flex flex-row sm:flex-col items-start bg-background/60 backdrop-blur-xl border text-left rounded-xl p-4 sm:p-6 w-full">
            <div class="p-1 sm:p-1.5 bg-secondary/25 rounded-xl mr-4 sm:mr-0 sm:mb-4">
              <div class="grid place-items-center shrink-0 size-9 sm:size-10 bg-secondary/40 rounded-lg">
                <component :is="feature.icon" class="size-6 sm:size-7 text-primary"/>
              </div>
            </div>
            <div>
              <h2 class="h4 mb-1 mt-2 sm:mt-0">{{ feature.title }}</h2>
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
          <Button size="lg" class="group w-full sm:w-auto mt-8" as-child>
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