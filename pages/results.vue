<script setup lang="ts">
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";
import NutritionDetailList from "~/components/wizard/NutritionDetailList.vue";
import NutritionDetailItem from "~/components/wizard/NutritionDetailItem.vue";
import {Heading, HeadingTitle, HeadingDescription} from "~/components/wizard/heading";

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
  <LayoutContainer
    class="flex flex-col h-full flex-1 sm:h-auto sm:flex-none overflow-y-auto pt-[calc(2rem+var(--header-height))]">
    <Heading>
      <HeadingTitle>{{
          response ? 'Your Personalized Meal Plan is Ready!' : 'Oops... Looks like something went wrong.'
        }}
      </HeadingTitle>
      <HeadingDescription>
        Based on your preferences, goals, and lifestyle, we've created a plan tailored to help you succeed.
      </HeadingDescription>
    </Heading>
    <h2 class="h3 text-primary-dark text-center w-full mb-6">Your Weekly Meal Plan</h2>
    <Tabs default-value="Monday" class="w-full pb-4">
      <div class="overflow-hidden rounded-md mb-8">
        <TabsList class="overflow-x-auto justify-stretch w-full">
          <TabsTrigger v-for="day in response" :value="day.day">
            {{ day.day }}
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent v-for="day in response" :value="day.day" :key="day.day">
        <h3 class="h4 mb-3">{{ day.day }}'s Nutrition Overview</h3>
        <dl class="bg-muted rounded-lg text-sm divide-y divide-border px-2 mb-8">
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Calories</dt>
            <dd>{{ day.nutritionOverview.calories }} kcal</dd>
          </div>
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Protein</dt>
            <dd>{{ day.nutritionOverview.protein }}</dd>
          </div>
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Carbs</dt>
            <dd>{{ day.nutritionOverview.carbs }}</dd>
          </div>
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Fats</dt>
            <dd>{{ day.nutritionOverview.fats }}</dd>
          </div>
        </dl>
        <Dialog>
          <DialogTrigger as-child>
            <Button size="lg" class="w-full mb-8">
                Save and customize plan
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Register/>
          </DialogContent>
        </Dialog>
        <div class="border rounded-2xl space-y-8 p-4">
          <div v-for="(meal, index) in day.meals">
            <h3
              class="inline-flex items-center text-sm text-primary-dark font-sans font-medium bg-primary/10 rounded h-7 px-2 mb-2">
              {{ mealType(index.toString()) }}</h3>
            <template v-if="!meal.items">
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
      </TabsContent>
    </Tabs>
  </LayoutContainer>
</template>

<style scoped>

</style>