<script setup lang="ts">
import {CheckCircle} from 'lucide-vue-next'
import {PasswordInput} from "./ui/password-input";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import type {Database} from "~/types/database.types";

const supabase = useSupabaseClient<Database>()
const wizardFormStore = useWizardFormStore()
const mealPlanStore = useMealPlanStore()
const {t} = useI18n()

const errorMessage = ref('')
const success = ref(false)
const resendDelay = ref(15)
const loading = ref(false)

const countDown = () => {
  const interval = setInterval(() => {
    resendDelay.value--
    if (resendDelay.value <= 0) {
      clearInterval(interval)
    }
  }, 1000)
}

const formSchema = toTypedSchema(z.object({
  email: z
      .string({message: t('common.validations.required')})
      .email({message: t('authentication.validations.email')}),
  password: z
      .string({message: t('common.validations.required')})
      .min(8, {message: t('authentication.validations.password_length', {length: 8})}),
  repeated_password: z
      .string({message: t('common.validations.required')})
      .min(8, {message: t('authentication.validations.password_length', {length: 8})}),
}))

const form = useForm({
  validationSchema: formSchema,
})

const signUp = async (email: string, password: string) => {
  const {public: {baseUrl}} = useRuntimeConfig()

  const {id: customerId} = await $fetch<any>('/api/stripe/create-customer', {
    query: {email: email}
  })
  if (!customerId) throw new Error('Failed to create customer')

  const {data, error: signUpError} = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        stripe_customer_id: customerId,
      },
      emailRedirectTo: `${baseUrl}/confirm-registration`
    }
  })
  if (signUpError || !data.user) throw signUpError

  const {error: profileError} = await supabase.from('profiles').insert({
    id: data.user.id,
    personal_information: wizardFormStore.wizardForm
  })
  if (profileError) throw profileError

  resendDelay.value = 10
  countDown()
}

const onSubmit = form.handleSubmit(async (values) => {
  if (values.password !== values.repeated_password) {
    errorMessage.value = t('authentication.register.passwords_dont_match')
    return
  }

  try {
    loading.value = true

    localStorage.setItem('meal-plan', JSON.stringify(mealPlanStore.mealPlan))

    await signUp(values.email, values.password)
    success.value = true
  } catch (error) {
    errorMessage.value = t('authentication.register.sign_up_failed')
    console.error(error)
  } finally {
    loading.value = false
  }
})

defineExpose({success})
</script>

<template>
  <form v-if="!success" class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email" :validate-on-model-update="false">
      <FormItem>
        <FormLabel>{{ $t('common.general.email') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="email" required/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password" :validate-on-model-update="false">
      <FormItem>
        <FormLabel>{{ $t('authentication.common.password') }}</FormLabel>
        <FormControl>
          <PasswordInput v-bind="componentField" required/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="repeated_password" :validate-on-model-update="false">
      <FormItem>
        <FormLabel>{{ $t('authentication.register.repeat_password') }}</FormLabel>
        <FormControl>
          <PasswordInput v-bind="componentField" required/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>

    <p class="text-xs text-muted-foreground">
      {{ $t('authentication.register.terms_confirmation') }}
      <a href="#" class="text-foreground underline">{{ $t('common.general.terms_of_service') }}</a>
      {{ $t('common.general.and') }}
      <a href="#" class="text-foreground underline">{{ $t('common.general.privacy_policy') }}</a>.
    </p>

    <Button type="submit" size="sm" :loading="loading" class="w-full">
      {{ $t('authentication.register.sign_up') }}
    </Button>

    <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
  </form>

  <div v-if="success" class="flex flex-col items-center">
    <Alert variant="success">
      <CheckCircle class="size-4"/>
      <AlertTitle>{{ $t('authentication.register.sign_up_success.title') }}</AlertTitle>
      <AlertDescription>{{
          $t('authentication.register.sign_up_success.description', {email: form.values.email})
        }}
      </AlertDescription>
    </Alert>

    <p class="text-sm text-muted-foreground text-center mt-4">
      {{ $t('authentication.register.received_nothing') }}
      <Button @click="signUp(form.values.email, form.values.password)" variant="link" class="h-auto p-0 text-primary"
              :disabled="resendDelay > 0">
        {{ $t('authentication.register.send_again') }}
      </Button>
      <span v-if="resendDelay > 0" class="inline-block ml-1">
          {{ $t('authentication.register.in_seconds', {seconds: resendDelay}) }}
        </span>
    </p>
  </div>
</template>

<style scoped>

</style>