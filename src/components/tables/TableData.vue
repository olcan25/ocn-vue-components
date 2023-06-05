<template>
    <th
      scope="row"
      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
    >
      {{ index + 1 }}
    </th>
    <td class="px-6 py-4" v-for="(value, key) in headers" :key="key">
      {{ item[key] }}
    </td>
  </template>
  
  <script setup>
  const props = defineProps({
    headers: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  });
  </script>