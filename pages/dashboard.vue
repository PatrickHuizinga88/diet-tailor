<script setup lang="ts">
import type {Database} from "~/types/database.types";
import {LoaderCircle} from 'lucide-vue-next'

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const mealPlanStore = useMealPlanStore()

const loading = ref(false)

const {data: profile} = await useAsyncData('profile', async () => {
  const {data} = await supabase.from('profiles')
      .select('first_name')
      .eq('id', user.value?.id)
      .single()
  return data
})

const insertMealPlan = async () => {
  try {
    const storedMealPlan = localStorage.getItem('meal-plan');
    if (!storedMealPlan) return;
    const existingMealPlan = JSON.parse(storedMealPlan)

    const {data, error: profileError} = await supabase.from('profiles')
        .select('personal_information')
        .eq('id', user.value?.id)
        .single()
    if (profileError) throw profileError

    await mealPlanStore.setRemainingMealPlan(data.personal_information)

    const fullMealPlan = mealPlanStore.mealPlan.concat(existingMealPlan)

    const {error} = await supabase.from('meal_plans').upsert(
        {
          user_id: user.value?.id,
          meal_plan: fullMealPlan
        }, {
          onConflict: 'user_id'
        }
    )
    if (error) throw error

    localStorage.removeItem('meal-plan')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await insertMealPlan()
})
</script>

<template>
  <LayoutContainer>
    <h1 class="h2 mb-6">Hi{{ profile?.first_name ? ` ${profile?.first_name}` : ''}}!</h1>
    <div v-if="loading" class="h-svh flex flex-col items-center justify-center">
      <h2>We're almost done</h2>
      <p class="text-muted-foreground">We're now generating the meal plan for the remaining days.</p>
      <LoaderCircle class="size-6 animate-spin text-primary mt-6"/>
    </div>
    <div v-else>
      <MealPlan/>
    </div>
  </LayoutContainer>
</template>

<style scoped>

</style>