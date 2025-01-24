<script setup lang="ts">
import type {Question} from "~/types/Question";

const props = defineProps<{
  question: Question
  modelValue?: string | number | string[]
}>()

const modelValue = ref(
    props.modelValue ||
    (props.question.multiple ? [] : '')
)

const setOtherValue = () => {
  if (!Array.isArray(modelValue.value)) return null

  modelValue.value.find(item => {
    if (!props.question.options?.some(option => option.value === item)) {
      otherValue.value = item
    }
  })
}

const setShowOtherField = () => {
  if (!Array.isArray(modelValue.value)) return false

  return modelValue.value.some(item => {
    showOtherField.value = !props.question.options?.some(option => option.value === item)
  })
}

const otherValue = ref('')
const otherField = ref<HTMLInputElement | null>(null)
const showOtherField = ref(false)

const filteredOptions = computed(() => {
  return props.question.options?.filter(option => option.value !== 'other')
})

const onChangeSelect = (event: Event) => {
  const target = event.target as HTMLSelectElement
  if (target.value === 'other') {
    showOtherField.value = true
    otherField.value?.focus()
  } else {
    showOtherField.value = false
  }
}

const emit = defineEmits(['update:modelValue'])

const inputMode = () => {
  switch (props.question.inputType) {
    case 'number':
      return 'numeric'
    case 'email':
      return 'email'
    default:
      return 'text'
  }
}

// watch(showOtherField, (newValue) => {
//   nextTick(() => {
//     if (newValue && otherField.value) {
//       otherField.value.scrollIntoView({behavior: 'smooth'})
//       otherField.value.focus()
//     }
//   })
// })

watch([modelValue, otherValue], ([newModelValue, newOtherValue]) => {
  if (Array.isArray(newModelValue)) {
    if (otherValue.value) {
      emit('update:modelValue', [...newModelValue, newOtherValue])
    } else {
      emit('update:modelValue', newModelValue)
    }
  } else {
    emit('update:modelValue', newModelValue === 'other' ? newOtherValue : newModelValue)
  }
})

onMounted(() => {
  setShowOtherField()
  setOtherValue()
})
</script>

<template>
  <div class="flex-1">
    <div v-if="!question.options" class="flex items-center gap-4">
      <Input v-model="modelValue" :type="question.inputType" :placeholder="question.placeholder"
             :inputmode="inputMode()"
             aria-labelledby="heading-title" :required="!question.optional"/>
      <p v-if="question.suffix" class="shrink-0">{{ question.suffix }}</p>
    </div>
    <template v-else>
      <template v-if="question.options.length > 6 && !question.multiple">
        <select v-model="modelValue" @change="onChangeSelect($event)"
                class="flex h-14 w-full rounded-lg border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
          <option hidden selected>{{ question.placeholder ?? 'Selecteer een optie' }}</option>
          <option v-for="option in filteredOptions" :value="option.value">{{ option.label }}</option>
          <option v-if="question.options.some(option => option.isOther)" value="other">Other</option>
        </select>
      </template>
      <div v-else class="grid grid-cols-2 gap-4">
        <div v-for="option in question.options" class="relative">
          <template v-if="question.multiple">
            <input v-if="!option.isOther" v-model="modelValue" type="checkbox" :value="option.value" :id="option.value" :name="question.id"
                   class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none"/>
            <input v-else v-model="showOtherField" type="checkbox" :value="option.value" :id="option.value" :name="question.id"
                   class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none"/>
            <label :for="option.value"
                   class="flex flex-col rounded-lg border p-4 h-full cursor-pointer transition-[background-color] duration-200 hover:bg-muted peer-focus-visible:bg-muted peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary peer-checked:text-primary-dark">
              <span class="font-medium">{{ option.label }}</span>
              <p v-if="option.description" class="text-sm text-muted-foreground mt-1">{{ option.description }}</p>
            </label>
          </template>
          <template v-else>
            <input v-model="modelValue" type="radio" :value="option.value" :id="option.value"
                   :name="question.id.toString()"
                   class="peer absolute opacity-0 -z-10 inset-0 pointer-events-none" :required="!question.optional"/>
            <label :for="option.value"
                   class="flex flex-col rounded-lg border p-4 h-full cursor-pointer transition-[background-color] duration-200 hover:bg-muted peer-focus-visible:bg-muted peer-checked:border-primary peer-checked:outline peer-checked:outline-2 peer-checked:outline-primary peer-checked:text-primary-dark">
              <span class="font-medium">{{ option.label }}</span>
              <p v-if="option.description" class="text-sm text-muted-foreground mt-1">{{ option.description }}</p>
            </label>
          </template>
        </div>
      </div>
      <input v-if="showOtherField" v-model="otherValue" ref="otherField" type="text" placeholder="Enter your own answer here..."
             class="flex h-14 w-full rounded-lg border border-input bg-background px-3 py-2 mt-4 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
             required/>
    </template>
  </div>
</template>

<style scoped>

</style>