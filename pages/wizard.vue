<script setup lang="ts">
import questions from '~/data/questions'
import {Heading, HeadingTitle, HeadingSubtitle} from "~/components/wizard/heading";
import {Loader2, RotateCcw} from "lucide-vue-next";
import DynamicFormField from "~/components/wizard/DynamicFormField.vue";
import {Progress} from "~/components/ui/progress";
import StepperButtons from "~/components/StepperButtons.vue";
import type {Database} from "~/types/database.types";

definePageMeta({
  layout: 'wizard',
  // middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const wizardFormStore = useWizardFormStore()
const mealPlanStore = useMealPlanStore()
const toastStore = useToastStore()

const currentStep = ref(1)
const resultsLoading = ref(false)
const showResults = ref(false)
const formData = ref<Record<string, any>>({})

const stepperValue = computed(() => {
  return currentStep.value / questions.length * 100
})

const nextStepButtonText = computed(() => {
  const currentQuestion = questions[currentStep.value - 1]
  if (currentStep.value === questions.length) {
    if (!user.value) return 'Generate Meal Plan'
    return 'Save Preferences'
  }
  if (!Object.keys(formData.value).includes(currentQuestion.id) && currentQuestion.optional) {
    return 'Skip step'
  }
  return 'Next step'
})

if (user.value) {
  const {data: profile} = await useAsyncData('profile', async () => {
    try {
      const {data} = await supabase.from('profiles')
          .select('personal_information')
          .eq('id', user.value?.id)
          .single()
      return data
    } catch (error) {
      console.error(error)
    }
  })

  if (profile.value?.personal_information) {
    formData.value = profile.value.personal_information
  }
}

// const checkCondition = (question: any, answer: any) => {
//   if (!question.condition) return true;
//   return question.condition === answer;
// };

const nextStep = async () => {
  if (currentStep.value === questions.length) {
    resultsLoading.value = true;
    try {
      if (!user.value) {
        await mealPlanStore.generateMealPlan(wizardFormStore.wizardForm)
        await navigateTo('/results')
        return
      }

      const {error} = await supabase.from('profiles').update({
        personal_information: {
          ...wizardFormStore.wizardForm
        }
      })
          .eq('id', user.value?.id)
          .select('personal_information')

      if (error) throw error

      toastStore.createToast({
        type: 'success',
        action: 'update',
        item: 'your preferences'
      })
      await navigateTo('/preferences')
    } catch (e) {
      toastStore.createToast({
        type: 'destructive',
        isError: true
      })
      console.error(e);
    } finally {
      resultsLoading.value = false;
      showResults.value = true;
    }
    return;
  }

  currentStep.value++;
  return;

  // const currentAnswer = formData.value[questions[currentStep.value - 1].id];
  // const nextQuestion = questions[currentStep.value];
  //
  // if (checkCondition(nextQuestion, currentAnswer)) {
  //   currentStep.value++;
  //   return;
  // }
  // if (Object.keys(formData.value).includes(nextQuestion.id)) {
  //   delete formData.value[nextQuestion.id];
  // }
  // currentStep.value = currentStep.value + 2;
};

const previousStep = () => {
  // const previousQuestion = questions[currentStep.value - 2];
  // if (previousQuestion && Object.keys(formData.value).includes(previousQuestion.id)) {
    currentStep.value--;
    return;
  // }
  // currentStep.value = currentStep.value - 2;
}

const handleSubmit = async () => {
  const currentQuestionData = questions[currentStep.value - 1]

  if (currentQuestionData) {
    wizardFormStore.setWizardForm(currentQuestionData.id, formData.value[currentQuestionData.id])
  }
  await nextStep()
}
</script>

<template>
  <form v-if="!resultsLoading && !showResults" @submit.prevent="handleSubmit" class="flex flex-col h-full">
    <LayoutContainer
        class="flex flex-col h-full flex-1 sm:h-auto sm:flex-none max-sm:overflow-y-auto">
      <Progress class="hidden sm:block h-1.5 bg-muted mb-12" :model-value="stepperValue"/>
      <div v-for="(question, index) in questions" :key="question.id"
           :class="['flex flex-col relative', {'order-last': currentStep === index + 1}]">
        <transition
            leave-active-class="transition-all duration-300"
            leave-from-class="opacity-1 translate-y-0"
            leave-to-class="opacity-0 translate-y-4">
          <div v-if="currentStep === index + 1"
               class="flex flex-col relative pb-6 starting:opacity-0 starting:translate-y-4 transition-all duration-300">
            <Heading v-if="currentStep === index + 1" class="starting:opacity-0 starting:translate-y-4 transition-all duration-300 delay-300">
              <HeadingSubtitle>{{ question.category }}</HeadingSubtitle>
              <HeadingTitle>{{ question.question }}</HeadingTitle>
            </Heading>
            <div v-if="currentStep === index + 1"
                 class="starting:opacity-0 starting:translate-y-4 transition-all duration-300 delay-400">
              <DynamicFormField
                  v-model="formData[question.id]"
                  :question="question"
              />

              <StepperButtons :current-step="currentStep" :next-step-button-text="nextStepButtonText"
                              :stepper-value="stepperValue" :use-container="false" @previous-step="previousStep"
                              class="hidden sm:block border-none py-0 mt-8"/>
            </div>
          </div>
        </transition>

      </div>
    </LayoutContainer>

    <StepperButtons :current-step="currentStep" :next-step-button-text="nextStepButtonText"
                    :stepper-value="stepperValue" :use-container="true" @previous-step="previousStep"
                    class="block sm:hidden sticky bottom-0 inset-x-0"/>
  </form>

  <LayoutContainer v-else-if="resultsLoading && !user"
                   class="flex flex-col h-full flex-1 sm:h-auto sm:flex-none overflow-y-auto">
    <div class="relative flex flex-col h-full">
      <div class="flex-1">
        <Heading class="text-center">
          <HeadingSubtitle>Thank you for your time!</HeadingSubtitle>
          <HeadingTitle>Your journey to healthier eating is just seconds away!</HeadingTitle>
        </Heading>
      </div>
      <div class="flex justify-center flex-1">
        <Loader2 class="size-12 text-primary animate-spin"/>
      </div>
      <p class="text-lg text-center text-muted-foreground mb-6">
        We’re analyzing your preferences and goals to create a meal plan tailored just for you. This may take a moment.
      </p>
    </div>
  </LayoutContainer>

  <LayoutContainer v-else
                   class="flex flex-col h-full flex-1 sm:h-auto sm:flex-none overflow-y-auto">
    <div class="flex justify-center">
      <Button class="group w-full" @click="nextStep">
        <RotateCcw class="size-5 mr-2 group-hover:-rotate-[360deg] duration-500"/>
        Let's try again
      </Button>
    </div>
  </LayoutContainer>
</template>

<style scoped>

</style>