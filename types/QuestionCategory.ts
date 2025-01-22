export default interface QuestionCategory {
  id: number
  name: string
  questions: Question[]
}

export interface Question {
  id: string
  question: string
  inputType?: 'text' | 'number' | 'date' | 'email'
  options?: QuestionOption[]
  multiple?: boolean
  placeholder?: string
  suffix?: string
  optional?: boolean
  condition?: string
}

interface QuestionOption {
  label: string
  description?: string
  value: string
  isOther?: boolean
}