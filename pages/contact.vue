<script setup lang="ts">
import {Send, CheckCircle} from "lucide-vue-next";
import {toTypedSchema} from "@vee-validate/zod";
import * as z from "zod";
import {useForm} from "vee-validate";

definePageMeta({
  layout: 'landing'
})

useServerSeoMeta({
  title: 'Contact Us',
  description: 'Get in touch with us for any inquiries or support.',
})

const {t} = useI18n()

const loading = ref(false)
const success = ref(false)

const formSchema = toTypedSchema(z.object({
  email: z
      .string({
        message: t('common.validations.required')
      })
      .email(),
  message: z
      .string({
        message: t('common.validations.required')
      })
      .min(10, t('common.validations.min_length', {min: 10})),
}))

const {handleSubmit} = useForm({
  validationSchema: formSchema,
})

const onSubmit = handleSubmit(async (values) => {
  try {
    loading.value = true

    const {error} = await $fetch('/api/send', {
      method: 'POST',
      body: {
        sender: values.email,
        message: values.message,
      }
    })
    if (error) throw error

    success.value = true
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="container">
    <div class="grid md:grid-cols-2 items-start gap-12 min-h-[75svh] pb-14 md:pb-20 lg:pb-24">
      <section id="heading">
        <div class="max-w-lg">
          <div class="font-medium text-primary mb-2">Contact</div>
          <h1 class="mb-4">Need some help? Contact us!</h1>
          <p class="text-muted-foreground">Reach out to us for any inquiries, feedback, or support. We're here to assist
            you.</p>
        </div>
      </section>
      <section id="contact-form">
        <form v-if="!success" @submit="onSubmit" class="sm:border sm:rounded-2xl sm:shadow-xl sm:p-6 space-y-6">
          <FormField v-slot="{ componentField}" name="email" :validate-on-model-update="false">
            <FormItem>
              <FormLabel>{{ $t('common.general.email') }}</FormLabel>
              <FormControl>
                <Input v-bind="componentField" type="text" placeholder="name@example.com"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField}" name="message" :validate-on-model-update="false">
            <FormItem>
              <FormLabel>{{ $t('contact.contact_form.message') }}</FormLabel>
              <FormControl>
                <Textarea v-bind="componentField" rows="4"/>
              </FormControl>
              <FormMessage/>
            </FormItem>
          </FormField>
          <Button type="submit" size="sm" :loading="loading" class="w-full sm:w-auto">
            <Send/>
            {{ capitalizeSentence($t('common.actions.send_item', {item: $t('contact.contact_form.message')})) }}
          </Button>
        </form>
        <Alert v-else variant="success">
          <CheckCircle class="size-4"/>
          <AlertTitle>{{ $t('contact.contact_form.success.title') }}</AlertTitle>
          <AlertDescription>{{ $t('contact.contact_form.success.description') }}</AlertDescription>
        </Alert>
      </section>
    </div>
  </div>
</template>

<style scoped>

</style>