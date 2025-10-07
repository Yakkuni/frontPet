<template>
  <div class="relative" ref="comboboxRef">
    <Input
      ref="inputRef"
      :model-value="searchTerm"
      @input="onInput"
      @focus="!props.disabled && (isOpen = true)"
      @keydown.down.prevent="navigateOptions(1)"
      @keydown.up.prevent="navigateOptions(-1)"
      @keydown.enter.prevent="selectHighlightedOption"
      :placeholder="placeholder"
      :disabled="props.disabled"
      autocomplete="off"
    />
    <Transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && filteredOptions.length && !props.disabled"
        class="absolute z-10 mt-1 w-full bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto"
      >
        <ul>
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            @click="!props.disabled && selectOption(option)"
            class="px-4 py-2 hover:bg-muted"
            :class="{ 'cursor-pointer': !props.disabled, 'cursor-not-allowed opacity-50': props.disabled, 'bg-muted': highlightedIndex === index }"
          >
            {{ option.label }}
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';
import Input from '@/components/ui/Input.vue';

type ComboboxOption = {
  value: string;
  label: string;
};

const props = defineProps<{
  // modelValue can be an existing option value (uuid) or free text typed by the user
  modelValue: string | null;
  options: ComboboxOption[];
  placeholder?: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
}>();

const isOpen = ref(false);
const searchTerm = ref('');
const comboboxRef = ref<HTMLElement | null>(null);
const inputRef = ref<typeof Input | null>(null);
const highlightedIndex = ref(-1);

const filteredOptions = computed(() => {
  // Filtra opções inválidas primeiro
  const validOptions = props.options.filter(option => 
    option && option.label && option.value
  );
  
  if (!searchTerm.value) return validOptions;
  
  return validOptions.filter(option =>
    option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

async function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const originalValue = input.value;
  searchTerm.value = originalValue;
  isOpen.value = true;
  highlightedIndex.value = 0;

  // Always emit the typed text so parent can react and add a "new" option
  if (!originalValue) {
    emit('update:modelValue', null);
    return;
  }

  emit('update:modelValue', originalValue);

  const firstMatch = filteredOptions.value[0];
  if (firstMatch && firstMatch.label.toLowerCase().startsWith(originalValue.toLowerCase())) {
    // Autocomplete visual helper but still keep modelValue as the typed text
    searchTerm.value = firstMatch.label;
    await nextTick();
    input.value = firstMatch.label;
    input.setSelectionRange(originalValue.length, firstMatch.label.length);
  }
}

function selectOption(option: ComboboxOption) {
  if (!option || !option.label || !option.value) {
    console.error('Invalid option passed to selectOption:', option);
    return;
  }
  
  searchTerm.value = option.label;
  emit('update:modelValue', option.value);
  isOpen.value = false;
}

function selectHighlightedOption() {
    if (isOpen.value && highlightedIndex.value >= 0 && 
        highlightedIndex.value < filteredOptions.value.length) {
        const selectedOption = filteredOptions.value[highlightedIndex.value];
        if (selectedOption && selectedOption.label && selectedOption.value) {
            selectOption(selectedOption);
        }
    }
}

function navigateOptions(direction: 1 | -1) {
    if (!isOpen.value) isOpen.value = true;
    const newIndex = highlightedIndex.value + direction;
    if (newIndex >= 0 && newIndex < filteredOptions.value.length) {
        highlightedIndex.value = newIndex;
    }
}

const handleClickOutside = (event: MouseEvent) => {
  if (comboboxRef.value && !comboboxRef.value.contains(event.target as Node)) {
    isOpen.value = false;
    highlightedIndex.value = -1;
  }
};

onMounted(() => {
  const initialOption = props.options.find(opt => opt.value === props.modelValue);
  if (initialOption) searchTerm.value = initialOption.label;
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>