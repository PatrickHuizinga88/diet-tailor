<template>
  <div class="relative rounded-md shadow-sm">
    <div v-if="iconPosition === 'Left'" class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <slot aria-hidden="true"/>
    </div>
    <input
        :id="field.id"
        :value="props.modelValue"
        @input="emit( 'update:modelValue', $event.target.value)"
        :required="field.required"
        :class="[
            invalid ? 'ring-red-500' : 'ring-gray-300 dark:ring-zinc-700',
            iconPosition === 'Left' ? 'pl-10 pr-3' : 'pr-10 pl-3',
            'block w-full rounded-md dark:bg-zinc-800 border-0 py-1.5 ring-1 ring-inset placeholder:text-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-inset focus:ring-primary-500 dark:focus:ring-primary-500 sm:leading-6 sm:text-sm'
        ]"
        v-bind="$attrs"/>
    <div v-if="iconPosition === 'Right'" class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
      <slot aria-hidden="true"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  iconPosition: {
    type: String,
    default: 'Left'
  },
  invalid: Boolean,
  modelValue: [String, Number]
})

defineOptions({
  inheritAttrs: false
})

const field = inject("field", props)

const emit = defineEmits(['update:modelValue'])
</script>

<style scoped>

</style>