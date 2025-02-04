<script setup lang="ts">
import {ArrowRight, CheckCircle} from 'lucide-vue-next'
import {PasswordInput} from "./ui/password-input";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";

const supabase = useSupabaseClient()
const {t} = useI18n()

const errorMessage = ref('')
const success = ref(false)
const resendDelay = ref(10)
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
  email: z.string(),
  password: z.string().min(4),
  repeatedPassword: z.string().min(4),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  if (values.password !== values.repeatedPassword) {
    errorMessage.value = t('authentication.register.passwords_dont_match')
    return
  }

  try {
    loading.value = true

    const {public: {baseUrl}} = useRuntimeConfig()

    const {id: customerId} = await $fetch<any>('/api/stripe/create-customer', {
      query: {email: values.email}
    })
    if (!customerId) throw new Error('Failed to create customer')

    const {error} = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          stripe_customer_id: customerId,
        },
        emailRedirectTo: `${baseUrl}/intro`
      }
    })
    if (error) throw error

    success.value = true
    resendDelay.value = 10
    countDown()
  } catch (error) {
    errorMessage.value = t('authentication.register.sign_up_failed')
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div>
    <h1 class="h2 mb-1">Register for free</h1>
    <p class="text-muted-foreground">Gain access to many features to fine-tune your personal diet.</p>
  </div>
  <form v-if="!success" class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ $t('common.general.email') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="email" required/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <FormLabel>{{ $t('authentication.common.password') }}</FormLabel>
        <FormControl>
          <PasswordInput v-bind="componentField" required/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="repeated-password">
      <FormItem>
        <FormLabel>{{ $t('authentication.register.repeat_password') }}</FormLabel>
        <FormControl>
          <PasswordInput v-bind="componentField" required/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>

    <Button type="submit" :loading="loading" class="w-full">
      {{ $t('authentication.register.sign_up') }}
    </Button>

    <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
  </form>

  <div v-else class="flex flex-col items-center">
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
      <Button @click="onSubmit" variant="link" class="h-auto p-0 text-primary" :disabled="resendDelay > 0">
        {{ $t('authentication.register.send_again') }}
      </Button>
      <span v-if="resendDelay > 0" class="inline-block ml-1">
          {{ $t('authentication.register.in_seconds', {seconds: resendDelay}) }}
        </span>
    </p>
  </div>

  <div class="sm:mt-6 md:mt-10 text-center text-sm text-muted-foreground">
    {{ $t('authentication.register.have_account') + ' ' }}
    <Button variant="link" class="h-auto p-0 ml-1" as-child>
      <NuxtLink to="/login">
        {{ $t('authentication.common.sign_in') }}
        <ArrowRight class="size-4" aria-hidden="true"/>
      </NuxtLink>
    </Button>
  </div>
</template>

<style scoped>

</style>