import exampleResponse from "~/data/exampleResponse.json";
import {createOpenAI} from "@ai-sdk/openai";
import {generateObject, streamObject} from "ai";
import {z} from "zod";

interface Query {
  daysAmount: 2 | 5 | 7
}

export default defineEventHandler(async (event) => {
  const {openaiApiKey} = useRuntimeConfig()
  if (!openaiApiKey) throw new Error('Missing OpenAI API key');
  const openai = createOpenAI({
    apiKey: openaiApiKey,
  });

  const {daysAmount} = getQuery<Query>(event)

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
    time_restrictions
  } = await readBody(event)

  const convertToString = (array: string[]) => {
    if (!array || !array.length) return undefined
    return array.join(', ')
  }

  const prompt = `
    Act as a professional nutritionist and dietitian. Your task is to create a highly personalized meal plan for the user based on their preferences, goals, and restrictions. 

    The user has provided the following details:

    **General Details:**
    - Age: ${age || 'not specified'}
    - Gender: ${gender || 'not specified'}
    - Weight: ${weight ? weight + ' kg' : 'not specified'}
    - Height: ${height ? height + ' cm' : 'not specified'}
    - Activity Level: ${activity_level || 'not specified'}
    
    **Goals:**
    - Primary goal: ${primary_goal || 'not specified'}
    - Weight loss target: ${weight_loss_goal ? weight_loss_goal + ' per week' : 'not specified'}
    - Health goals: ${convertToString(health_goals) || 'not specified'}
    
    **Medical history:**
    - Dietary restrictions: ${convertToString(dietary_restrictions) || 'not specified'}
    - Medical conditions: ${convertToString(medical_conditions) || 'not specified'}
    - Medications: ${medications || 'not specified'}
    
    **Dietary Preferences:**
    - Diet type: ${diet_type || 'not specified'}
    - Specific foods to avoid: ${convertToString(food_dislike) || 'not specified'}
    - Adventurous eater: Likes ${adventurous_food || 'not specified'}
    - Preferred cuisine(s): ${convertToString(favorite_cuisine) || 'not specified'}
    
    **Meal Preferences:**
    - Number of meals per day: ${meals_amount || 'not specified'}
    - Available time for preparation: ${time_restrictions ? time_restrictions + ' minutes per day' : 'not specified'} 
    
    ### Instructions:
    1. Generate a meal plan based on the above information.
    2. Ensure meals are balanced, nutrient-rich, and aligned with the user’s caloric goals.
    3. Include a mix of diverse ingredients and cuisines to match preferences, while avoiding restrictions and allergens.
    
    Begin generating the meal plan below.
  `

  const mealDetails = z.object({
    name: z.string(),
    description: z.string().describe("A detailed and appealing meal description, considering the user's tastes and dietary needs."),
    calories: z.string(),
    protein: z.string(),
    carbs: z.string(),
    fats: z.string(),
  })

  const daysAmountText = () => {
    switch (daysAmount) {
      case 2:
        return 'Monday and Tuesday'
      case 5:
        return 'Monday to Friday'
      case 7:
        return 'Monday to Sunday'
    }
  }

  const {object} = await generateObject({
    model: openai("gpt-4o-mini", {
      structuredOutputs: true,
    }),
    output: "array",
    schemaName: "mealPlan",
    schemaDescription: `A highly personalized meal plan for ${daysAmountText} based on user preferences, goals, and restrictions.`,
    schema: z.object({
      day: z.string(),
      nutritionOverview: z.object({
        calories: z.string(),
        protein: z.string(),
        carbs: z.string(),
        fats: z.string(),
      }).describe('The amount of nutrients in the meal plan for the entire day and a sum of the individual meals and snacks for that day including the unit.'),
      meals: z.object({
        breakfast: mealDetails,
        lunch: mealDetails,
        dinner: mealDetails,
        snacks: z.object({
          items: z.array(mealDetails),
        }),
      }),
    }),
    messages: [
      {role: "system", content: "You are a nutrition expert."},
      {role: "user", content: prompt},
    ],
  })

  if (!object) {
    createError({
      statusCode: 500,
      statusMessage: 'Failed to generate meal plan'
    })
  }

  // return {
  //   data: {
  //     choices: [
  //       { message: { content: exampleResponse } }
  //     ]
  //   }
  // }

  return object
})