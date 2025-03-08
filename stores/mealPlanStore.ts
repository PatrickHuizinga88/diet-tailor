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
    async setMealPlan(body: any) {
      const response = await $fetch('/api/completion', {
        method: 'POST',
        body
      })
      if (!response.ok || !response.body) {
        throw new Error('Stream not supported or request failed');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let aggregatedData = '';

      const readStream = (): Promise<void> => {
        return reader.read().then(({done, value}) => {
          if (done) {
            try {
              const parsedData = JSON.parse(aggregatedData) as MealPlanDay[];
              this.mealPlan = parsedData;
            } catch (error) {
              console.error('Error parsing JSON:', error);
            }
            console.log(`Stream finished`);
            return;
          }
          aggregatedData += decoder.decode(value, {stream: true});
          return readStream();
        });
      }

      await readStream();

      // this.mealPlan = [...this.mealPlan, value]
    }
  }
})