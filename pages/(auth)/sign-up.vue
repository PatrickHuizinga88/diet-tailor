<script setup lang="ts">
import {ArrowRight} from "lucide-vue-next";

definePageMeta({
  layout: false,
})

const registerForm = useTemplateRef('register-form')
</script>

<template>
  <NuxtLayout name="authentication" :title="$t('authentication.register.sign_up')">
    <Register ref="register-form"/>

    <template v-if="!registerForm?.success" #footer>
      {{ $t('authentication.register.have_account') + ' ' }}
      <Button variant="link" class="h-auto p-0 ml-1" as-child>
        <NuxtLink to="/sign-in">
          {{ $t('authentication.common.sign_in') }}
          <ArrowRight class="size-4" aria-hidden="true"/>
        </NuxtLink>
      </Button>
    </template>
  </NuxtLayout>
</template>

<style scoped>

</style>