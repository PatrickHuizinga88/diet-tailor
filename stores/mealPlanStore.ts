import {defineStore} from "pinia";
import exampleResponse from "../data/exampleResponse.json";
import type {Meal, MealPlan} from "~/types/MealPlan";

export const useMealPlanStore = defineStore('mealPlanStore', {
  state: () => ({
    mealPlan: undefined as MealPlan | undefined,
    // mealPlan: exampleResponse as MealPlan,
    isPending: false
  }),
  actions: {
    async generateMealPlan(body: any) {
      const response = await $fetch<MealPlan>('/api/generate-plan', {
        method: 'POST',
        body
      })
      if (!response) throw new Error('Failed to generate meal plan')

      this.mealPlan = response
    },

    setMealPlan(mealPlan: MealPlan) {
      this.mealPlan = mealPlan
    },

    setMeal(mealId: string, newMeal: Meal) {
      if (!this.mealPlan) return;
      this.mealPlan.meals.forEach(meal => {
        meal.items = meal.items.map(item =>
          item.id === mealId ? newMeal : item
        );
      });
    }
  }
})