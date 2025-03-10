<script setup lang="ts">
import type {Database} from "~/types/database.types";

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const loading = ref(true)

const insertMealPlan = async () => {
  try {
    if (!localStorage.getItem('meal-plan')) return
    const mealPlan = localStorage.getItem('meal-plan')

    const {error} = await supabase.from('meal_plans').upsert(
        {
          user_id: user.value?.id,
          meal_plan: JSON.parse(mealPlan)
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
  await insertMealPlan()
})
</script>

<template>

</template>

<style scoped>

</style>