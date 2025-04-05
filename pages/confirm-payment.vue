<script setup lang="ts">
import {CheckCircle, LoaderCircle, XCircle} from "lucide-vue-next";

const {query} = useRoute()

const loading = ref(true)
const success = ref()

const checkSuccess = () => {
  try {
    success.value = query.payment_successful === 'true';
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

checkSuccess()
</script>

<template>
  <LayoutContainer>
    <div v-if="loading" class="grid place-items-center h-[70svh]">
      <LoaderCircle/>
    </div>
    <template v-if="success">
      <CheckCircle class="size-16 text-success mb-6 mx-auto"/>
      <h1 class="text-3xl font-semibold text-center mb-2">Payment succeeded</h1>
      <p class="text-muted-foreground text-center">
        Thank you for upgrading your plan! Your payment was successful, and you now have access to all the extra features.
      </p>
      <Button class="w-full mt-6" as-child>
        <NuxtLink to="/dashboard">
          Continue
        </NuxtLink>
      </Button>
    </template>
    <template v-else>
      <XCircle class="size-16 text-destructive mb-6 mx-auto"/>
      <h1 class="text-3xl font-semibold text-center mb-2">Payment failed</h1>
      <p class="text-muted-foreground text-center">Unfortunately, your payment was not successful. Please try again or contact us if the issue persists.</p>
      <div class="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6">
        <Button class="w-full" as-child>
          <NuxtLink to="/account#billing">
            Try again via account
          </NuxtLink>
        </Button>
        <Button variant="outline" class="w-full" as-child>
          <NuxtLink to="/contact">
            Contact us
          </NuxtLink>
        </Button>
      </div>
    </template>
  </LayoutContainer>
</template>

<style scoped>

</style>