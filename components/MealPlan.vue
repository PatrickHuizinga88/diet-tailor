<script setup lang="ts">
import NutritionDetailItem from "~/components/wizard/NutritionDetailItem.vue";
import NutritionDetailList from "~/components/wizard/NutritionDetailList.vue";
import {Lock} from "lucide-vue-next";

const props = defineProps<{
  isTeaser?: boolean
}>()

const mealPlanStore = useMealPlanStore()

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

const emit = defineEmits(['clickPremiumFeature'])
</script>

<template>
  <h3 class="h4 mb-3">Nutrition Overview</h3>
  <dl class="bg-muted rounded-lg text-sm divide-y divide-border px-2 mb-8">
    <div class="flex items-center justify-between py-2">
      <dt class="font-medium">Calories</dt>
      <dd>{{ mealPlanStore.mealPlan.nutritionOverview.calories }}</dd>
    </div>
    <div class="flex items-center justify-between py-2">
      <dt class="font-medium">Protein</dt>
      <dd>{{ mealPlanStore.mealPlan.nutritionOverview.protein }}</dd>
    </div>
    <div class="flex items-center justify-between py-2">
      <dt class="font-medium">Carbs</dt>
      <dd>{{ mealPlanStore.mealPlan.nutritionOverview.carbs }}</dd>
    </div>
    <div class="flex items-center justify-between py-2">
      <dt class="font-medium">Fats</dt>
      <dd>{{ mealPlanStore.mealPlan.nutritionOverview.fats }}</dd>
    </div>
  </dl>
  <div class="border rounded-2xl space-y-8 p-4">
    <div v-for="(meal, index) in mealPlanStore.mealPlan.meals" :key="`meal-${index}`">
      <h3 class="inline-flex items-center text-sm text-primary-dark font-sans font-medium bg-primary/10 rounded h-7 px-2 mb-2">
        {{ mealType(index.toString()) }}
      </h3>

      <template v-if="!('items' in meal)">
        <h4 class="mb-1">{{ meal.name }}</h4>
        <p class="text-sm text-muted-foreground mb-4">{{ meal.description }}</p>
        <NutritionDetailList>
          <NutritionDetailItem label="Calories" :value="meal.calories"/>
          <NutritionDetailItem label="Protein" :value="meal.protein"/>
          <NutritionDetailItem label="Carbs" :value="meal.carbs"/>
          <NutritionDetailItem label="Fats" :value="meal.fats"/>
        </NutritionDetailList>
        <div class="grid grid-cols-2 gap-4 mt-4">
          <Button @click="emit('clickPremiumFeature')" size="sm" variant="outline">
            Change {{ index }}
            <Lock v-if="props.isTeaser" class="size-3"/>
          </Button>
          <Button @click="emit('clickPremiumFeature')" size="sm" variant="outline" :as-child="!props.isTeaser">
            <a v-if="!props.isTeaser" href="#">
              View recipe
            </a>
            <template v-else>
              View recipe
              <Lock v-if="props.isTeaser" class="size-3"/>
            </template>
          </Button>
        </div>
      </template>

      <ul v-else class="space-y-6">
        <li v-for="snack in meal.items" :key="snack.name">
          <h4 class="mb-1">{{ snack.name }}</h4>
          <p class="text-sm text-muted-foreground mb-4">{{ snack.description }}</p>
          <NutritionDetailList>
            <NutritionDetailItem label="Calories" :value="snack.calories"/>
            <NutritionDetailItem label="Protein" :value="snack.protein"/>
            <NutritionDetailItem label="Carbs" :value="snack.carbs"/>
            <NutritionDetailItem label="Fats" :value="snack.fats"/>
          </NutritionDetailList>
          <Button @click="emit('clickPremiumFeature')" size="sm" variant="outline" class="w-full mt-4">
            Change snack
            <Lock v-if="props.isTeaser" class="size-3"/>
          </Button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>