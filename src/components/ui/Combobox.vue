<template>
  <div class="relative" ref="comboboxRef">
    <Input
      ref="inputRef"
      :model-value="searchTerm"
      @input="onInput"
      @focus="isOpen = true"
      @keydown.down.prevent="navigateOptions(1)"
      @keydown.up.prevent="navigateOptions(-1)"
      @keydown.enter.prevent="selectHighlightedOption"
      :placeholder="placeholder"
      autocomplete="off"
    />
    <Transition
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen && filteredOptions.length"
        class="absolute z-10 mt-1 w-full bg-card border rounded-md shadow-lg max-h-60 overflow-y-auto"
      >
        <ul>
          <li
            v-for="(option, index) in filteredOptions"
            :key="option.value"
            @click="selectOption(option)"
            class="px-4 py-2 hover:bg-muted cursor-pointer"
            :class="{ 'bg-muted': highlightedIndex === index }"
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
  modelValue: string | null;
  options: ComboboxOption[];
  placeholder?: string;
}>();

const emit = defineEmits(['update:modelValue']);

const isOpen = ref(false);
const searchTerm = ref('');
const comboboxRef = ref<HTMLElement | null>(null);
const inputRef = ref<typeof Input | null>(null);
const highlightedIndex = ref(-1);

const filteredOptions = computed(() => {
  if (!searchTerm.value) return props.options;
  return props.options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

async function onInput(event: Event) {
  const input = event.target as HTMLInputElement;
  const originalValue = input.value;
  searchTerm.value = originalValue;
  isOpen.value = true;
  highlightedIndex.value = 0;

  if (!originalValue) {
    emit('update:modelValue', null);
    return;
  }
  
  const firstMatch = filteredOptions.value[0];
  if (firstMatch && firstMatch.label.toLowerCase().startsWith(originalValue.toLowerCase())) {
    searchTerm.value = firstMatch.label;
    await nextTick();
    input.value = firstMatch.label;
    input.setSelectionRange(originalValue.length, firstMatch.label.length);
  } else {
    emit('update:modelValue', null);
  }
}

function selectOption(option: ComboboxOption) {
  searchTerm.value = option.label;
  emit('update:modelValue', option.value);
  isOpen.value = false;
}

function selectHighlightedOption() {
    if (isOpen.value && highlightedIndex.value >= 0) {
        selectOption(filteredOptions.value[highlightedIndex.value]);
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