export default interface Step {
  id: string;
  question: string;
  formFieldType: 'input' | 'radio' | 'checkbox';
  options?: {
    label: string;
    description?: string;
    value: string;
    isOther?: boolean;
  }[];
  placeholder?: string;
  suffix?: string;
  canSkip?: boolean;
}