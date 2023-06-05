<template>
    <!-- Search Bar -->
    <div class="pb-4 bg-white dark:bg-gray-900">
      <label for="table-search" class="sr-only">Search</label>
      <div class="relative mt-1">
        <div
          class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            class="w-5 h-5 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
        <input
          type="text"
          v-model="search"
          id="table-search"
          class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Ara..."
        />
      </div>
    </div>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <TableHeader @sortList="sort" />
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 odd:bg-white even:bg-gray-50"
            v-for="(row, index) in filteredRows"
            :key="row.id"
          >
            <TableData :item="row" :index="index" :headers="headers" />
            <td class="flex items-center px-6 py-4 space-x-3">
              <slot name="actions" :item="row"></slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, defineAsyncComponent, computed, toRefs } from "vue";
  
  const props = defineProps({
    headers: {
      type: Object,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  });
  
  const { data, headers } = toRefs(props);
  
  //Components
  const TableHeader = defineAsyncComponent(() => import("./TableHeader.vue"));
  const TableData = defineAsyncComponent(() => import("./TableData.vue"));
  
  const sortColumn = ref(null);
  const sortDirection = ref("asc");
  const search = ref("");
  
  const filteredRows = computed(() => {
    let filtered = data.value;
    if (search.value) {
      const searchValue = search.value.toLowerCase();
      filtered = filtered.filter((row) => {
        return Object.values(row).some((value) => {
          return String(value).toLowerCase().includes(searchValue);
        });
      });
    }
    if (sortColumn.value !== null) {
      const column = Object.keys(headers.value)[sortColumn.value];
      filtered.sort((a, b) => {
        const valueA = a[column];
        const valueB = b[column];
        if (valueA < valueB) return sortDirection.value === "asc" ? -1 : 1;
        if (valueA > valueB) return sortDirection.value === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  });
  
  const sort = (columnIndex) => {
    if (columnIndex === sortColumn.value) {
      sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
    } else {
      sortColumn.value = columnIndex;
      sortDirection.value = "asc";
    }
  };
  </script>