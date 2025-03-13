<script setup lang="ts">
import {ArrowRight} from 'lucide-vue-next'
import {PasswordInput} from "./ui/password-input";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";
import type {Database} from "~/types/database.types";

const supabase = useSupabaseClient<Database>()
const mealPlanStore = useMealPlanStore()
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

    localStorage.setItem('meal-plan', JSON.stringify(mealPlanStore.mealPlan))

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
    }
    await navigateTo('/intro')
  } catch (error) {
    errorMessage.value = t('authentication.login.sign_in_failed')
    console.error(error)
  }
})
</script>

<template>
  <form class="space-y-6" @submit="onSubmit">
    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>{{ $t('common.general.email') }}</FormLabel>
        <FormControl>
          <Input v-bind="componentField" type="email"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>
    <FormField v-slot="{ componentField }" name="password">
      <FormItem>
        <div class="flex items-center justify-between">
          <FormLabel>
            {{ $t('authentication.common.password') }}
          </FormLabel>
          <Button type="button" variant="link" size="sm" class="h-auto p-0" as-child>
            <NuxtLinkLocale to="password-recovery">
              {{ $t('authentication.login.forgot_password') }}
            </NuxtLinkLocale>
          </Button>
        </div>
        <FormControl>
          <PasswordInput v-bind="componentField"/>
        </FormControl>
        <FormMessage/>
      </FormItem>
    </FormField>

    <Button size="sm" type="submit" :loading="loading" class="w-full">
      {{ $t('authentication.common.sign_in') }}
    </Button>

    <p v-if="errorMessage" class="text-sm text-destructive">{{ errorMessage }}</p>
  </form>

  <div class="sm:mt-6 md:mt-10 text-center text-sm text-muted-foreground">
    {{ $t('authentication.login.no_account') }}
    <Button variant="link" size="sm" class="h-auto p-0 ml-1" as-child>
      <NuxtLinkLocale to="register">
        {{ $t('authentication.login.register_now') }}
        <ArrowRight aria-hidden="true"/>
      </NuxtLinkLocale>
    </Button>
  </div>
</template>

<style scoped>

</style>