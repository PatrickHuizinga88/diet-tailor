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
    <NutritionDetailItem label="Calories" :value="meal.nutritionDetails.calories"/>
    <NutritionDetailItem label="Protein" :value="meal.nutritionDetails.protein"/>
    <NutritionDetailItem label="Carbs" :value="meal.nutritionDetails.carbs"/>
    <NutritionDetailItem label="Fats" :value="meal.nutritionDetails.fats"/>
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