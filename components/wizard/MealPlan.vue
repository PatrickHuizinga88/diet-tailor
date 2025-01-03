<script setup lang="ts">
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";
import NutritionDetailList from "~/components/wizard/NutritionDetailList.vue";
import NutritionDetailItem from "~/components/wizard/NutritionDetailItem.vue";
import Heading from "~/components/wizard/Heading.vue";
import {RotateCcw} from "lucide-vue-next";

defineProps<{
  response: any
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

defineEmits(['retryResponse'])
</script>

<template>
  <section id="heading" class="text-center mb-16">
    <Heading
        :heading="response ? 'Your Personalized Meal Plan is Ready!' : 'Oops... Looks like something went wrong.'"
        description="Based on your preferences, goals, and lifestyle, we've created a plan tailored to help you succeed."
    />
  </section>
  <template v-if="response">
    <h2 class="h3 text-primary-dark text-center w-full mb-6">Your Weekly Meal Plan</h2>
    <Tabs default-value="Monday" class="w-full pb-4">
      <div class="overflow-hidden rounded-md mb-8">
        <TabsList class="overflow-x-auto justify-stretch w-full">
          <TabsTrigger v-for="day in response.mealPlan" :value="day.day">
            {{ day.day }}
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent v-for="day in response.mealPlan" :value="day.day" :key="day.day">
        <h3 class="h4 mb-3">{{ day.day }}'s Nutrition Overview</h3>
        <dl class="bg-muted rounded-lg text-sm divide-y divide-border px-2 mb-8">
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Calories</dt>
            <dd>{{ day.nutritionOverview.calories }} kcal</dd>
          </div>
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Protein</dt>
            <dd>{{ day.nutritionOverview.protein.amount + day.nutritionOverview.protein.unit }}</dd>
          </div>
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Carbs</dt>
            <dd>{{ day.nutritionOverview.carbs.amount + day.nutritionOverview.carbs.unit }}</dd>
          </div>
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Fats</dt>
            <dd>{{ day.nutritionOverview.fats.amount + day.nutritionOverview.fats.unit }}</dd>
          </div>
        </dl>
        <Button size="lg" class="group w-full mb-8" asChild>
          <NuxtLink to="/login">
            Save and customize plan
          </NuxtLink>
        </Button>
        <div class="border rounded-2xl space-y-8 p-4">
          <div v-for="(meal, index) in day.meals">
            <h3 class="inline-flex items-center text-sm text-primary-dark font-sans font-medium bg-primary/10 rounded h-7 px-2 mb-2">{{ mealType(index.toString()) }}</h3>
            <template v-if="!meal.items">
              <h4 class="mb-1">{{ meal.name }}</h4>
              <p class="text-sm text-muted-foreground mb-4">{{ meal.description }}</p>
              <NutritionDetailList v-if="meal.nutritionDetails">
                <NutritionDetailItem label="Calories" :amount="meal.nutritionDetails.calories" unit="kcal"/>
                <NutritionDetailItem label="Protein" :amount="meal.nutritionDetails.protein.amount"
                                     :unit="meal.nutritionDetails.protein.unit"/>
                <NutritionDetailItem label="Carbs" :amount="meal.nutritionDetails.carbs.amount"
                                     :unit="meal.nutritionDetails.carbs.unit"/>
                <NutritionDetailItem label="Fats" :amount="meal.nutritionDetails.fats.amount"
                                     :unit="meal.nutritionDetails.fats.unit"/>
              </NutritionDetailList>
            </template>
            <ul v-else class="space-y-4">
              <li v-for="snack in meal.items">
                <h4 class="mb-1">{{ snack.name }}</h4>
                <p class="text-sm text-muted-foreground mb-4">{{ snack.description }}</p>
                <NutritionDetailList v-if="snack.nutritionDetails">
                  <NutritionDetailItem label="Calories" :amount="snack.nutritionDetails.calories" unit="kcal"/>
                  <NutritionDetailItem label="Protein" :amount="snack.nutritionDetails.protein.amount"
                                       :unit="snack.nutritionDetails.protein.unit"/>
                  <NutritionDetailItem label="Carbs" :amount="snack.nutritionDetails.carbs.amount"
                                       :unit="snack.nutritionDetails.carbs.unit"/>
                  <NutritionDetailItem label="Fats" :amount="snack.nutritionDetails.fats.amount"
                                       :unit="snack.nutritionDetails.fats.unit"/>
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
      </TabsContent>
    </Tabs>
  </template>
  <template v-else>
    <div class="flex justify-center">
      <Button size="lg" class="group w-full" @click="$emit('retryResponse')">
        <RotateCcw class="size-5 mr-2 group-hover:-rotate-[360deg] duration-500"/>
        Let's try again
      </Button>
    </div>
  </template>
</template>

<style scoped>

</style>