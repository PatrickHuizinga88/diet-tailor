<script setup lang="ts">
const props = defineProps<{
  questionId: string
  type: 'input' | 'radio' | 'checkbox'
  placeholder?: string
  suffix?: string
  options?: {
    label: string
    description?: string
    value: string
    isOther?: boolean
  }[]
  modelValue?: string | number | string[]
}>()

const emit = defineEmits(['update:modelValue'])

const checked = ref([])

const modelValue = ref(props.modelValue || (props.type === 'checkbox' ? [] : ''))

watch(modelValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <div v-if="type === 'input'" class="flex items-center gap-4">
    <Input v-model="modelValue" type="number" :placeholder="placeholder" inputmode="numeric" min="0" required aria-labelledby="heading-title"/>
    <p v-if="suffix" class="shrink-0">{{ suffix }}</p>
  </div>
    <div v-else-if="type === 'radio'" class="grid grid-cols-2 gap-4">
      <div v-for="option in options" class="relative">
        <input v-model="modelValue" type="radio" :value="option.value" :id="option.value" :name="questionId.toString()" class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none" required/>
        <label :for="option.value" class="flex flex-col rounded-lg border p-4 h-full cursor-pointer transition-[background-color] duration-200 hover:bg-muted peer-focus-visible:rin peer-focus-visible:ring-offset-2 ring-offset-background peer-focus-visible:ring-ring peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary peer-checked:text-primary-dark">
          <span class="font-medium">{{option.label}}</span>
          <p v-if="option.description" class="text-sm text-muted-foreground mt-1">{{option.description}}</p>
        </label>
      </div>
    </div>
    <div v-else-if="type === 'checkbox'" class="grid grid-cols-2 gap-4">
      <div v-for="option in options" class="relative">
        <input v-model="checked" type="checkbox" :value="option.value" :id="option.value" :name="questionId.toString()" class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none"/>
        <label :for="option.value" class="flex flex-col rounded-lg border p-4 h-full cursor-pointer transition-[background-color] duration-200 hover:bg-muted peer-focus-visible:rin peer-focus-visible:ring-offset-2 ring-offset-background peer-focus-visible:ring-ring peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary peer-checked:text-primary-dark">
          <span class="font-medium">{{option.label}}</span>
          <p v-if="option.description" class="text-sm text-muted-foreground mt-1">{{option.description}}</p>
        </label>
      </div>
    </div>
</template>

<style scoped>

</style>