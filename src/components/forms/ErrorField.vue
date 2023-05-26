<template>
    <p v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500">
      <span class="font-medium">Hata!</span> {{ error }}
    </p>
  </template>
  
  <script setup>
  import { useField } from "@vorms/core";
  
  const { field } = defineProps({
    field: {
      type: String,
      required: true,
    },
  });
  
  const { error } = useField(field);
  </script>