<script setup lang="ts">
import type {Meal} from "~/types/MealPlan";
import type {Database} from "~/types/database.types";
import {TriangleAlert, Info} from "lucide-vue-next";
import {Popover} from "~/components/ui/popover";

const props = defineProps<{
  mealType?: string,
  item?: Meal
}>()

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const mealPlanStore = useMealPlanStore()
const toastStore = useToastStore()

const open = ref(false)
const loadingNewMeal = ref(false)
const changeMealType = ref('')
const changeReason = ref('')

const {data: generatedMeals, refresh: refreshUserActionsCount} = await useAsyncData('userActionsCount', async () => {
  try {
    const {count} = await supabase.from('user_actions')
        .select('', {count: 'exact'})
        .eq('user_id', user.value?.id)
        .eq('action_type', 'generate_meal')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    return count
  } catch (error) {
    console.error(error)
  }
})

const changeMeal = async (mealId: string, mealType: string, currentMeal: string) => {
  try {
    loadingNewMeal.value = true

    const {data: profile, error} = await supabase.from('profiles')
        .select('personal_information')
        .eq('id', user.value?.id)
        .single()
    if (error) throw error

    const reason = `${changeMealType.value === 'new_meal' ? `Generate an entirely new meal` : 'Slightly tweak the previous meal'}, based on the following feedback: ${changeReason.value}`

    const response = await $fetch('/api/generate-meal', {
      method: 'POST',
      body: {
        ...profile.personal_information,
        mealType,
        currentMeal,
        reason
      }
    })
    if (!response) throw new Error('Failed to generate meal')

    const {error: userActionError} = await supabase.from('user_actions')
        .insert({
          user_id: user.value?.id,
          action_type: 'generate_meal'
        })
        .eq('user_id', user.value?.id)
    if (userActionError) throw userActionError

    mealPlanStore.setMeal(mealId, response)

    const {error: mealPlanError} = await supabase.from('meal_plans')
        .update({
          meal_plan: mealPlanStore.mealPlan
        })
        .eq('user_id', user.value?.id)
    if (mealPlanError) throw mealPlanError

    await refreshUserActionsCount()

    toastStore.createToast({
      type: 'success',
      action: 'save',
      item: 'meal plan'
    })
  } catch (error) {
    toastStore.createToast({
      type: 'destructive',
      action: 'save',
      item: 'meal plan'
    })
    console.error(error)
  } finally {
    loadingNewMeal.value = false
    open.value = false
    changeMealType.value = ''
    changeReason.value = ''
  }
}

const openDialog = () => {
  open.value = true
}

defineExpose({openDialog})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Change {{ props.mealType }}</DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div v-if="props.item && props.mealType">
        <Alert v-if="generatedMeals && generatedMeals >= 5" variant="warning" class="mb-6">
          <TriangleAlert class="size-4"/>
          <AlertTitle>Limit reached</AlertTitle>
          <AlertDescription>
            You have reached the limit of 5 meal generations in the last 7 days.
            <NuxtLink to="/pricing" class="underline">Upgrade to our premium plan</NuxtLink>
            or wait
            until the next week to generate more meals.
          </AlertDescription>
        </Alert>
        <div class="bg-muted rounded-lg p-4 mb-6">
          <h3 class="text-sm mb-0.5">Current meal</h3>
          {{ props.item.name }}
        </div>
        <form id="change-meal-form"
              @submit.prevent="changeMeal(props.item.id, props.mealType, `${props.item.name} - ${props.item.description}`)"
              class="space-y-6">
          <fieldset class="space-y-1.5">
            <legend class="font-medium">What would you like to change?</legend>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div class="relative">
                <input v-model="changeMealType" type="radio" value="new_meal" id="new-meal"
                       name="change-meal-options"
                       class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none" required/>
                <label for="new-meal"
                       class="flex flex-col rounded-lg border px-4 py-3 h-full text-sm cursor-pointer transition-[background-color] duration-200 hover:bg-muted peer-focus-visible:bg-muted peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary peer-checked:text-primary-dark">
                  <span class="font-medium">The entire meal</span>
                </label>
              </div>
              <div class="relative">
                <input v-model="changeMealType" type="radio" value="change_ingredients"
                       id="change-ingredients"
                       name="change-meal-options"
                       class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none" required/>
                <label for="change-ingredients"
                       class="flex flex-col rounded-lg border px-4 py-3 h-full text-sm cursor-pointer transition-[background-color] duration-200 hover:bg-muted peer-focus-visible:bg-muted peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary peer-checked:text-primary-dark">
                  <span class="font-medium">Only a part of the meal</span>
                </label>
              </div>
            </div>
          </fieldset>
          <div class="space-y-1.5">
            <Label for="reason" class="text-base">Please provide more information</Label>
            <Textarea id="reason" v-model="changeReason"/>
          </div>
        </form>
      </div>
      <div v-else>
        <p>Something went wrong.</p>
      </div>
      <DialogFooter>
        <Button @click="open = false" size="sm" variant="outline">
          Cancel
        </Button>
        <div class="flex flex-col">
          <Button form="change-meal-form" size="sm" :loading="loadingNewMeal"
                  :disabled="generatedMeals && generatedMeals >= 5" class="w-full">
            Generate my new meal
          </Button>
          <div class="flex items-center sm:justify-end text-muted-foreground order-first sm:order-last mb-3 sm:mb-0 sm:mt-1 sm:-mr-1">
            <p class="text-sm">
              Weekly changes left: {{ generatedMeals ? 5 - generatedMeals : 0 }}
            </p>
            <Popover>
              <PopoverTrigger class="p-1 ml-1">
                <Info class="size-4"/>
              </PopoverTrigger>
              <PopoverContent side="top" :side-offset="2" class="text-sm text-center text-muted-foreground max-w-xs">
                Our free plan provides you with 5 meal generations per week. If you need more, consider upgrading to our
                premium plan.
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<style scoped>

</style>