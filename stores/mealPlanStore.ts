import {defineStore} from "pinia";
import exampleResponse from "../data/exampleResponse.json";
import type {MealPlanDay} from "~/types/MealPlanDay";

export const useMealPlanStore = defineStore('mealPlanStore', {
  state: () => ({
    // mealPlan: [] as MealPlanDay[]
    mealPlan: exampleResponse as MealPlanDay[],
    isPending: false
  }),
  actions: {
    async generateMealPlanTeaser(body: any) {
      const response = await $fetch<MealPlanDay[]>('/api/generate-plan', {
        method: 'POST',
        query: {daysAmount: 2},
        body
      })
      if (!response) throw new Error('Failed to generate meal plan')

      this.mealPlan = response
    },

    async generateRemainingMealPlan(body: any) {
      this.isPending = true
      const response = await $fetch<MealPlanDay[]>('/api/generate-plan', {
        method: 'POST',
        query: {daysAmount: 5},
        body
      })
      if (!response) return

      this.mealPlan = [...this.mealPlan, ...response]
      this.isPending = false
    },

    setMealPlan(mealPlan: MealPlanDay[]) {
      this.mealPlan = mealPlan
    }
  }
})