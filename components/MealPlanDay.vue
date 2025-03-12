<script setup lang="ts">
import NutritionDetailItem from "~/components/wizard/NutritionDetailItem.vue";
import NutritionDetailList from "~/components/wizard/NutritionDetailList.vue";
import type {MealPlanDay} from "~/types/MealPlanDay";

const props = defineProps<{
  mealPlan: MealPlanDay,
  isToday?: boolean
}>()

const mealType = (index: string) => {
  switch (index) {
    case 'breakfast':
      return 'Breakfast'
    case 'lunch':
      return 'Lunch'
    case 'dinner':
      return 'Dinner'
    default:
      return 'Snacks'
  }
}
</script>

<template>
  <h3 class="h4 mb-3">{{ props.isToday ? 'Today' : mealPlan.day }}'s Nutrition Overview</h3>
  <dl class="bg-muted rounded-lg text-sm divide-y divide-border px-2 mb-8">
    <div class="flex items-center justify-between py-2">
      <dt class="font-medium">Calories</dt>
      <dd>{{ mealPlan.nutritionOverview.calories }}</dd>
    </div>
    <div class="flex items-center justify-between py-2">
      <dt class="font-medium">Protein</dt>
      <dd>{{ mealPlan.nutritionOverview.protein }}</dd>
    </div>
    <div class="flex items-center justify-between py-2">
      <dt class="font-medium">Carbs</dt>
      <dd>{{ mealPlan.nutritionOverview.carbs }}</dd>
    </div>
    <div class="flex items-center justify-between py-2">
      <dt class="font-medium">Fats</dt>
      <dd>{{ mealPlan.nutritionOverview.fats }}</dd>
    </div>
  </dl>
  <div class="border rounded-2xl space-y-8 p-4 mb-6">
    <div v-for="(meal, index) in mealPlan.meals">
      <h3
          class="inline-flex items-center text-sm text-primary-dark font-sans font-medium bg-primary/10 rounded h-7 px-2 mb-2">
        {{ mealType(index.toString()) }}</h3>
      <template v-if="!('items' in meal)">
        <h4 class="mb-1">{{ meal.name }}</h4>
        <p class="text-sm text-muted-foreground mb-4">{{ meal.description }}</p>
        <NutritionDetailList>
          <NutritionDetailItem label="Calories" :value="meal.calories"/>
          <NutritionDetailItem label="Protein" :value="meal.protein"/>
          <NutritionDetailItem label="Carbs" :value="meal.carbs"/>
          <NutritionDetailItem label="Fats" :value="meal.fats"/>
        </NutritionDetailList>
      </template>
      <ul v-else class="space-y-6">
        <li v-for="snack in meal.items">
          <h4 class="mb-1">{{ snack.name }}</h4>
          <p class="text-sm text-muted-foreground mb-4">{{ snack.description }}</p>
          <NutritionDetailList>
            <NutritionDetailItem label="Calories" :value="snack.calories"/>
            <NutritionDetailItem label="Protein" :value="snack.protein"/>
            <NutritionDetailItem label="Carbs" :value="snack.carbs"/>
            <NutritionDetailItem label="Fats" :value="snack.fats"/>
          </NutritionDetailList>
        </li>
      </ul>
      <!--          <div class="grid grid-cols-2 gap-4">-->
      <!--            <Button size="sm" variant="outline">Tweak {{ index }}</Button>-->
      <!--            <Button size="sm" variant="outline" asChild>-->
      <!--              <a href="#">View recipe</a>-->
      <!--            </Button>-->
      <!--          </div>-->
    </div>
  </div>
</template>

<style scoped>

</style>