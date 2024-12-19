import type Step from "~/types/Step";

export default interface StepCategory {
  id: number;
  name: string;
  steps: Step[];
}