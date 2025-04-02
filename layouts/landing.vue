<script setup lang="ts">
import {Toaster} from "~/components/ui/toast";

const user = useSupabaseUser()
const toastStore = useToastStore();
</script>

<template>
  <NuxtLoadingIndicator color="hsl(var(--primary))"/>

  <header class="sticky top-0 left-0 bg-gradient-to-b from-background to-background-70 backdrop-blur z-20">
    <div class="container">
      <nav class="h-[var(--header-height)] flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/">
            <img src="@/assets/images/logo.svg" alt="Logo" class="h-7">
          </NuxtLink>
        </div>
        <div class="flex items-center gap-6 sm:gap-10">
          <NuxtLink to="/contact" class="text-sm font-medium" active-class="text-primary">Contact</NuxtLink>
          <Button variant="outline" size="sm" as-child>
            <NuxtLink :to="user ? '/dashboard' : '/sign-in'">
              {{ user ? 'Dashboard' : $t('authentication.common.sign_in') }}
            </NuxtLink>
          </Button>
        </div>
      </nav>
    </div>
  </header>

  <main class="flex-1 py-12">
    <slot/>
  </main>

  <footer class="bg-muted/50 py-12 sm:py-8">
    <div class="container">
      <div class="flex flex-col sm:flex-row sm:items-end justify-between">
        <div>
          <img src="../assets/images/logo.svg" alt="DietTailor" class="h-8 mb-4"/>
          <div class="text-sm text-muted-foreground">Copyright ©{{ $dayjs().format('YYYY') }} DietTailor</div>
        </div>
        <Separator class="sm:hidden my-6"/>
        <nav>
          <ul class="flex gap-8">
            <li>
              <NuxtLink to="/privacy-policy" class="text-sm text-muted-foreground hover:underline duration-150">
                Privacy Policy
              </NuxtLink>
            </li>
            <li>
              <NuxtLink to="/terms-of-service" class="text-sm text-muted-foreground hover:underline duration-150">
                Terms of Service
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </footer>

  <Toaster :toasts="toastStore.toasts"/>

</template>