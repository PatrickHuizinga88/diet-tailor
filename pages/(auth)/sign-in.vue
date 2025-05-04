<script setup lang="ts">
import {PasswordInput} from "~/components/ui/password-input";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import type {Database} from "~/types/database.types";

definePageMeta({
  layout: false,
})

useServerSeoMeta({
  title: 'Sign In',
  description: 'Sign in to your account',
})

const supabase = useSupabaseClient<Database>()
const {t} = useI18n()

const errorMessage = ref('')
const loading = ref(false)

const formSchema = toTypedSchema(z.object({
  email: z
      .string({message: t('common.validations.required')})
      .email({message: t('authentication.validations.email')}),
  password: z.string({message: t('common.validations.required')}),
}))

const form = useForm({
  validationSchema: formSchema,
})

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true

    const {data, error} = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password
    })
    if (error) throw error

    const {data: profile} = await supabase
        .from('profiles')
        .select('completed_setup')
        .eq('id', data.user?.id)
        .single()

    if (profile.completed_setup) {
      await navigateTo('/dashboard')
      return
    }
    await navigateTo('/intro')
  } catch (error) {
    errorMessage.value = t('authentication.login.sign_in_failed')
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <NuxtLayout name="authentication" :title="$t('authentication.common.sign_in')">
    <form  @submit="onSubmit" class="space-y-6">
      <FormField v-slot="{ componentField }" name="email" :validate-on-model-update="false">
        <FormItem>
          <FormLabel>{{ $t('common.general.email') }}</FormLabel>
          <FormControl>
            <Input v-bind="componentField" type="email"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>
      <FormField v-slot="{ componentField }" name="password" :validate-on-model-update="false">
        <FormItem>
          <div class="flex items-center justify-between">
            <FormLabel>
              {{ $t('authentication.common.password') }}
            </FormLabel>
            <Button type="button" variant="link" size="sm" class="h-auto p-0" as-child>
              <NuxtLink to="/password-recovery">
                {{ $t('authentication.login.forgot_password') }}
              </NuxtLink>
            </Button>
          </div>
          <FormControl>
            <PasswordInput v-bind="componentField"/>
          </FormControl>
          <FormMessage/>
        </FormItem>
      </FormField>

      <Button type="submit" size="sm" :loading="loading" class="w-full">
        {{ $t('authentication.common.sign_in') }}
      </Button>

      <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
    </form>

<!--    <template #footer>-->
<!--      {{ $t('authentication.login.no_account') }}-->
<!--      <Button variant="link" size="sm" class="h-auto p-0 ml-1" as-child>-->
<!--        <NuxtLink to="/sign-up">-->
<!--          {{ $t('authentication.login.sign_up_now') }}-->
<!--          <ArrowRight aria-hidden="true"/>-->
<!--        </NuxtLink>-->
<!--      </Button>-->
<!--    </template>-->
  </NuxtLayout>
</template>

<style scoped>

</style>