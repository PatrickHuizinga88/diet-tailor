<script setup lang="ts">
import type {Database} from "~/types/database.types";
import {User, LogOut, Settings} from 'lucide-vue-next'
import {DropdownMenu} from "~/components/ui/dropdown-menu";

const props = defineProps<{
  wide?: boolean
}>()

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const logOut = async () => {
  await supabase.auth.signOut()
  navigateTo('/')
}

</script>

<template>
  <header>
    <LayoutContainer>
      <nav class="h-[var(--header-height)] flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/dashboard">
            <img src="@/assets/images/logo.svg" alt="DietTailor" class="h-7">
          </NuxtLink>
        </div>
        <DropdownMenu v-if="user">
          <DropdownMenuTrigger as-child>
            <Button variant="ghost" size="icon-sm">
              <User class="size-5"/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent :align-offset="10">
            <DropdownMenuItem as-child>
              <NuxtLink to="/account">
                <Settings class="size-4"/>
                My account
              </NuxtLink>
            </DropdownMenuItem>
            <DropdownMenuItem @click="logOut">
              <LogOut class="size-4"/>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button v-else variant="outline" size="sm" as-child>
          <NuxtLink to="/sign-in">
            {{ $t('authentication.common.sign_in') }}
          </NuxtLink>
        </Button>
      </nav>
    </LayoutContainer>
  </header>
</template>