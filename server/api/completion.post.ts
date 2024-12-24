import OpenAI from "openai";
import exampleResponse from "~/data/exampleResponse";

export default defineEventHandler(async (event) => {
  const {openaiApiKey} = useRuntimeConfig()
  const openai = new OpenAI({apiKey: openaiApiKey});

  try {
    const {
      age,
      gender,
      weight,
      height,
      activity_level,
      primary_goal,
      weight_loss_goal,
      health_goals,
      dietary_restrictions,
      medical_conditions,
      medications,
      diet_type,
      food_dislike,
      adventurous_food,
      favorite_cuisine,
      meals_amount,
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
    - Weight loss target: ${weight_loss_goal || 'not specified'} per week
    - Health goals: ${health_goals || 'not specified'}
    
    **Medical history:**
    - Dietary restrictions: ${dietary_restrictions || 'not specified'}
    - Medical conditions: ${medical_conditions || 'not specified'}
    - Medications: ${medications || 'not specified'}
    
    **Dietary Preferences:**
    - Diet type: ${diet_type || 'not specified'}
    - Specific foods to avoid: ${food_dislike || 'not specified'}
    - Adventurous eater: Likes ${adventurous_food || 'not specified'}
    - Preferred cuisine(s): ${favorite_cuisine || 'not specified'}
    
    **Meal Preferences:**
    - Number of meals per day: ${meals_amount || 'not specified'}
    
    ### Instructions:
    1. Generate a meal plan for 7 days based on the above information.
    2. Ensure meals are balanced, nutrient-rich, and aligned with the user’s caloric goals.
    3. Include a mix of diverse ingredients and cuisines to match preferences, while avoiding restrictions and allergens.
    4. The meal descriptions should be detailed and appealing, considering the user's tastes and dietary needs.
    5. The amounts in the nutritionOverview must be a sum of the individual meals and snacks for that day.
    6. Only have pure JSON as output that is parsable using the JSON.parse function.
    7. Do not include the format of the JSON in the response.
    8. Avoid any escape characters.
    9. The JSON must strictly adhere to the following structure (without escape characters) for each day of the meal plan:
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
          "description": "{{breakfast_description}}",
          "nutritionDetails": {
            "calories": "{{breakfast_calories}}",
            "protein": { "amount": "{{breakfast_protein}}", "unit": "g" },
            "carbs": { "amount": "{{breakfast_carbs}}", "unit": "g" },
            "fats": { "amount": "{{breakfast_fats}}", "unit": "g" }
          },
        },
        "lunch": {
          "name": "{{lunch_name}}",
          "description": "{{lunch_description}}",
          "nutritionDetails": {
            "calories": "{{lunch_calories}}",
            "protein": { "amount": "{{lunch_protein}}", "unit": "g" },
            "carbs": { "amount": "{{lunch_carbs}}", "unit": "g" },
            "fats": { "amount": "{{lunch_fats}}", "unit": "g" }
          },
        },
        "dinner": {
          "name": "{{dinner_name}}",
          "description": "{{dinner_description}}",
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
              "description": "{{snack_1_description}}",
              "nutritionDetails": {
                "calories": "{{snack_1_calories}}",
                "protein": { "amount": "{{snack_1_protein}}", "unit": "g" },
                "carbs": { "amount": "{{snack_1_carbs}}", "unit": "g" },
                "fats": { "amount": "{{snack_1_fats}}", "unit": "g" }
              }
            },
            {
              "name": "{{snack_2_name}}",
              "description": "{{snack_2_description}}",
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

    const { data: response } =  await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {role: "system", content: "You are a nutrition expert."},
        {role: "user", content: prompt},
      ],
      temperature: 0.7,
    }).withResponse();
    return {
      data: response.choices[0].message.content
    }
  } catch (error) {
    return {
      data: null,
      error: {
        message: "An error occurred while generating the meal plan. Please try again later.",
        error
      }
    }
  }
})