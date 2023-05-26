<template>
    <label :class="labelErrorDefault">{{ labelName }}</label>
  </template>
  
  <script setup>
  import { computed } from "vue";
  import { useField } from "@vorms/core";
  
  const { field } = defineProps({
    field: {
      type: String,
      required: true,
    },
    labelName: {
      type: String,
      default: "",
    },
  });
  
  const { error } = useField(field);
  
  const labelErrorDefault = computed(() => {
    return error.value
      ? "block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
      : "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300";
  });
  </script>