<script setup lang="ts">
import type {Database} from "~/types/database.types";

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const mealPlanStore = useMealPlanStore()
const dayjs = useDayjs()

const loading = ref(true)

const greeting = computed(() => {
  const hour = dayjs().hour()
  if (hour >= 5 && hour < 12) return 'Good morning'
  if (hour >= 12 && hour < 18) return 'Good afternoon'
  if (hour >= 18 && hour < 22) return 'Good evening'
  return 'Good night'
})

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

const {data: mealPlan, status} = await useLazyAsyncData('meal-plan', async () => {
  try {
    const {data, error} = await supabase.from('meal_plans')
        .select('meal_plan')
        .eq('user_id', user.value?.id)
        .single()
    if (error) throw error
    mealPlanStore.setMealPlan(data?.meal_plan)

    return data
  } catch (error) {
    console.error(error)
  }
}, {
  immediate: false,
  watch: [loading]
})

const saveMealPlan = async () => {
  try {
    const storedMealPlan = localStorage.getItem('meal-plan')
    if (!storedMealPlan) return

    const {data: profile} = await supabase
        .from('profiles')
        .select('personal_information')
        .eq('id', user.value?.id)
        .single()
    if (!profile) throw new Error('Profile not found')

    const {error} = await supabase.from('meal_plans').upsert(
        {
          user_id: user.value?.id,
          meal_plan: mealPlanStore.mealPlan
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
  await saveMealPlan()
})
</script>

<template>
  <LayoutContainer>
    <h1 class="h3 mb-6">{{ `${greeting} ${profile?.first_name ? ' ' + profile?.first_name : ''}!`}}</h1>
    <div v-if="loading || status === 'pending'">
      <Skeleton class="h-8 w-full max-w-[250px] mb-6"/>
      <Skeleton class="h-[150px] w-full mb-8"/>
      <div class="border p-4 rounded-2xl">
        <Skeleton class="h-6 w-[100px] mb-4"/>
        <Skeleton class="h-6 w-full max-w-[200px] mb-4"/>
        <Skeleton class="h-4 w-full mb-2"/>
        <Skeleton class="h-4 w-[100px]"/>
      </div>
    </div>
    <div v-else-if="mealPlan">
      <MealPlan/>
    </div>
    <div v-else>
      <p class="text-muted-foreground">No meal plan found.</p>
    </div>
  </LayoutContainer>
</template>

<style scoped>

</style>