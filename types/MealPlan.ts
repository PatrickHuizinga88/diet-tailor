interface Meal {
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
    breakfast: Meal;
    lunch: Meal;
    dinner: Meal;
    snacks: {
      items: Meal[];
    };
  };
}