<script setup lang="ts">
import type User from '~/types/User'
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";
import {LoaderCircle} from "lucide-vue-next";

const props = defineProps<{
  user?: User
}>()

const notificationStore = useNotificationStore()

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'editor', label: 'Editor' },
  { value: 'viewer', label: 'Viewer' },
]

const formSchema = toTypedSchema(z.object({
  name: z.string(),
  email: z.string(),
  role: z.string(),
}))

const form = useForm({
  initialValues: {
    name: props.user?.name ,
    email: props.user?.email,
    role: props.user?.role,
  },
  validationSchema: formSchema,
})

const loading = ref(false)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    loading.value = true
    await $fetch('/api/users', {
      method: props.user ? 'PUT' : 'POST',
      body: {
        id: props.user?.id,
        ...values
      }
    })

    notificationStore.createNotification({
      title: `User ${values.name} saved`,
      description: 'User has been saved successfully.',
      type: 'success'
    })
    navigateTo(`/users/${useRoute().params.id}`)
  } catch (error) {
    if (error) {
      notificationStore.createNotification({
        title: 'Failed',
        description: 'An error occurred while saving.',
        type: 'destructive'
      })
      throw error
    }
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-6">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="email">
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input type="email" v-bind="componentField" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>

    <FormField v-slot="{ componentField }" name="role">
      <FormItem>
        <FormLabel>Role</FormLabel>
        <Select v-bind="componentField">
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            <SelectItem v-for="option in roleOptions" :value="option.value">
              {{ option.label }}
            </SelectItem>
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    </FormField>

    <Button :disabled="loading">
      Save
      <LoaderCircle v-if="loading" class="size-5 ml-2 animate-spin" />
    </Button>
  </form>
</template>