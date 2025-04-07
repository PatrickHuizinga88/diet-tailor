import exampleResponse from "~/data/exampleResponse.json";
import {createOpenAI} from "@ai-sdk/openai";
import {generateObject} from "ai";
import {z} from "zod";
import {v4 as uuidv4} from 'uuid';
import {serverSupabaseClient, serverSupabaseUser} from "#supabase/server";

export default defineEventHandler(async (event) => {
  const {openaiApiKey} = useRuntimeConfig()
  if (!openaiApiKey) throw new Error('Missing OpenAI API key');
  const openai = createOpenAI({
    apiKey: openaiApiKey,
  });

  const client = await serverSupabaseClient(event)
  const user = await serverSupabaseUser(event)

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
    health_optimizations,
    mealType,
    currentMeal,
    reason
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
    1. Generate a ${mealType} meal based on the above information.
    2. This meal will be a replacement of the previous meal: ${currentMeal}. 
       ${reason ? "You're given the following feedback about this meal: " + reason + '.' : ''}
    3. Ensure the meal is balanced, nutrient-rich, and aligned with the user’s caloric goals.
    4. Include a mix of diverse ingredients and cuisines to match preferences, while avoiding restrictions and allergens.
    5. Include the unit for each nutritional value (e.g. " g", " kcal").
    
    Begin generating the meal below.
  `

  const mealDetails = z.object({
    id: z.string().describe('Leave as an empty string'),
    name: z.string(),
    description: z.string().describe("An appealing meal description, considering the user's tastes and dietary needs. Maximum 180 characters."),
    calories: z.string(),
    protein: z.string(),
    carbs: z.string(),
    fats: z.string(),
  })

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized'
    })
  }

  const {data: profile} = await client.from('profiles')
    .select('plan')
    .eq('id', user.id)
    .single()

  const {count} = await client.from('user_actions')
    .select('', {count: 'exact'})
    .eq('user_id', user.id)
    .eq('action_type', 'generate_meal')
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

  const maxGenerations = profile?.plan === 'free' ? 5 : 50;
  if (count && count >= maxGenerations) {
    throw createError({
      statusCode: 405,
      statusMessage: 'Reached weekly limit'
    })
  }

  const {object} = await generateObject({
    model: openai("gpt-4o-mini", {
      structuredOutputs: true,
    }),
    schemaName: "meal",
    schemaDescription: 'A personalized meal based on user preferences, goals, and restrictions.',
    schema: mealDetails,
    messages: [
      {role: "system", content: "You are a nutrition expert."},
      {role: "user", content: prompt},
    ],
  })

  if (!object) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to generate meal'
    })
  }

  object.id = uuidv4()

  return object
})