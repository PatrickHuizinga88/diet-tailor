import type QuestionCategory from "~/types/QuestionCategory";

const questionCategories: QuestionCategory[] = [
  {
    id: 1,
    name: "Personal Information",
    questions: [
      {
        id: "age",
        question: "What is your age?",
        inputType: "number",
        placeholder: "Enter your age",
        suffix: "years old"
      },
      {
        id: "gender",
        question: "What is your gender?",
        options: [
          {label: "Male", value: "male"},
          {label: "Female", value: "female"},
          {label: "Non-binary", value: "non_binary"},
          {label: "Prefer not to say", value: "prefer_not_to_say"}
        ]
      },
      {
        id: "height",
        question: "What is your height?",
        inputType: "number",
        suffix: "cm"
      },
      {
        id: "weight",
        question: "What is your weight?",
        inputType: "number",
        suffix: "kg"
      },
      {
        id: "activity_level",
        question: "What is your activity level?",
        options: [
          {label: "Little or no exercise", value: "sedentary"},
          {label: "Exercising 1-3 days per week", value: "lightly_active"},
          {label: "Exercising 3-5 days per week", value: "moderately_active"},
          {label: "Exercise 6-7 days per week", value: "very_active"},
          {label: "More than once every day", value: "super_active"}
        ]
      }
    ],
  },
  {
    id: 2,
    name:
      "Health Goals",
    questions:
      [
        {
          id: "primary_goal",
          question: "What is your primary goal?",
          options: [
            {label: "Lose weight", value: "lose_weight"},
            {label: "Gain weight", value: "gain_weight"},
            {label: "Maintain current weight", value: "maintain_weight"},
            {label: "Build muscle", value: "build_muscle"},
            {label: "Improve general health", value: "improve_health"},
          ]
        },
        {
          id: "weight_loss_goal",
          question: "How much weight would you like to lose per week?",
          options: [
            {label: "0.25 kg (0.5 lbs)", value: "0.25kg"},
            {label: "0.5 kg (1 lbs)", value: "0.5kg", description: "Recommended"},
            {label: "1 kg (2 lbs)", value: "1kg", description: "For rapid results"}
          ],
          condition: "lose_weight"
        },
        {
          id: "health_goals",
          question: "Do you have specific health goals?",
          options: [
            {label: "Lower cholesterol", value: "lowerCholesterol"},
            {label: "Stabilize blood sugar", value: "stabilizeBloodSugar"},
            {label: "Improve athletic performance", value: "improvePerformance"},
            {label: "Increase energy levels", value: "increaseEnergy"},
            {label: "Reduce inflammation", value: "reduceInflammation"},
            {label: "Other", value: "other", isOther: true}
          ],
          multiple: true
        }
      ]
  }
  ,
  {
    id: 3,
    name:
      "Medical History",
    questions:
      [
        {
          id: "dietary_restrictions",
          question: "Do you have any dietary restrictions?",
          options: [
            {label: "Gluten-free", value: "glutenFree"},
            {label: "Lactose-free", value: "lactoseFree"},
            {label: "Nut-free", value: "nutFree"},
            {label: "Shellfish-free", value: "shellfishFree"},
            {label: "Other", value: "other", isOther: true}
          ],
          multiple: true
        },
        {
          id: "medical_conditions",
          question: "Do you have any diagnosed medical conditions that influence your diet?",
          options: [
            {label: "Diabetes (Type 1 or Type 2)", value: "diabetes"},
            {label: "High cholesterol", value: "highCholesterol"},
            {label: "Hypertension", value: "hypertension"},
            {label: "Irritable Bowel Syndrome (IBS)", value: "ibs"},
            {label: "Food allergies", value: "foodAllergies"},
            {label: "Other", value: "other", isOther: true}
          ],
          multiple: true
        },
        {
          id: "medications",
          question: "Are you taking any medications or supplements that may affect your nutritional needs?",
          options: [
            {label: "Yes", value: "yes"},
            {label: "No", value: "no"}
          ]
        }
      ]
  }
  ,
  {
    id: 4,
    name:
      "Food Preferences",
    questions:
      [
        {
          id: "diet_type",
          question: "What type of diet do you follow or prefer?",
          options: [
            {label: "Omnivore", value: "omnivore"},
            {label: "Vegetarian", value: "vegetarian"},
            {label: "Vegan", value: "vegan"},
            {label: "Pescatarian", value: "pescatarian"},
            {label: "Ketogenic", value: "ketogenic"},
            {label: "Paleo", value: "paleo"},
            {label: "Low-carb", value: "low-carb"},
            {label: "High-protein", value: "high-protein"},
            {label: "Other", value: "other", isOther: true},
          ],
        },
        {
          id: "food_dislike",
          question: "Are there any foods you dislike or want to avoid?",
          options: [
            // Make conditional based on diet type
            {label: "Red meat", value: "red-meat"},
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
          id: "adventurous_food",
          question: "How adventurous are you with food choices?",
          options: [
            {label: "I love trying new foods", value: "new-foods"},
            {label: "I prefer familiar foods", value: "familiar-foods"},
            {label: "Somewhere in between", value: "in-between"},
          ],
        },
        {
          id: "favorite_cuisine",
          question: "What are your favorite types of cuisine?",
          options: [
            {label: "Italian", value: "italian"},
            {label: "Mexican", value: "mexican"},
            {label: "Indian", value: "indian"},
            {label: "Mediterranean", value: "mediterranean"},
            {label: "Asian", description: "e.g. Chinese, Japanese, Thai", value: "asian"},
            {label: "American", value: "american"},
            {label: "Other", value: "other", isOther: true},
          ],
          multiple: true
        },
      ]
  }
  ,
  {
    id: 5,
    name:
      "Practical Considerations",
    questions:
      [
        {
          id: "meals_amount",
          question: "How many meals do you prefer to have each day?",
          options: [
            {label: "3 meals", description: "Breakfast, lunch and dinner", value: "3-meals"},
            {label: "4 meals", description: "3 meals + 1 snack", value: "4-meals"},
            {label: "5 meals", description: "3 meals + 2 snacks", value: "5-meals"},
            {label: "Other", value: "other", isOther: true},
          ]
        },
        {
          id: "time_restrictions",
          question: "How much time can you spend preparing meals?",
          options: [
            {label: "Less than 15 minutes", value: "less-than-15"},
            {label: "15-30 minutes", value: "15-30"},
            {label: "30-60 minutes", value: "30-60"},
            {label: "No time limit", value: "no-time-limit"},
          ]
        }
      ]
  }
]

export default questionCategories;