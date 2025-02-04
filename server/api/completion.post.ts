import exampleResponse from "~/data/exampleResponse";
import {createOpenAI} from "@ai-sdk/openai";
import {generateObject} from "ai";
import {z} from "zod";

export default defineEventHandler(async (event) => {
  const {openaiApiKey} = useRuntimeConfig()

  const openai = createOpenAI({
    apiKey: openaiApiKey,
  });

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
    6. The JSON must strictly adhere to the provided schema for each day of the meal plan.
    
    Begin generating the meal plan below.
  `

    // return {
    //   data: {
    //     choices: [
    //       { message: { content: exampleResponse } }
    //     ]
    //   }
    // }

    const mealDetails = z.object({
      name: z.string(),
      description: z.string(),
      nutritionDetails: z.object({
        calories: z.string(),
        protein: z.object({
          amount: z.string(),
          unit: z.string(),
        }),
        carbs: z.object({
          amount: z.string(),
          unit: z.string(),
        }),
        fats: z.object({
          amount: z.string(),
          unit: z.string(),
        }),
      }),
    })

    const {object} = await generateObject({
      model: openai("gpt-4o-mini", {
        structuredOutputs: true,
      }),
      schemaName: "mealPlan",
      schemaDescription: "A highly personalized 7-day meal plan based on user preferences, goals, and restrictions.",
      schema: z.array(z.object({
          day: z.string(),
          nutritionOverview: z.object({
            calories: z.string(),
            protein: z.object({
              amount: z.string(),
              unit: z.string(),
              percentage: z.string(),
            }),
            carbs: z.object({
              amount: z.string(),
              unit: z.string(),
              percentage: z.string(),
            }),
            fats: z.object({
              amount: z.string(),
              unit: z.string(),
              percentage: z.string(),
            }),
          }),
          meals: z.object({
            breakfast: mealDetails,
            lunch: mealDetails,
            dinner: mealDetails,
            snacks: z.object({
              items: z.array(mealDetails),
            }),
          }),
        })
      ).describe('List of a meal plan for each day of the week.'),
      messages: [
        {role: "system", content: "You are a nutrition expert."},
        {role: "user", content: prompt},
      ],
    })
    return {
      data: object
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