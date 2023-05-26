<template>
  <div>
    <LabelField :labelName="labelName" :field="field" />
    <div>
      <input
        :class="inputErrorDefault"
        type="file"
        :placeholder="placeholder"
        v-bind="attrs"
        @change="handleFileUpload"
      />
      <!-- create a progress bar -->
      <div v-if="progress > 0" class="relative pt-1">
        <div class="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
          <div
            :style="{ width: progress + '%' }"
            class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
          ></div>
        </div>
      </div>
    </div>
    <div>
      <!-- <PreviewFile :previewFileUrl="previewFileUrl" /> -->
    </div>

    <ErrorField :field="field" />
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import { useField } from "@vorms/core";

import LabelField from "./LabelField.vue";
import ErrorField from "./ErrorField.vue";
//   import PreviewFile from "../preview/PreviewFile.vue";

const file = ref(null);
const previewFileUrl = ref(null);
const isFileType = ref(null);
let isFileUploaded = ref(false);
const progress = ref(0);

const { field, fileType } = defineProps({
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
  fileType: {
    type: String,
    default: "application/pdf",
  },
});

const { value, error, attrs } = useField(field);

const handleFileUpload = (e) => {
  file.value = e.target.files[0];

  if (file.value) {
    isFileType.value = file.value.type;
    const reader = new FileReader();
    reader.readAsDataURL(file.value);
    reader.onload = () => {
      previewFileUrl.value = reader.result;
    };
  }
};

const inputErrorDefault = computed(() => {
  return error.value
    ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
    : "bg-gray-50 border border-gray-30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
});
</script>
