import OpenAI from "openai";
import exampleResponse from "~/data/exampleResponse";

export default defineEventHandler(async (event) => {
  const {openaiApiKey} = useRuntimeConfig()
  const openai = new OpenAI({apiKey: openaiApiKey});
  const {
    age,
    gender,
    weight,
    height,
    activity_level,
    primary_goal,
    cuisine,
    include_foods,
    exclude_foods,
    allergies,
    diet_type,
    meals_per_day,
    calorie_target,
  } = await readBody(event)

  const prompt = `
    Act as a professional nutritionist and dietitian. Your task is to create a highly personalized 7-day meal plan for the user based on their preferences, goals, and restrictions. 

    The user has provided the following details:

    **General Details:**
    - Age: ${age || 'not specified'}
    - Gender: ${gender || 'not specified'}
    - Weight: ${weight || 'not specified'} kg
    - Height: ${height || 'not specified'} cm
    - Activity Level: ${activity_level || 'not specified'}
    
    **Goals:**
    - Primary goal: ${primary_goal || 'not specified'}
    
    **Dietary Preferences:**
    - Preferred cuisine(s): ${cuisine || 'not specified'}
    - Specific foods to include: ${include_foods || 'not specified'}
    - Specific foods to avoid: ${exclude_foods || 'not specified'}
    - Allergies: ${allergies || 'not specified'}
    - Diet type: ${diet_type || 'not specified'}
    
    **Meal Preferences:**
    - Number of meals per day: ${meals_per_day ? meals_per_day.meals : 'not specified'}
    - Snacks: ${meals_per_day ? meals_per_day.snacks : 'not specified'}
    
    **Caloric Requirements:**
    - Target daily calorie intake: ${calorie_target || 'not specified'} kcal

    ### Instructions:
    1. Generate a meal plan for 7 days based on the above information.
    2. Ensure meals are balanced, nutrient-rich, and aligned with the user’s caloric goals.
    3. Include a mix of diverse ingredients and cuisines to match preferences, while avoiding restrictions and allergens.
    4. Only have pure JSON as output that is parsable using the JSON.parse function.
    5. Do not include the format of the JSON in the response.
    6. Avoid any escape characters.
    7. The JSON must strictly adhere to the following structure (without escape characters) for each day of the meal plan:
    {
      "day": "Monday",
      "nutritionOverview": {
        "calories": "{{daily_calories}}",
        "protein": { "amount": "{{daily_protein}}", "unit": "g", "percentage": "{{daily_protein_percentage}}" },
        "carbs": { "amount": "{{daily_carbs}}", "unit": "g", "percentage": "{{daily_carbs_percentage}}" },
        "fats": { "amount": "{{daily_fats}}", "unit": "g", "percentage": "{{daily_fats_percentage}}" }
      },
      "meals": {
        "breakfast": {
          "name": "{{breakfast_name}}",
          "nutritionDetails": {
            "calories": "{{breakfast_calories}}",
            "protein": { "amount": "{{breakfast_protein}}", "unit": "g" },
            "carbs": { "amount": "{{breakfast_carbs}}", "unit": "g" },
            "fats": { "amount": "{{breakfast_fats}}", "unit": "g" }
          },
        },
        "lunch": {
          "name": "{{lunch_name}}",
          "nutritionDetails": {
            "calories": "{{lunch_calories}}",
            "protein": { "amount": "{{lunch_protein}}", "unit": "g" },
            "carbs": { "amount": "{{lunch_carbs}}", "unit": "g" },
            "fats": { "amount": "{{lunch_fats}}", "unit": "g" }
          },
        },
        "dinner": {
          "name": "{{dinner_name}}",
          "nutritionDetails": {
            "calories": "{{dinner_calories}}",
            "protein": { "amount": "{{dinner_protein}}", "unit": "g" },
            "carbs": { "amount": "{{dinner_carbs}}", "unit": "g" },
            "fats": { "amount": "{{dinner_fats}}", "unit": "g" }
          },
        },
        "snacks": {
          "items": [
            {
              "name": "{{snack_1_name}}",
              "nutritionDetails": {
                "calories": "{{snack_1_calories}}",
                "protein": { "amount": "{{snack_1_protein}}", "unit": "g" },
                "carbs": { "amount": "{{snack_1_carbs}}", "unit": "g" },
                "fats": { "amount": "{{snack_1_fats}}", "unit": "g" }
              }
            },
            {
              "name": "{{snack_2_name}}",
              "nutritionDetails": {
                "calories": "{{snack_2_calories}}",
                "protein": { "amount": "{{snack_2_protein}}", "unit": "g" },
                "carbs": { "amount": "{{snack_2_carbs}}", "unit": "g" },
                "fats": { "amount": "{{snack_2_fats}}", "unit": "g" }
              }
            }
          ],
        }
      }
    }
    
    Begin generating the meal plan below.
  `

  // return {
  //   data: {
  //     choices: [
  //       { message: { content: exampleResponse } }
  //     ]
  //   }
  // }

  return await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {role: "system", content: "You are a nutrition expert."},
      {role: "user", content: prompt},
    ],
    temperature: 0.7,
  }).withResponse();
})