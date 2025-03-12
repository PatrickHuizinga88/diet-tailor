<script setup lang="ts">
import type {Database} from "~/types/database.types";
import {LoaderCircle} from 'lucide-vue-next'

definePageMeta({
  middleware: 'auth'
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const mealPlanStore = useMealPlanStore()
const dayjs = useDayjs()

const loading = ref(false)

const {data: profile} = await useAsyncData('profile', async () => {
  try {
    const {data} = await supabase.from('profiles')
        .select('first_name')
        .eq('id', user.value?.id)
        .single()
    return data
  } catch (error) {
    console.error(error)
  }
})

const {data: mealPlan} = await useAsyncData('meal-plan', async () => {
  try {
    loading.value = true
    const {data} = await supabase.from('meal_plans')
        .select('meal_plan')
        .eq('user_id', user.value?.id)
        .single()
    mealPlanStore.setMealPlan(data?.meal_plan)
    return data.meal_plan.find((day) => day.day === dayjs().format('dddd'))
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <LayoutContainer>
    <h1 class="h2 mb-6">Hi{{ profile?.first_name ? ` ${profile?.first_name}` : ''}}!</h1>
    <div v-if="loading" class="flex flex-col items-center justify-center my-32">
      <h2>We're almost done</h2>
      <p class="text-muted-foreground">We're now generating the meal plan for the remaining days.</p>
      <LoaderCircle class="size-6 animate-spin text-primary mt-6"/>
    </div>
    <div v-else>
      <MealPlanDay :mealPlan="mealPlan" :isToday="true"/>
    </div>
  </LayoutContainer>
</template>

<style scoped>

</style>