<script setup lang="ts">
import stepCategories from '~/data/wizardSteps'
import Heading from "~/components/wizard/Heading.vue";
import {Loader2} from "lucide-vue-next";
// import exampleResponse from "~/data/exampleResponse";
import {Tabs, TabsList, TabsTrigger, TabsContent} from "~/components/ui/tabs";

const wizardFormStore = useWizardFormStore()

const currentStep = ref(1)
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

const mealType = (index: string) => {
  switch (index) {
    case 'breakfast':
      return 'Breakfast'
    case 'lunch':
      return 'Lunch'
    case 'dinner':
      return 'Dinner'
    case 'snack':
      return 'Snack'
    default:
      return 'Meal'
  }
}
</script>

<template>
<!--  <div v-if="showResults">-->

<!--  </div>-->
<!--  <div v-else>-->

    <form v-if="!resultsLoading && !showResults" @submit.prevent="handleSubmit" class="flex flex-col h-full">
      <div v-for="category in stepCategories" :key="category.id" class="flex-1">
        <div v-for="(step, index) in category.steps" :key="step.id">
          <div v-if="currentStep === index + 1">
            <Heading :heading="step.question" :subheading="category.name" :formFieldType="step.formFieldType"/>
            <WizardForm
                v-model="formData[step.id]"
                :questionId="step.id"
                :type="step.formFieldType"
                :options="step.options"
                :placeholder="step.placeholder"
                :suffix="step.suffix"
            />
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
      <p class="text-lg text-muted-foreground">We’re analyzing your preferences and goals to create a meal plan tailored
        just for you. This may take a moment.</p>
    </div>
    <div v-if="showResults">
      <h2 class="text-primary-dark text-center w-full mb-6">Your Weekly Meal Plan</h2>
      <Tabs default-value="Monday" class="w-full">
        <div class="overflow-hidden rounded-md mb-8">
          <TabsList class="overflow-x-auto">
            <TabsTrigger v-for="day in response.mealPlan" :value="day">
              {{ day.day }}
            </TabsTrigger>
          </TabsList>
        </div>

        <h3 class="mb-3">Daily Nutrition Overview</h3>
        <TabsContent v-for="day in response.mealPlan" :value="day">
          <dl class="bg-muted rounded-lg text-sm divide-y divide-border px-2 mb-8">
            <div class="flex items-center justify-between py-2">
              <dt class="font-medium">Calories</dt>
              <dd>{{ day.nutritionOverview.calories }} kcal</dd>
            </div>
            <div class="flex items-center justify-between py-2">
              <dt class="font-medium">Protein</dt>
              <dd>{{ day.nutritionOverview.protein.amount + day.nutritionOverview.protein.unit }}</dd>
            </div>
            <div class="flex items-center justify-between py-2">
              <dt class="font-medium">Carbs</dt>
              <dd>{{ day.nutritionOverview.carbs.amount + day.nutritionOverview.carbs.unit }}</dd>
            </div>
            <div class="flex items-center justify-between py-2">
              <dt class="font-medium">Fats</dt>
              <dd>{{ day.nutritionOverview.fats.amount + day.nutritionOverview.fats.unit }}</dd>
            </div>
          </dl>
          <div class="border rounded-2xl space-y-8 p-4">
            <div v-for="(meal, index) in day.meals">
              <h4 class="mb-2">{{ mealType(index) }}</h4>
              <p class="mb-4">{{ meal.name }}</p>
              <dl class="bg-muted rounded-lg text-sm divide-y divide-border px-2 mb-4">
                <div class="flex items-center justify-between py-2">
                  <dt class="font-medium">Calories</dt>
                  <dd>{{ day.nutritionOverview.calories }} kcal</dd>
                </div>
                <div class="flex items-center justify-between py-2">
                  <dt class="font-medium">Protein</dt>
                  <dd>{{ day.nutritionOverview.protein.amount + day.nutritionOverview.protein.unit }}</dd>
                </div>
                <div class="flex items-center justify-between py-2">
                  <dt class="font-medium">Carbs</dt>
                  <dd>{{ day.nutritionOverview.carbs.amount + day.nutritionOverview.carbs.unit }}</dd>
                </div>
                <div class="flex items-center justify-between py-2">
                  <dt class="font-medium">Fats</dt>
                  <dd>{{ day.nutritionOverview.fats.amount + day.nutritionOverview.fats.unit }}</dd>
                </div>
              </dl>
              <div class="grid grid-cols-2 gap-4">
                <Button size="sm" variant="outline">Tweak {{ index }}</Button>
                <Button size="sm" variant="outline" asChild>
                  <a href="#">View recipe</a>
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>

<!--  </div>-->
</template>

<style scoped>

</style>