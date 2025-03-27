<script setup lang="ts">
import type {Database} from "~/types/database.types";
import Authentication from "~/layouts/authentication.vue";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from 'zod'
import {useForm} from "vee-validate";

definePageMeta({
  layout: false,
})

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()
const toastStore = useToastStore()
const {t} = useI18n()

const loading = ref(false)

const formSchema = toTypedSchema(z.object({
  first_name: z.string().min(2),
  last_name: z.string().min(2),
}))

const {handleSubmit} = useForm({
  validationSchema: formSchema,
})

await useAsyncData('profile', async () => {
  const {data} = await supabase.from('profiles').upsert(
      {
        id: user.value?.id
      },
      {
        onConflict: 'id'
      }
  )
  return data
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true
    const {error} = await supabase
        .from('profiles')
        .update({
          first_name: values.first_name,
          last_name: values.last_name,
          completed_setup: true,
        })
        .eq('id', user.value?.id)
    if (error) throw error
    toastStore.createToast({
      type: 'success',
      action: 'save',
      item: t('profile.profile'),
    })
    await navigateTo('/dashboard')
  } catch (error) {
    toastStore.createToast({
      type: 'destructive',
      action: 'save',
      item: t('profile.profile'),
    })
    console.error(error)
  } finally {
    loading.value = false
  }
})

const skipOnboarding = async () => {
  try {
    loading.value = true
    const {error} = await supabase
        .from('profiles')
        .update({
          completed_setup: true,
        })
        .eq('id', user.value?.id)
    if (error) throw error
    await navigateTo('/dashboard')
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <Authentication :title="$t('account.profile.welcome_to', {appName: 'DietTailor'})"
                  :description="$t('account.profile.lets_start_with_your_profile')">
    <form @submit="onSubmit" class="space-y-6">
      <section id="profile-settings" class="space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <FormField v-slot="{ componentField }" name="first_name" :validate-on-model-update="false">
            <FormItem>
              <FormLabel>{{ $t('account.profile.first_name') }}</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="last_name" :validate-on-model-update="false">
            <FormItem>
              <FormLabel>{{ $t('account.profile.last_name') }}</FormLabel>
              <FormControl>
                <Input type="text" v-bind="componentField"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
        </div>
      </section>

      <div class="space-y-4">
        <Button type="submit" class="w-full" :loading="loading">
          {{ $t('common.actions.save') }}
        </Button>
        <Button @click="skipOnboarding" variant="outline" type="button" class="w-full" :loading="loading">
          {{ $t('common.actions.skip') }}
        </Button>
      </div>
    </form>
  </Authentication>
</template>

<style scoped>

</style>