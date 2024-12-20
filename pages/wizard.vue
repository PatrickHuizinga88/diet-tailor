<script setup lang="ts">
import stepCategories from '~/data/wizardSteps'
import Heading from "~/components/wizard/Heading.vue";
import {Loader2} from "lucide-vue-next";
import exampleResponse from "~/data/exampleResponse";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "~/components/ui/tabs";
import NutritionDetailList from "~/components/wizard/NutritionDetailList.vue";
import NutritionDetailItem from "~/components/wizard/NutritionDetailItem.vue";
import Meal from "~/components/wizard/Meal.vue";
import MealPlan from "~/components/wizard/MealPlan.vue";

const wizardFormStore = useWizardFormStore()

const currentStep = ref(1)
const resultsLoading = ref(false)
const showResults = ref(true)
const formData = ref<Record<string, any>>({})
const response = ref<any>(JSON.parse(exampleResponse))

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
  if (!data.choices[0].message.content) return
  response.value = JSON.parse(data.choices[0].message.content)
}
</script>

<template>
  <form v-if="!resultsLoading && !showResults" @submit.prevent="handleSubmit" class="flex flex-col h-full">
    <div v-for="category in stepCategories" :key="category.id" class="flex-1">
      <div v-for="(step, index) in category.steps" :key="step.id">
        <div>
          <transition
              mode="out-in"
              enter-active-class="delay-400"
              enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-1 translate-y-0"
              leave-from-class="opacity-1 translate-y-0"
              leave-to-class="opacity-0 translate-y-4"
              appear
          >
            <Heading
                v-if="currentStep === index + 1"
                :heading="step.question"
                :subheading="category.name"
                :formFieldType="step.formFieldType"
                class="duration-300"
            />
          </transition>
          <transition
              mode="out-in"
              enter-active-class="delay-500"
              enter-from-class="opacity-0 translate-y-4"
              enter-to-class="opacity-1 translate-y-0"
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
                class="duration-300"
            />
          </transition>
        </div>
      </div>
    </div>
    <div class="shrink-0">
      <Button type="submit" size="lg" class="w-full mt-10">Next step</Button>
      <Button type="button" size="lg" variant="ghost" class="w-full mt-2" @click="previousStep">Previous step</Button>
    </div>
  </form>
  <div v-else-if="resultsLoading" class="relative flex flex-col h-full">
    <div class="flex-1">
      <section id="heading" class="text-center">
        <p class="text-primary-dark font-medium mb-2">Thank you for your time!</p>
        <h1 class="mb-3">Your journey to healthier eating is just seconds away!</h1>
      </section>
    </div>
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Loader2 class="size-12 text-primary animate-spin"/>
    </div>
    <p class="text-lg text-center text-muted-foreground">We’re analyzing your preferences and goals to create a meal
      plan tailored
      just for you. This may take a moment.</p>
  </div>
  <div v-if="showResults">
    <MealPlan :response="response"/>
  </div>
</template>

<style scoped>

</style>