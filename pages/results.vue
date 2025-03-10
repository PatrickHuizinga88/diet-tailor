<script setup lang="ts">
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";
import NutritionDetailList from "~/components/wizard/NutritionDetailList.vue";
import NutritionDetailItem from "~/components/wizard/NutritionDetailItem.vue";
import {Heading, HeadingTitle, HeadingDescription} from "~/components/wizard/heading";
import {ArrowRight, Lock, CheckCircle} from "lucide-vue-next";

const days = [
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const mealPlanStore = useMealPlanStore()

const mealPlan = mealPlanStore.mealPlan

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

const buttonClick = () => {
  mealPlanStore.setMealPlan({
    activity_level: "lightly_active",
    age: 25,
    gender: "male",
    height: 183,
    weight: 76
  })
}
</script>

<template>
  <LayoutContainer
      class="relative flex flex-col h-full flex-1 sm:h-auto sm:flex-none overflow-y-auto pt-[calc(2rem+var(--header-height))] pb-8">
    <Heading class="text-center">
      <HeadingTitle>
        {{ mealPlan ? 'Your Personalized Meal Plan is Ready!' : 'Oops... Looks like something went wrong.' }}
      </HeadingTitle>
      <HeadingDescription>
        Based on your preferences, goals, and lifestyle, we've created a plan tailored to help you succeed.
      </HeadingDescription>
    </Heading>
    <!--    <Button @click="buttonClick">button</Button>-->
    <h2 class="h3 text-primary-dark text-center w-full mb-6">Your Weekly Meal Plan</h2>
    <Tabs default-value="Monday" class="w-full">
      <div class="overflow-hidden rounded-md mb-8">
        <TabsList class="overflow-x-auto justify-stretch w-full">
          <TabsTrigger v-for="day in mealPlan" :value="day.day">
            {{ day.day }}
          </TabsTrigger>
          <TabsTrigger v-for="day in days" :value="day">
            {{ day }}
            <span class="sr-only">(locked)</span>
            <Lock class="size-3 inline-block ml-0.5" aria-hidden="true"/>
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent v-for="day in mealPlan" :value="day.day" :key="day.day">
        <h3 class="h4 mb-3">{{ day.day }}'s Nutrition Overview</h3>
        <dl class="bg-muted rounded-lg text-sm divide-y divide-border px-2 mb-8">
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Calories</dt>
            <dd>{{ day.nutritionOverview.calories }}</dd>
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
        <div class="border rounded-2xl space-y-8 p-4 mb-6">
          <div v-for="(meal, index) in day.meals">
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
        <div class="bg-primary text-primary-foreground rounded-2xl p-4">
          <h3 class="mb-4">Unlock Your Personalized Meal Plan</h3>
          <p class="sr-only">Includes the following features:</p>
          <ul class="space-y-2.5 mb-6">
            <li class="flex items-center">
              <CheckCircle class="size-5 mr-2" aria-hidden="true"/>
              View your full weekly meal plan</li>
            <li class="flex items-center">
              <CheckCircle class="size-5 mr-2" aria-hidden="true"/>
              Save and customize your meals</li>
            <li class="flex items-center">
              <CheckCircle class="size-5 mr-2" aria-hidden="true"/>
              Get AI-powered recommendations</li>
          </ul>
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="outline" size="lg" class="w-full text-foreground border-none">
                Sign up for free
                <ArrowRight/>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <Register/>
            </DialogContent>
          </Dialog>
        </div>
      </TabsContent>
      <TabsContent v-for="day in days" :value="day" :key="day" class="relative">
        <h3 class="h4 mb-3">{{ day }}'s Nutrition Overview</h3>
        <dl class="bg-muted rounded-lg text-sm divide-y divide-border px-2 mb-8">
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Calories</dt>
            <dd>1234 kcal</dd>
          </div>
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Protein</dt>
            <dd>123 g</dd>
          </div>
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Carbs</dt>
            <dd>123 g</dd>
          </div>
          <div class="flex items-center justify-between py-2">
            <dt class="font-medium">Fats</dt>
            <dd>123 g</dd>
          </div>
        </dl>
        <div class="border rounded-2xl space-y-8 p-4">
          <h3 class="inline-flex items-center text-sm text-primary-dark font-sans font-medium bg-primary/10 rounded h-7 px-2 mb-2">
            Breakfast
          </h3>
          <h4 class="mb-1">Name of the Meal</h4>
          <p class="text-sm text-muted-foreground mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <NutritionDetailList>
            <NutritionDetailItem label="Calories" value="123 kcal"/>
            <NutritionDetailItem label="Protein" value="123 g"/>
            <NutritionDetailItem label="Carbs" value="123 g"/>
            <NutritionDetailItem label="Fats" value="123 g"/>
          </NutritionDetailList>
        </div>
        <div class="absolute -inset-y-4 -inset-x-4 backdrop-blur-[6px] px-6 bg-gradient-to-b from-background/20 to-background">
          <div class="bg-primary/90 text-primary-foreground rounded-2xl p-4 mt-12">
            <h3 class="mb-4">Unlock Your Personalized Meal Plan</h3>
            <ul class="space-y-2.5 mb-6">
              <li class="flex items-center">
                <CheckCircle class="size-5 mr-2"/>
                View your full weekly meal plan</li>
              <li class="flex items-center">
                <CheckCircle class="size-5 mr-2"/>
                Save and customize your meals</li>
              <li class="flex items-center">
                <CheckCircle class="size-5 mr-2"/>
                Get AI-powered recommendations</li>
            </ul>
            <Dialog>
              <DialogTrigger as-child>
                <Button variant="outline" size="lg" class="w-full text-foreground border-none">
                  Sign up for free
                  <ArrowRight/>
                </Button>
              </DialogTrigger>
              <DialogContent>
                <Register/>
              </DialogContent>
            </Dialog>
          </div>
<!--          <div class="flex flex-col items-center text-lg text-center font-semibold mt-20">-->
<!--            Sign up now to get access to all meals and unlock more features for free.-->
<!--            <Dialog>-->
<!--              <DialogTrigger as-child>-->
<!--                <Button size="sm" class="mt-4">-->
<!--                  Sign up-->
<!--                </Button>-->
<!--              </DialogTrigger>-->
<!--              <DialogContent>-->
<!--                <Register/>-->
<!--              </DialogContent>-->
<!--            </Dialog>-->
<!--          </div>-->
        </div>
      </TabsContent>
    </Tabs>
<!--    <div class="fixed bottom-6 sm:px-4 w-[calc(100vw-2rem)] sm:w-full max-w-3xl">-->
<!--      <Dialog>-->
<!--        <DialogTrigger as-child>-->
<!--          <Button size="xl" class="w-full shadow-[0_0_50px_-8px] shadow-primary/75">-->
<!--            Save and customize plan-->
<!--            <ArrowRight/>-->
<!--          </Button>-->
<!--        </DialogTrigger>-->
<!--        <DialogContent>-->
<!--          <Register/>-->
<!--        </DialogContent>-->
<!--      </Dialog>-->
<!--    </div>-->
  </LayoutContainer>
</template>

<style scoped>

</style>