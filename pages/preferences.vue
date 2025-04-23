<script setup lang="ts">
import type {Database} from "~/types/database.types";
import DetailValue from "~/components/DetailValue.vue";
import {Pencil} from "lucide-vue-next";

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const {data: profile, status} = await useLazyAsyncData('profile', async () => {
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

const activityLevel = computed(() => {
  switch (profile.value.personal_information.activity_level) {
    case 'sedentary':
      return 'Little or no exercise'
    case 'lightly_active':
      return 'Exercising 1-3 days per week'
    case 'moderately_active':
      return 'Exercising 3-5 days per week'
    case 'very_active':
      return 'Exercising 6-7 days per week'
    case 'super_active':
      return 'More than once every day'
  }
})

const primaryGoal = computed(() => {
  switch (profile.value.personal_information.primary_goal) {
    case 'lose_weight':
      return 'Lose weight'
    case 'gain_weight':
      return 'Gain weight'
    case 'maintain_weight':
      return 'Maintain current weight'
    case 'build_muscle':
      return 'Build muscle'
    case 'improve_health':
      return 'Improve general health'
  }
})

// Food Preferences
const dietType = computed(() => {
  const value = profile.value?.personal_information.diet_type
  switch (value) {
    case 'no_preference':
      return 'No preference'
    case 'vegetarian':
      return 'Vegetarian'
    case 'vegan':
      return 'Vegan'
    case 'pescatarian':
      return 'Pescatarian'
    case 'ketogenic':
      return 'Ketogenic'
    case 'low-carb':
      return 'Low-carb'
    case 'other':
      return 'Other'
    default:
      return value || '-'
  }
})

const allergies = computed(() => {
  const val = profile.value?.personal_information.allergies
  if (!val) return '-'
  return Array.isArray(val) ? val.join(`, `) : val
})

const adventurousFood = computed(() => {
  const value = profile.value?.personal_information.adventurous_food
  switch (value) {
    case 'new_foods':
      return 'I love trying new foods'
    case 'familiar_foods':
      return 'I prefer familiar foods'
    case 'in_between':
      return 'Somewhere in between'
    default:
      return value || '-'
  }
})

const favoriteCuisine = computed(() => {
  const val = profile.value?.personal_information.favorite_cuisine
  if (!val) return '-'
  return Array.isArray(val)
      ? val.map(item => capitalize(item)).join(', ')
      : val;
})

const foodDislike = computed(() => {
  const val = profile.value?.personal_information.food_dislike
  if (!val) return '-'
  return Array.isArray(val)
      ? val.map(item => capitalize(item)).join(', ')
      : val;
})

// Practical Considerations
const timeRestrictions = computed(() => {
  const value = profile.value?.personal_information.time_restrictions
  switch (value) {
    case 'less_than_15':
      return 'Less than 15 minutes'
    case '15-30':
      return '15-30 minutes'
    case '30-60':
      return '30-60 minutes'
    case 'no_time_limit':
      return 'No time limit'
    default:
      return value || undefined
  }
})

const mealsAmount = computed(() => {
  const value = profile.value?.personal_information.meals_amount
  switch (value) {
    case '3_meals_0_snacks':
      return '3 meals'
    case '3_meals_1_snacks':
      return '3 meals + 1 snack'
    case '3_meals_2_snacks':
      return '3 meals + 2 snacks'
    default:
      return value || undefined
  }
})

// Advanced Preferences
const healthOptimizations = computed(() => {
  const val = profile.value?.personal_information.health_optimizations;
  if (!val) return '-';
  const mapToLabel = (item: string) => {
    const option = healthOptimizationsOptions.find(o => o.value === item);
    return option ? option.label : item;
  };
  return Array.isArray(val) ? val.map(mapToLabel).join(', ') : mapToLabel(val);
});

const healthOptimizationsOptions = [
  {label: "Lower cholesterol", value: "lower_cholesterol"},
  {label: "Stabilize blood sugar", value: "stabilize_blood_sugar"},
  {label: "Increase energy levels", value: "increase_energy"},
  {label: "Reduce inflammation", value: "reduce_inflammation"},
  {label: "Improve athletic performance", value: "improve_performance"},
  {label: "Other", value: "other", isOther: true}
]
</script>

<template>
  <LayoutContainer>
    <div class="space-y-6">
      <div class="flex justify-between items-center">
        <h1 class="h3">Your preferences</h1>

        <Button variant="outline" size="sm" as-child>
          <NuxtLink to="/wizard">
            <Pencil/>
            Edit
          </NuxtLink>
        </Button>
      </div>

      <template v-if="status === 'pending'">
        <div class="space-y-2">
          <Skeleton class="h-4 w-[100px]"/>
          <Skeleton class="h-4 w-full max-w-[200px]"/>
          <Skeleton class="h-4 w-full"/>
          <Skeleton class="h-4 w-[100px]"/>
        </div>
      </template>

      <template v-else-if="profile">
        <div>
          <h2 class="h4 mb-4">Personal Information</h2>
          <dl>
            <DetailValue title="Age" :value="`${profile.personal_information.age} years old`"/>
            <DetailValue title="Height" :value="`${profile.personal_information.height} cm`"/>
            <DetailValue title="Weight" :value="`${profile.personal_information.weight} kg`"/>
            <DetailValue title="Activity level" :value="activityLevel"/>
          </dl>
        </div>

        <div>
          <h2 class="h4 mb-4">Health Goals</h2>
          <dl>
            <DetailValue title="Primary goal" :value="primaryGoal"/>
          </dl>
        </div>

        <div>
          <h2 class="h4 mb-4">Food Preferences</h2>
          <dl>
            <DetailValue title="Diet type" :value="dietType"/>
            <DetailValue title="Allergies" :value="allergies"/>
            <DetailValue title="Adventurous with food" :value="adventurousFood"/>
            <DetailValue title="Favorite cuisine" :value="favoriteCuisine"/>
            <DetailValue title="Foods to avoid" :value="foodDislike"/>
          </dl>
        </div>

        <div>
          <h2 class="h4 mb-4">Practical Considerations</h2>
          <dl>
            <DetailValue title="Time restrictions" :value="timeRestrictions"/>
            <DetailValue title="Meals per day" :value="mealsAmount"/>
          </dl>
        </div>

        <div>
          <h2 class="h4 mb-4">Advanced Preferences</h2>
          <dl>
            <DetailValue title="Health optimizations" :value="healthOptimizations"/>
          </dl>
        </div>
      </template>
    </div>
  </LayoutContainer>
</template>

<style scoped>

</style>