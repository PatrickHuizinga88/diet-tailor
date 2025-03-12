<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import {Toaster} from "~/components/ui/toast";
import type {Database} from "~/types/database.types";

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const toastStore = useToastStore();
const mealPlanStore = useMealPlanStore()

const finishMealPlan = async () => {
  try {
    const storedMealPlan = localStorage.getItem('meal-plan')
    if (!storedMealPlan) return

    const existingMealPlan = JSON.parse(storedMealPlan)

    const {data: profile} = await supabase
        .from('profiles')
        .select('personal_information')
        .eq('id', user.value?.id)
        .single()
    if (!profile) throw new Error('Profile not found')

    await mealPlanStore.generateRemainingMealPlan(profile.personal_information)

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
  }
}

onMounted(async () => {
  await finishMealPlan()
})
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))"/>

  <div class="flex flex-col">
    <Header/>

    <div class="flex-1 pt-8">
      <slot/>
    </div>
  </div>

  <Toaster :toasts="toastStore.toasts" />

</template>