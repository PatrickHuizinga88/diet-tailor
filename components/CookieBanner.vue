<script setup lang="ts">

import {Switch} from "~/components/ui/switch";
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="transform opacity-0 scale-95"
    enter-to-class="transform opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="transform opacity-100 scale-100"
    leave-to-class="transform opacity-0 scale-95"
    apprear
  >
    <div
      class="fixed bottom-4 left-4 right-4 sm:right-auto sm:w-full sm:max-w-sm bg-background rounded-xl shadow-[0_0_50px_-12px_#0004] p-4">
      <h1 class="text-2xl mb-2">We use cookies 🍪</h1>
      <p class="text-sm text-muted-foreground mb-4">
        We use cookies to improve your experience on our website. By clicking "Accept", you agree to our use of cookies.
      </p>
      <div class="grid grid-cols-2 gap-2">
        <Button size="sm">Accept</Button>
        <Button variant="outline" size="sm">Decline</Button>
        <Dialog>
          <DialogTrigger as-child>
            <Button variant="outline" size="sm" class="col-span-2">Manage preferences</Button>
          </DialogTrigger>
          <DialogContent class="max-w-xl">
            <DialogHeader>
              <DialogTitle>
                Manage cookie preferences
              </DialogTitle>
            </DialogHeader>
            <p class="mb-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.</p>
            <Accordion type="single" collapsible>
              <AccordionItem value="necessary">
                <AccordionTrigger>
                  <h2 id="necassary-cookies-label" class="text-lg">Necessary cookies</h2>
                  <Switch id="necessary-cookies" aria-labelledby="necassary-cookies-label"/>
                </AccordionTrigger>
                <AccordionContent>
                  <p class="text-sm text-muted-foreground mb-4">These cookies are necessary for the website to function
                    and cannot be switched off in our systems. They are usually only set in response to actions made by
                    you which amount to a request for services, such as setting your privacy preferences, logging in or
                    filling in forms. You can set your browser to block or alert you about these cookies, but some parts
                    of the site will not then work. These cookies do not store any personally identifiable
                    information.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <DialogFooter>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full">
                <Button variant="outline" size="sm" class="w-full">Decline all</Button>
                <Button variant="outline" size="sm" class="w-full">Accept all</Button>
                <Button size="sm" class="col-span-2 sm:col-span-1 w-full">Save preferences</Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  </transition>
</template>

<style scoped>

</style>