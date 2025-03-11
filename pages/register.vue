<script setup lang="ts">
import Authentication from "~/layouts/authentication.vue"

definePageMeta({
  layout: false
})
</script>

<template>
  <Authentication :title="$t('authentication.register.create_new_account')">
    <Register/>
  </Authentication>
</template>
