import {defineStore} from "pinia";
import exampleResponse from "../data/exampleResponse.json";

interface Meal {
  name: string;
  description: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

interface MealPlanDay {
  day: string;
  nutritionOverview: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
  meals: {
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: {
      items: Meal[];
    };
  };
}

export const useMealPlanStore = defineStore('mealPlanStore', {
  state: () => ({
    mealPlan: [] as MealPlanDay[]
    // mealPlan: exampleResponse as MealPlanDay[]
  }),
  actions: {
    async setMealPlanTeaser(body: any) {
      const response = await $fetch<MealPlanDay[]>('/api/generate-plan', {
        method: 'POST',
        query: {daysAmount: 2},
        body
      })
      if (!response) throw new Error('Failed to generate meal plan')

      this.mealPlan = response
    },

    async setMealPlan(body: any) {
      const response = await $fetch<MealPlanDay[]>('/api/generate-plan', {
        method: 'POST',
        query: {daysAmount: 5},
        body
      })
      if (!response) return

      this.mealPlan = [...this.mealPlan, ...response]
    }
  }
})