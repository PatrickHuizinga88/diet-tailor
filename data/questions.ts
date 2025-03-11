import type Question from "~/types/Question";

const questions: Question[] = [
  {
    id: "age",
    category: "Personal Information",
    question: "What is your age?",
    inputType: "number",
    placeholder: "Enter your age",
    suffix: "years old"
  },
  {
    id: "height",
    category: "Personal Information",
    question: "What is your height?",
    inputType: "number",
    suffix: "cm"
  },
  {
    id: "weight",
    category: "Personal Information",
    question: "What is your weight?",
    inputType: "number",
    suffix: "kg"
  },
  {
    id: "activity_level",
    category: "Personal Information",
    question: "What is your activity level?",
    options: [
      {label: "Little or no exercise", value: "sedentary"},
      {label: "Exercising 1-3 days per week", value: "lightly_active"},
      {label: "Exercising 3-5 days per week", value: "moderately_active"},
      {label: "Exercise 6-7 days per week", value: "very_active"},
      {label: "More than once every day", value: "super_active"}
    ]
  },
  {
    id: "primary_goal",
    category: "Health Goals",
    question: "What is your primary goal?",
    options: [
      {label: "Lose weight", value: "lose_weight"},
      {label: "Gain weight", value: "gain_weight"},
      {label: "Maintain current weight", value: "maintain_weight"},
      {label: "Build muscle", value: "build_muscle"},
      {label: "Improve general health", value: "improve_health"},
    ]
  },
  // {
  //   id: "weight_loss_goal",
  //   category: "Health Goals",
  //   question: "How much weight would you like to lose per week?",
  //   options: [
  //     {label: "0.25 kg (0.5 lbs)", value: "0.25kg"},
  //     {label: "0.5 kg (1 lbs)", value: "0.5kg", description: "Recommended"},
  //     {label: "1 kg (2 lbs)", value: "1kg", description: "For rapid results"}
  //   ],
  //   condition: "lose_weight"
  // },
  // {
  //   id: "health_goals",
  //   category: "Health Goals",
  //   question: "Do you have specific health goals?",
  //   options: [
  //     {label: "Lower cholesterol", value: "lowerCholesterol"},
  //     {label: "Stabilize blood sugar", value: "stabilizeBloodSugar"},
  //     {label: "Improve athletic performance", value: "improvePerformance"},
  //     {label: "Increase energy levels", value: "increaseEnergy"},
  //     {label: "Reduce inflammation", value: "reduceInflammation"},
  //     {label: "Other", value: "other", isOther: true}
  //   ],
  //   multiple: true
  // },
  {
    id: "diet_type",
    category: "Food Preferences",
    question: "What type of diet do you follow or prefer?",
    options: [
      {label: "No preference", value: "no_preference"},
      {label: "Vegetarian", value: "vegetarian"},
      {label: "Vegan", value: "vegan"},
      {label: "Pescatarian", value: "pescatarian"},
      {label: "Ketogenic", value: "ketogenic"},
      {label: "Low-carb", value: "low-carb"},
      {label: "Other", value: "other", isOther: true},
    ],
  },
  {
    id: "allergies",
    category: "Food Preferences",
    question: "Do you have any major food allergies or intolerances?",
    options: [
      { label: "None", value: "none" },
      { label: "Gluten", value: "gluten_free" },
      { label: "Lactose", value: "lactose_free" },
      { label: "Nuts", value: "nut_free" },
      { label: "Shellfish", value: "shellfish_free" },
      { label: "Other", value: "other", isOther: true }
    ],
    multiple: true
  },
  // {
  //   id: "medical_conditions",
  //   category: "Medical History",
  //   question: "Do you have any diagnosed medical conditions that influence your diet?",
  //   options: [
  //     {label: "Diabetes (Type 1 or Type 2)", value: "diabetes"},
  //     {label: "High cholesterol", value: "highCholesterol"},
  //     {label: "Hypertension", value: "hypertension"},
  //     {label: "Irritable Bowel Syndrome (IBS)", value: "ibs"},
  //     {label: "Food allergies", value: "foodAllergies"},
  //     {label: "Other", value: "other", isOther: true}
  //   ],
  //   multiple: true
  // },
  // {
  //   id: "medications",
  //   category: "Medical History",
  //   question: "Are you taking any medications or supplements that may affect your nutritional needs?",
  //   options: [
  //     {label: "Yes", value: "yes"},
  //     {label: "No", value: "no"}
  //   ]
  // },
  {
    id: "adventurous_food",
    category: "Food Preferences",
    question: "How adventurous are you with food choices?",
    options: [
      {label: "I love trying new foods", value: "new_foods"},
      {label: "I prefer familiar foods", value: "familiar_foods"},
      {label: "Somewhere in between", value: "in_between"},
    ],
  },
  {
    id: "favorite_cuisine",
    category: "Food Preferences",
    question: "What are your favorite types of cuisine?",
    options: [
      {label: "Italian", value: "italian"},
      {label: "Mexican", value: "mexican"},
      {label: "Indian", value: "indian"},
      {label: "Mediterranean", value: "mediterranean"},
      {label: "Asian", description: "e.g. Chinese, Japanese, Thai", value: "asian"},
      {label: "Other", value: "other", isOther: true},
    ],
    multiple: true
  },
  {
    id: "food_dislike",
    category: "Food Preferences",
    question: "Are there any foods you dislike or want to avoid?",
    options: [
      // Make conditional based on diet type
      {label: "Red meat", value: "red_meat"},
      {label: "Fish", value: "fish"},
      {label: "Eggs", value: "eggs"},
      {label: "Sugar", value: "sugar"},
      {label: "Poultry", value: "poultry"},
      {label: "Dairy", value: "dairy"},
      {label: "Soy", value: "soy"},
      {label: "Other", value: "other", isOther: true},
    ],
    multiple: true
  },
  {
    id: "time_restrictions",
    category: "Practical Considerations",
    question: "How much time can you spend preparing meals?",
    options: [
      {label: "Less than 15 minutes", value: "less_than_15"},
      {label: "15-30 minutes", value: "15-30"},
      {label: "30-60 minutes", value: "30-60"},
      {label: "No time limit", value: "no_time_limit"},
    ]
  },
  {
    id: "meals_amount",
    category: "Practical Considerations",
    question: "How many meals do you prefer to have each day?",
    options: [
      {label: "3 meals", description: "Breakfast, lunch and dinner", value: "3_meals"},
      {label: "4 meals", description: "3 meals + 1 snack", value: "4_meals"},
      {label: "5 meals", description: "3 meals + 2 snacks", value: "5_meals"},
      {label: "Other", value: "other", isOther: true},
    ]
  },
  {
    id: "health_optimizations",
    category: "Advanced Preferences",
    question: "Would you like to optimize your plan for specific health concerns?",
    options: [
      { label: "Lower cholesterol", value: "lower_cholesterol" },
      { label: "Stabilize blood sugar", value: "stabilize_blood_sugar" },
      { label: "Increase energy levels", value: "increase_energy" },
      { label: "Reduce inflammation", value: "reduce_inflammation" },
      { label: "Improve athletic performance", value: "improve_performance" },
      { label: "Other", value: "other", isOther: true }
    ],
    multiple: true
  }
]

export default questions;