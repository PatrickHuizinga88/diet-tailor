<script setup lang="ts">
import {Heading, HeadingTitle, HeadingDescription} from "~/components/wizard/heading";
import {ArrowRight, CheckCircle} from "lucide-vue-next";

definePageMeta({
  layout: 'wizard',
  middleware: 'auth'
})

const open = ref(false)
</script>

<template>
  <LayoutContainer class="mb-8">
    <Heading class="text-center">
      <HeadingTitle>
        Your Personalized Meal Plan is Ready!
      </HeadingTitle>
      <HeadingDescription>
        Based on your preferences, goals, and lifestyle, we've created a plan tailored to help you succeed.
      </HeadingDescription>
    </Heading>
    <h2 class="h3 text-primary-dark text-center w-full mb-6">Your Daily Meal Plan</h2>
    <MealPlan @clickPremiumFeature="open = true" :isTeaser="true"/>
    <div class="bg-primary text-primary-foreground rounded-2xl p-4 mt-6">
      <h3 class="mb-4">Unlock Your Personalized Meal Plan</h3>
      <p class="sr-only">Includes the following features:</p>
      <ul class="space-y-2.5 mb-6">
        <li class="flex items-center">
          <CheckCircle class="size-5 mr-2" aria-hidden="true"/>
          Save your meal plan for later
        </li>
        <li class="flex items-center">
          <CheckCircle class="size-5 mr-2" aria-hidden="true"/>
          Tweak every meal to your liking
        </li>
        <li class="flex items-center">
          <CheckCircle class="size-5 mr-2" aria-hidden="true"/>
          Change your preferences anytime
        </li>
      </ul>
      <Dialog v-model:open="open">
        <DialogTrigger as-child>
          <Button variant="outline" size="lg" class="w-full text-foreground border-none">
            Sign up for free
            <ArrowRight/>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <div>
            <h1 class="h2 mb-1">Sign up for free</h1>
            <p class="text-muted-foreground">Gain access to many features to fine-tune your personal diet.</p>
          </div>
          <Register/>
        </DialogContent>
      </Dialog>
    </div>
<!--    <div class="fixed bottom-6 sm:px-4 w-[calc(100vw-2rem)] sm:w-full max-w-3xl">-->
<!--      <Dialog>-->
<!--        <DialogTrigger as-child>-->
<!--          <Button size="lg" class="w-full shadow-[0_0_50px_-8px] shadow-primary/75">-->
<!--            Save and customize plan-->
<!--            <ArrowRight/>-->
<!--          </Button>-->
<!--        </DialogTrigger>-->
<!--        <DialogContent>-->
<!--          <Register/>-->
<!--        </DialogContent>-->
<!--      </Dialog>-->
<!--    </div>-->
  </LayoutContainer>
</template>

<style scoped>

</style>