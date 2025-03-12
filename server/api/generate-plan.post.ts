import exampleResponse from "~/data/exampleResponse.json";
import {createOpenAI} from "@ai-sdk/openai";
import {generateObject, streamObject} from "ai";
import {z} from "zod";

export default defineEventHandler(async (event) => {
  const {openaiApiKey} = useRuntimeConfig()
  if (!openaiApiKey) throw new Error('Missing OpenAI API key');
  const openai = createOpenAI({
    apiKey: openaiApiKey,
  });

  const {daysAmount} = getQuery(event)

  const {
    age,
    weight,
    height,
    activity_level,
    primary_goal,
    weight_loss_goal,
    health_goals,
    diet_type,
    allergies,
    adventurous_food,
    favorite_cuisine,
    food_dislike,
    time_restrictions,
    meals_amount,
    health_optimizations
  } = await readBody(event)

  const convertToString = (array: string[]) => {
    if (!array || !array.length) return undefined
    return array.join(', ')
  }

  const daysAmountText = () => {
    switch (daysAmount) {
      case '2':
        return 'Monday and Tuesday'
      case '5':
        return 'Wednesday to Sunday'
      case '7':
        return 'Monday to Sunday'
    }
  }

  const prompt = `
    Act as a professional nutritionist and dietitian. Your task is to create a highly personalized meal plan for the user based on their preferences, goals, and restrictions. 

    The user has provided the following details:

    **General Details:**
    - Age: ${age || 'not specified'}
    - Height: ${height ? height + ' cm' : 'not specified'}
    - Weight: ${weight ? weight + ' kg' : 'not specified'}
    - Activity Level: ${activity_level || 'not specified'}
    
    **Goals:**
    - Primary goal: ${primary_goal || 'not specified'}
    - Weight loss target: ${weight_loss_goal ? weight_loss_goal + ' per week' : 'not specified'}
    - Health goals: ${convertToString(health_goals) || 'not specified'}
    
    **Dietary Preferences:**
    - Diet type: ${diet_type || 'not specified'}
    - Allergies: ${convertToString(allergies) || 'not specified'}
    - Adventurous eater: Likes ${adventurous_food || 'not specified'}
    - Preferred cuisine(s): ${convertToString(favorite_cuisine) || 'not specified'}
    - Specific foods to avoid: ${convertToString(food_dislike) || 'not specified'}
    
    **Practical Considerations:**
    - Available time for preparation: ${time_restrictions ? time_restrictions + ' minutes per day' : 'not specified'} 
    - Number of meals per day: ${meals_amount || 'not specified'}
    
    **Health Optimizations:**
    - Specific health concerns: ${convertToString(health_optimizations) || 'not specified'}
    
    ### Instructions:
    1. Generate a meal plan based on the above information.
    2. Ensure meals are balanced, nutrient-rich, and aligned with the user’s caloric goals.
    3. Include a mix of diverse ingredients and cuisines to match preferences, while avoiding restrictions and allergens.
    4. Reuse meals or ingredients across days for variety and convenience.
    5. Strictly only provide a meal plan for ${daysAmountText()}.
    6. Strictly adhere to the provided order of meals.
    
    Begin generating the meal plan below.
  `

  const mealDetails = z.object({
    name: z.string(),
    description: z.string().describe("A short and appealing meal description, considering the user's tastes and dietary needs."),
    calories: z.string(),
    protein: z.string(),
    carbs: z.string(),
    fats: z.string(),
  })

  const {object} = await generateObject({
    model: openai("gpt-4o-mini", {
      structuredOutputs: true,
    }),
    output: "array",
    schemaName: "mealPlan",
    schemaDescription: 'A highly personalized meal plan based on user preferences, goals, and restrictions.',
    schema: z.object({
      day: z.string().describe('The day of the week for which the meal plan is generated. E.g. Monday, Tuesday, etc.'),
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
    }).describe(`A meal plan for days ${daysAmountText()}`),
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