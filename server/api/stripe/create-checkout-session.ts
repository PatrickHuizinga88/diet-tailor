import {stripe} from "~/server/utils/stripe";
import {serverSupabaseUser} from "#supabase/server";

interface Query {
  stripeCustomerId: string
  lookupKey: string
}

export default defineEventHandler(async (event) => {
  const { stripeCustomerId, lookupKey } = getQuery<Query>(event)
  const { public: {baseUrl} } = useRuntimeConfig()
  const user = await serverSupabaseUser(event)

  if (!lookupKey) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Lookup key is required',
    })
  }

  if (!stripeCustomerId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Stripe customer ID is required',
    })
  }

  if (!user) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User not found',
    })
  }

  const prices = await stripe.prices.list({
    lookup_keys: [lookupKey],
    expand: ['data.product'],
  })

  const {url} = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    metadata: {
      supabase_user_id: user.id,
    },
    billing_address_collection: 'auto',
    line_items: [
      {
        price: prices.data[0].id,
        quantity: 1,
      }
    ],
    mode: 'subscription',
    success_url: `${baseUrl}/confirm-payment?payment_successful=true`,
    cancel_url: `${baseUrl}/confirm-payment?payment_successful=false`,
  })

  return url
})