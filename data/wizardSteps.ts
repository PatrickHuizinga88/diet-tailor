import type StepCategory from "~/types/StepCategory";

const stepCategories: StepCategory[] = [
  {
    id: 1,
    name: "Personal Information",
    steps: [
      {
        id: "age",
        question: "What is your age?",
        formFieldType: "input",
        placeholder: "Enter your age",
        suffix: "years old"
      },
      {
        id: "gender",
        question: "What is your gender?",
        formFieldType: "radio",
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
        formFieldType: "input",
        suffix: "cm"
      },
      {
        id: "weight",
        question: "What is your weight?",
        formFieldType: "input",
        suffix: "kg"
      },
      {
        id: "activity-level",
        question: "What is your activity level?",
        formFieldType: "radio",
        options: [
          {label: "Little or no exercise", value: "sedentary"},
          {label: "Exercising 1-3 days per week", value: "lightly_active"},
          {label: "Exercising 3-5  days per week", value: "moderately_active"},
          {label: "Exercise 6-7 days per week", value: "very_active"},
          {label: "More than once every day", value: "super_active"}
        ]
      }
    ],
  }
]

export default stepCategories;