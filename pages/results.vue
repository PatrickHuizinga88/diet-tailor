<script setup lang="ts">
import {Heading, HeadingTitle, HeadingDescription} from "~/components/wizard/heading";
</script>

<template>
  <LayoutContainer
      class="relative flex flex-col h-full flex-1 sm:h-auto sm:flex-none overflow-y-auto pt-[calc(2rem+var(--header-height))] pb-8">
    <Heading class="text-center">
      <HeadingTitle>
        Your Personalized Meal Plan is Ready!
      </HeadingTitle>
      <HeadingDescription>
        Based on your preferences, goals, and lifestyle, we've created a plan tailored to help you succeed.
      </HeadingDescription>
    </Heading>
    <h2 class="h3 text-primary-dark text-center w-full mb-6">Your Weekly Meal Plan</h2>
    <MealPlan :isTeaser="true"/>
<!--    <div class="fixed bottom-6 sm:px-4 w-[calc(100vw-2rem)] sm:w-full max-w-3xl">-->
<!--      <Dialog>-->
<!--        <DialogTrigger as-child>-->
<!--          <Button size="xl" class="w-full shadow-[0_0_50px_-8px] shadow-primary/75">-->
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