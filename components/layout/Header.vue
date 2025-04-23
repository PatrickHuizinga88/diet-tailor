<script setup lang="ts">
import type {Database} from "~/types/database.types";
import {User, LogOut, Settings} from 'lucide-vue-next'
import {DropdownMenu} from "~/components/ui/dropdown-menu";

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const mainNavItems = [
  {name: 'Dashboard', url: '/dashboard'},
  {name: 'Preferences', url: '/preferences'},
]

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
          <NuxtLink :to="user ? '/dashboard' : '/'">
            <img src="/logo.svg" alt="DietTailor" class="h-7">
          </NuxtLink>
          <ul v-if="user" class="hidden md:flex items-center">
            <li v-for="item in mainNavItems" :key="item.name" class="ml-6">
              <NuxtLink :to="item.url" active-class="text-primary" class="text-sm font-medium hover:text-primary">
                {{ item.name }}
              </NuxtLink>
            </li>
          </ul>
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
          <NuxtLink :to="user ? '/dashboard' : '/sign-in'">
            {{ user ? 'Dashboard' : $t('authentication.common.sign_in') }}
          </NuxtLink>
        </Button>
      </nav>
    </LayoutContainer>
  </header>
</template>