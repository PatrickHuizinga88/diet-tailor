const plans = [
  {
    name: 'Free plan',
    description: 'Perfect for trying our product and start your journey to fun and healthy eating.',
    pricing: '0',
    featuresTitle: 'Included features:',
    features: [
      { name: 'A personalized meal plan' },
      { name: '5 weekly meal changes' },
    ],
    highlighted: false,
  },
  {
    lookupKey: 'premium',
    name: 'Premium plan',
    description: 'Get the most out of your meal plan with more flexibility.',
    pricing: '6',
    featuresTitle: 'Everything in Free plan, plus:',
    features: [
      { name: '50 weekly meal changes' },
    ],
    highlighted: true,
  }
]

export default plans