import {defineStore} from "pinia";

type WizardForm = {
  [key: string]: string | number | boolean
}

export const useWizardFormStore = defineStore('wizardFormStore', {
  state: () => ({
    wizardForm: {} as WizardForm
  }),
  actions: {
    setWizardForm(key: string, value: string | number | boolean) {
      this.wizardForm[key] = value
    }
  }
})