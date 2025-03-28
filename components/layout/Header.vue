<script setup lang="ts">
import type {Database} from "~/types/database.types";
import {User, LogOut, Settings} from 'lucide-vue-next'
import {DropdownMenu} from "~/components/ui/dropdown-menu";

const supabase = useSupabaseClient<Database>()
const user = useSupabaseUser()

const logOut = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>

<template>
  <header>
    <LayoutContainer>
      <nav class="h-[var(--header-height)] flex justify-between items-center">
        <div class="flex items-center">
          <NuxtLink to="/">
            <img src="@/assets/images/logo.svg" alt="Logo" class="h-7">
          </NuxtLink>
<!--          <ul v-if="user" class="hidden md:flex gap-x-2 ml-6">-->
<!--            <li>-->
<!--              <NuxtLink-->
<!--                  to="/dashboard"-->
<!--                  class="p-2 font-medium text-sm hover:text-primary-dark duration-150"-->
<!--                  active-class="text-primary-dark">Home-->
<!--              </NuxtLink>-->
<!--            </li>-->
<!--            <li>-->
<!--              <NuxtLink-->
<!--                  to="/meal-plan"-->
<!--                  class="p-2 font-medium text-sm hover:text-primary-dark duration-150"-->
<!--                  active-class="text-primary-dark">-->
<!--                Meal plan-->
<!--              </NuxtLink>-->
<!--            </li>-->
<!--            <li>-->
<!--              <NuxtLink-->
<!--                  to="/preferences"-->
<!--                  class="p-2 font-medium text-sm hover:text-primary-dark duration-150"-->
<!--                  active-class="text-primary-dark">-->
<!--                Preferences-->
<!--              </NuxtLink>-->
<!--            </li>-->
<!--          </ul>-->
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
          <NuxtLink to="/login">
            Login
          </NuxtLink>
        </Button>
      </nav>
    </LayoutContainer>
  </header>
</template>