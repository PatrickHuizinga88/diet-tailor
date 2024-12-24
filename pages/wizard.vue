<script setup lang="ts">
import stepCategories from '~/data/wizardSteps'
import Heading from "~/components/wizard/Heading.vue";
import {ArrowRight, Loader2} from "lucide-vue-next";
// import exampleResponse from "~/data/exampleResponse";
import MealPlan from "~/components/wizard/MealPlan.vue";

const wizardFormStore = useWizardFormStore()

const currentStep = ref(1)
const currentCategory = ref(1)
const resultsLoading = ref(false)
const showResults = ref(false)
const formData = ref<Record<string, any>>({})
const response = ref<any>('')

const nextStep = async () => {
  if (currentStep.value === stepCategories.reduce((acc, category) => acc + category.steps.length, 0)) {
    resultsLoading.value = true
    try {
      await generateDiet()
    } catch (e) {
      console.error(e)
    } finally {
      resultsLoading.value = false
      showResults.value = true
    }
    return
  }
  if (currentStep.value === stepCategories[currentCategory.value - 1].steps.length) {
    currentCategory.value++
    currentStep.value = 1
    return
  }
  currentStep.value++
}

const previousStep = () => {
  if (currentStep.value === 1) return
  currentStep.value--
}

const handleSubmit = () => {
  const currentCategory = stepCategories.find(category =>
      category.steps.some(step => Number(step.id) === currentStep.value)
  )
  const currentStepData = currentCategory?.steps.find(step => Number(step.id) === currentStep.value)

  if (currentStepData) {
    wizardFormStore.setWizardForm(currentStepData.id.toString(), formData.value[currentStepData.id])
  }
  nextStep()
}

const generateDiet = async () => {
  const {data} = await $fetch('/api/completion', {
    method: 'POST',
    body: wizardFormStore.wizardForm
  })
  if (!data) return
  response.value = JSON.parse(data)
}
</script>

<template>
  <form v-if="!resultsLoading && !showResults" @submit.prevent="handleSubmit" class="flex flex-col h-full">
    <div v-for="(category, index) in stepCategories" :key="category.id"  class="flex flex-col flex-1">
      <template v-if="currentCategory === index + 1">
        <div v-for="(step, index) in category.steps" :key="step.id"
             :class="['flex flex-col relative', {'order-last': currentStep === index + 1}]">
          <transition
            enter-active-class="delay-300 duration-300"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-1 translate-y-0"
            leave-active-class="duration-300"
            leave-from-class="opacity-1 translate-y-0"
            leave-to-class="opacity-0 translate-y-4"
            appear
          >
            <Heading
              v-if="currentStep === index + 1"
              :heading="step.question"
              :subheading="category.name"
              :formFieldType="step.formFieldType"
            />
          </transition>
          <transition
            enter-active-class="delay-400 duration-300"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-1 translate-y-0"
            leave-active-class="duration-300"
            leave-from-class="opacity-1 translate-y-0"
            leave-to-class="opacity-0 translate-y-4"
            appear
          >
            <WizardForm
              v-if="currentStep === index + 1"
              v-model="formData[step.id]"
              :questionId="step.id"
              :type="step.formFieldType"
              :options="step.options"
              :placeholder="step.placeholder"
              :suffix="step.suffix"
            />
          </transition>
        </div>
      </template>
    </div>
    <div class="shrink-0">
      <Button type="submit" size="lg" class="group w-full mt-10">
        Next step
        <ArrowRight class="size-5 ml-2 group-hover:translate-x-0.5 duration-200"/>
      </Button>
      <div class="h-14">
        <Button type="button" size="lg" variant="ghost" class="w-full mt-2" @click="previousStep"
                v-if="currentStep > 1">
          Previous step
        </Button>
      </div>
    </div>
  </form>

  <div v-else-if="resultsLoading" class="relative flex flex-col h-full">
    <div class="flex-1">
      <Heading
          heading="Your journey to healthier eating is just seconds away!"
          subheading="Thank you for your time!"
          class="text-center"
      />
    </div>
    <div class="flex justify-center flex-1">
      <Loader2 class="size-12 text-primary animate-spin"/>
    </div>
    <p class="text-lg text-center text-muted-foreground">
      We’re analyzing your preferences and goals to create a meal plan tailored just for you. This may take a moment.
    </p>
  </div>

  <MealPlan v-if="showResults" :response="response" @retryResponse="nextStep"/>

</template>

<style scoped>

</style>