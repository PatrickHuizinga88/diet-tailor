<script setup lang="ts">
import {ArrowLeft, ArrowRight} from "lucide-vue-next";
import {Progress} from "~/components/ui/progress";
import type {HTMLAttributes} from "vue";

const props = defineProps<{
  currentStep: number
  stepperValue: number
  nextStepButtonText: string
  useContainer: boolean
  class?: HTMLAttributes['class']
}>()

const LayoutContainer = resolveComponent('LayoutContainer')

const emit = defineEmits(['previousStep'])
</script>

<template>
  <div :class="cn('w-full border-t pb-4', props.class)">
    <Progress class="sm:hidden h-1.5 bg-muted mb-4" :model-value="stepperValue"/>
    <component :is="props.useContainer ? LayoutContainer : 'div'">
      <div class="flex gap-4">
        <Button type="button" size="icon-xl" class="shrink-0" variant="ghost" @click="emit('previousStep')"
                v-if="currentStep > 1" aria-label="Previous step">
          <ArrowLeft class="size-6" aria-hidden="true"/>
        </Button>
        <Button type="submit" size="xl" class="group w-full">
          {{ nextStepButtonText }}
          <ArrowRight class="size-6 ml-2 group-hover:translate-x-0.5 duration-200"/>
        </Button>
      </div>
    </component>
  </div>
</template>

<style scoped>

</style>