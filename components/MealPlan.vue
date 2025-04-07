<script setup lang="ts">
import NutritionDetailItem from "~/components/wizard/NutritionDetailItem.vue";
import NutritionDetailList from "~/components/wizard/NutritionDetailList.vue";
import {Lock} from "lucide-vue-next";
import ChangeMealDialog from "~/components/ChangeMealDialog.vue";

const props = defineProps<{
  isTeaser?: boolean
}>()

const mealPlanStore = useMealPlanStore()

const currentMeal = ref<string | undefined>(undefined)
const currentMealItem = ref(undefined)
const changeMealDialog = useTemplateRef('change-meal-dialog')

const openChangeMealDialog = async (mealType: string, item: any) => {
  currentMeal.value = mealType
  currentMealItem.value = item

  await nextTick()
  if (changeMealDialog.value) {
    changeMealDialog.value.open = true
  }
}

const emit = defineEmits(['clickPremiumFeature'])
</script>

<template>
  <template v-if="mealPlanStore.mealPlan">
    <h3 class="h4 mb-3">Daily Nutrition Overview</h3>
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
          {{ meal.type }}
        </h3>

        <ul class="space-y-6">
          <li v-for="item in meal.items">
            <h4 class="mb-1">{{ item.name }}</h4>
            <p class="text-sm text-muted-foreground mb-4">{{ item.description }}</p>
            <NutritionDetailList>
              <NutritionDetailItem label="Calories" :value="item.calories"/>
              <NutritionDetailItem label="Protein" :value="item.protein"/>
              <NutritionDetailItem label="Carbs" :value="item.carbs"/>
              <NutritionDetailItem label="Fats" :value="item.fats"/>
            </NutritionDetailList>
            <div class="grid grid-cols-1 gap-4 mt-2">
              <Button @click="props.isTeaser ? emit('clickPremiumFeature') : openChangeMealDialog(meal.type, item)" size="sm" variant="outline">
                Change {{ meal.type }}
                <Lock v-if="props.isTeaser" class="size-3"/>
              </Button>
              <!--              <Button @click="emit('clickPremiumFeature')" size="sm" variant="outline" :as-child="!props.isTeaser">-->
              <!--                View recipe-->
              <!--                <Lock v-if="props.isTeaser" class="size-3"/>-->
              <!--              </Button>-->
            </div>
          </li>
        </ul>
      </div>
    </div>
    <ChangeMealDialog ref="change-meal-dialog" :mealType="currentMeal" :item="currentMealItem"/>
  </template>
  <p v-else class="block text-center text-muted-foreground">
    No meal plan available.
  </p>
</template>

<style scoped>

</style>