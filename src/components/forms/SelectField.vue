<template>
    <div>
      <LabelField :labelName="labelName" :field="field" />
      <select
        :class="inputErrorDefault"
        :placeholder="placeholder"
        v-model="value"
        v-bind="attrs"
      >
        <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
      <ErrorField :field="field" />
    </div>
  </template>
  
  <script setup>
  import { toRef, computed } from "vue";
  import { useField } from "@vorms/core";
  
  import LabelField from "./LabelField.vue";
  import ErrorField from "./ErrorField.vue";
  
  const { field } = defineProps({
    field: {
      type: String,
      required: true,
    },
    labelName: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: null,
    },
    options: {
      type: Array,
      required: true,
    },
  });
  
  const { value, error, attrs } = useField(field);
  
  const inputErrorDefault = computed(() => {
    return error.value
      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
      : "bg-gray-50 border border-gray-30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  });
  </script>
  
  <style scoped></style>