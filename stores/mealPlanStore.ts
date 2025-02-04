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
    // mealPlan: [] as MealPlanDay[]
    mealPlan: exampleResponse as MealPlanDay[]
  }),
  actions: {
    setMealPlan(value: MealPlanDay[]) {
      this.mealPlan = value
    }
  }
})