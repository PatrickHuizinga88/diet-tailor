<script setup lang="ts">
import {Plus, Minus} from "lucide-vue-next";

const isOpen = ref(false)
</script>

<template>
  <Collapsible v-model:open="isOpen" class="bg-muted rounded-lg">
    <CollapsibleContent>
      <dl class="text-sm divide-y divide-border px-2">
        <slot/>
        <div class="bg-border h-px w-full" aria-hidden="true"></div>
      </dl>
    </CollapsibleContent>
    <CollapsibleTrigger class="w-full flex items-center justify-center h-9 text-sm font-medium px-2">
      View nutrition details
      <Plus v-if="!isOpen" class="size-5 ml-1"/>
      <Minus v-else class="size-5 ml-1"/>
    </CollapsibleTrigger>
  </Collapsible>
</template>

<style scoped>

</style>