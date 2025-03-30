<script setup lang="ts">
import {CheckCircle} from 'lucide-vue-next'
import Authentication from "~/layouts/authentication.vue";

definePageMeta({
  layout: false,
})
</script>

<template>
  <Authentication title="">
    <CheckCircle class="size-16 text-success mb-6 mx-auto"/>
    <h1 class="text-3xl font-semibold text-center mb-2">{{ $t('authentication.register.account_activated') }}</h1>
    <p class="text-muted-foreground text-center">{{ $t('authentication.register.welcome_to', {appName: 'Diet Tailor'}) }}</p>
    <Button class="w-full mt-6" as-child>
      <NuxtLink to="/(auth)/sign-in">
        {{ $t('authentication.register.sign_in_to_get_started') }}
      </NuxtLink>
    </Button>
  </Authentication>
</template>
