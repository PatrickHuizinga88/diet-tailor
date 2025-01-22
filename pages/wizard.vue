<script setup lang="ts">
import questionCategories from '~/data/wizardSteps'
import {Heading, HeadingTitle, HeadingSubtitle} from "~/components/wizard/heading";
import {ArrowRight, ArrowLeft, Loader2} from "lucide-vue-next";
// import exampleResponse from "~/data/exampleResponse";
import MealPlan from "~/components/wizard/MealPlan.vue";
import DynamicFormField from "~/components/wizard/DynamicFormField.vue";
import {Progress} from "~/components/ui/progress";

const wizardFormStore = useWizardFormStore()

const currentStep = ref(1)
const overallStep = ref(1)
const currentCategory = ref(1)
const resultsLoading = ref(false)
const showResults = ref(false)
const formData = ref<Record<string, any>>({})
const response = ref<any>('')

const stepperValue = computed(() => {
  const totalSteps = questionCategories.reduce((acc, category) => acc + category.questions.length, 0)
  return overallStep.value / totalSteps * 100
})

const checkCondition = (question: any, answer: any) => {
  if (!question.condition) return true;
  return question.condition === answer;
};

const nextStep = async () => {
  const currentAnswer = formData.value[questionCategories[currentCategory.value - 1].questions[currentStep.value - 1].id];

  while (true) {
    if (currentStep.value === questionCategories[questionCategories.length - 1].questions.length && currentCategory.value === questionCategories.length) {
      resultsLoading.value = true;
      try {
        await generateDiet();
      } catch (e) {
        console.error(e);
      } finally {
        resultsLoading.value = false;
        showResults.value = true;
      }
      return;
    }
    if (currentStep.value === questionCategories[currentCategory.value - 1].questions.length) {
      currentCategory.value++;
      currentStep.value = 1;
    } else {
      currentStep.value++;
    }

    const nextQuestion = questionCategories[currentCategory.value - 1].questions[currentStep.value - 1];
    if (checkCondition(nextQuestion, currentAnswer)) break;
  }
  overallStep.value++;
};

const previousStep = () => {
  if (currentStep.value === 1 && currentCategory.value > 1) {
    currentCategory.value--;
    currentStep.value = questionCategories[currentCategory.value - 1].questions.length;
  } else {
    currentStep.value--;
  }
  overallStep.value--;

  const previousQuestion = questionCategories[currentCategory.value - 1].questions[currentStep.value - 1];
  const currentAnswer = formData.value[previousQuestion.id];

  if (checkCondition(previousQuestion, currentAnswer)) return;
}

const handleSubmit = () => {
  const currentQuestionData = questionCategories[currentCategory.value - 1].questions[currentStep.value - 1]

  if (currentQuestionData) {
    wizardFormStore.setWizardForm(currentQuestionData.id, formData.value[currentQuestionData.id])
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
    <LayoutContainer
        class="flex flex-col h-full flex-1 sm:h-auto sm:flex-none overflow-y-auto pt-[calc(2rem+var(--header-height))]">
      <Progress class="hidden sm:block h-1.5 bg-muted mb-12" :model-value="stepperValue"/>
      <div v-for="(category, index) in questionCategories" :key="category.id"
           :class="{'order-last': currentCategory === index + 1}">
        <transition
            leave-active-class="duration-300"
            leave-from-class="opacity-1 translate-y-0"
            leave-to-class="opacity-0 translate-y-4"
            appear
        >
          <div v-if="currentCategory === index + 1" class="flex flex-col pb-8">
            <div v-for="(question, index) in category.questions" :key="question.id"
                 :class="['flex flex-col relative', {'order-last': currentStep === index + 1}]">
              <transition
                  leave-active-class="duration-300"
                  leave-from-class="opacity-1 translate-y-0"
                  leave-to-class="opacity-0 translate-y-4"
                  appear
              >
                <div v-if="currentStep === index + 1"
                     :class="['flex flex-col relative']">
                  <transition
                      enter-active-class="delay-300 duration-300"
                      enter-from-class="opacity-0 translate-y-4"
                      enter-to-class="opacity-1 translate-y-0"
                      leave-active-class="duration-300"
                      leave-from-class="opacity-1 translate-y-0"
                      leave-to-class="opacity-0 translate-y-4"
                      appear
                  >
                    <Heading v-if="currentStep === index + 1">
                      <HeadingSubtitle>{{ category.name }}</HeadingSubtitle>
                      <HeadingTitle>{{ question.question }}</HeadingTitle>
                    </Heading>
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
                    <DynamicFormField
                        v-if="currentStep === index + 1"
                        v-model="formData[question.id]"
                        :question="question"
                    />
                  </transition>
                </div>
              </transition>
            </div>
          </div>
        </transition>
      </div>
    </LayoutContainer>
    <div class="w-full border-t pb-4 sm:border-none sm:py-0">
      <Progress class="sm:hidden h-1.5 bg-muted mb-4" :model-value="stepperValue"/>
      <LayoutContainer>
        <div class="flex gap-4">
          <Button type="button" size="icon-xl" class="shrink-0" variant="ghost" @click="previousStep"
                  v-if="currentStep > 1 || currentCategory > 1" aria-label="Previous step">
            <ArrowLeft class="size-6" aria-hidden="true"/>
          </Button>
          <Button type="submit" size="xl" class="group w-full">
            Next step
            <ArrowRight class="size-6 ml-2 group-hover:translate-x-0.5 duration-200"/>
          </Button>
        </div>
      </LayoutContainer>
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