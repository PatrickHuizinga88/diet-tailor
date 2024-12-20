<script setup lang="ts">

import NutritionDetailList from "~/components/wizard/NutritionDetailList.vue";
import NutritionDetailItem from "~/components/wizard/NutritionDetailItem.vue";

defineProps<{
  meal: any
  type: string
}>()
</script>

<template>
  <h4 class="mb-2">{{ type }}</h4>
  <p class="mb-4">{{ meal.name }}</p>
  <NutritionDetailList>
    <NutritionDetailItem label="Calories" :amount="meal.nutritionDetails.calories" unit="kcal"/>
    <NutritionDetailItem label="Protein" :amount="meal.nutritionDetails.protein.amount" :unit="meal.nutritionDetails.protein.unit"/>
    <NutritionDetailItem label="Carbs" :amount="meal.nutritionDetails.carbs.amount" :unit="meal.nutritionDetails.carbs.unit"/>
    <NutritionDetailItem label="Fats" :amount="meal.nutritionDetails.fats.amount" :unit="meal.nutritionDetails.fats.unit"/>
  </NutritionDetailList>
  <div class="grid grid-cols-2 gap-4">
    <Button size="sm" variant="outline">Tweak {{ type }}</Button>
    <Button size="sm" variant="outline" asChild>
      <a href="#">View recipe</a>
    </Button>
  </div>
</template>

<style scoped>

</style>