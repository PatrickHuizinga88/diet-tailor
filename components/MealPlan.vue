<script setup lang="ts">
import {ArrowRight, CheckCircle, Lock} from "lucide-vue-next";
import NutritionDetailItem from "~/components/wizard/NutritionDetailItem.vue";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "~/components/ui/tabs";
import NutritionDetailList from "~/components/wizard/NutritionDetailList.vue";

const props = withDefaults(defineProps<{
  isTeaser?: boolean
}>(), {
  isTeaser: false
})

const mealPlanStore = useMealPlanStore()

const days = [
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

const register = ref(true)
</script>

<template>
  <Tabs default-value="Monday" class="w-full">
    <div class="overflow-hidden rounded-md mb-8">
      <TabsList class="overflow-x-auto justify-stretch w-full">
        <TabsTrigger v-for="day in mealPlanStore.mealPlan" :value="day.day">
          {{ day.day }}
        </TabsTrigger>
        <TabsTrigger v-if="props.isTeaser" v-for="day in days" :value="day">
          {{ day }}
          <span class="sr-only">(locked)</span>
          <Lock class="size-3 inline-block ml-0.5" aria-hidden="true"/>
        </TabsTrigger>
      </TabsList>
    </div>
    <TabsContent v-for="day in mealPlanStore. mealPlan" :value="day.day" :key="day.day">
      <MealPlanDay :mealPlan="day"/>
      <div v-if="props.isTeaser" class="bg-primary text-primary-foreground rounded-2xl p-4">
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
            <div>
              <h1 class="h2 mb-1">
                {{ register ? 'Register for free' : 'Sign in to your account'}}
              </h1>
              <p class="text-muted-foreground">
                {{
                  register ?
                      'Gain access to many features to fine-tune your personal diet.' :
                      "Welcome back! Let's save your new meal plan."
                }}
              </p>
            </div>
            <Register/>
          </DialogContent>
        </Dialog>
      </div>
    </TabsContent>
    <TabsContent v-if="props.isTeaser" v-for="day in days" :value="day" :key="day" class="relative">
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
              <div>
                <h1 class="h2 mb-1">
                  {{ register ? 'Register for free' : 'Sign in to your account'}}
                </h1>
                <p class="text-muted-foreground">
                  {{
                    register ?
                        'Gain access to many features to fine-tune your personal diet.' :
                        "Welcome back! Let's save your new meal plan."
                  }}
                </p>
              </div>
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
</template>

<style scoped>

</style>