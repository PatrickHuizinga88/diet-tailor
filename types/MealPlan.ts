export interface Meal {
  id: string,
  name: string;
  description: string;
  calories: string;
  protein: string;
  carbs: string;
  fats: string;
}

export interface MealPlan {
  nutritionOverview: {
    calories: string;
    protein: string;
    carbs: string;
    fats: string;
  };
  meals: {
    type: string;
    items: Meal[]
  }[];
}