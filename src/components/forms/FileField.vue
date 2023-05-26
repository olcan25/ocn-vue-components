<template>
    <div>
      <LabelField :labelName="labelName" :field="field" />
      <div>
        <input
          :class="inputErrorDefault"
          type="file"
          :placeholder="placeholder"
          v-bind="attrs"
          @change="handleFileChangeWithUpload"
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
        <PreviewFile :previewFileUrl="previewFileUrl" />
      </div>
  
      <ErrorField :field="field" />
    </div>
  </template>
  
  <script setup>
  import { toRef, computed, ref } from "vue";
  import { useField } from "@vorms/core";
  import { v4 as uuidv4 } from "uuid";
  import {
    ref as firebaseRef,
    getDownloadURL,
    deleteObject,
    uploadBytesResumable,
  } from "firebase/storage";
  import { useToast } from "vue-toastification";
  
  import LabelField from "./LabelField.vue";
  import ErrorField from "./ErrorField.vue";
  import PreviewFile from "../preview/PreviewFile.vue";
  
  import { storage } from "../../utils/firebase";
  const toast = useToast();
  
  const file = ref(null);
  const previewFileUrl = ref(null);
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
  
  //const fieldRef = toRef(props, "field");
  
  const { value, error, attrs } = useField(field);
  
  if (typeof value.value === "string") {
    previewFileUrl.value = value.value;
    fetch(value.value)
      .then((response) => response.blob())
      .then((blob) => {
        if (blob) {
          const file = new File([blob], "myfile.pdf", { type: blob.type });
          isFileUploaded.value = true;
        } else {
          throw new Error("Blob is null or undefined.");
        }
      })
      .catch((error) => console.error(error));
  }
  
  const handleFileChangeWithUpload = async (e) => {
    if (value.value) {
      await deleteObject(firebaseRef(storage, value.value));
    }
    if (e.target.files[0].type !== fileType) {
      toast.error("Dosya tipi uygun değil. Lütfen PDF dosyası yükleyiniz.");
      return;
    }
    file.value = e.target.files[0];
    const storageRef = firebaseRef(
      storage,
      `files/${file.value.name}.${uuidv4()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file.value);
  
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        progress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
      },
      async () => {
        value.value = await getDownloadURL(uploadTask.snapshot.ref);
        isFileUploaded.value = true;
      }
    );
  
    const reader = new FileReader();
  
    reader.onload = () => {
      previewFileUrl.value = reader.result;
    };
  
    reader.readAsDataURL(file.value);
  };
  
  const inputErrorDefault = computed(() => {
    return error.value
      ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
      : "bg-gray-50 border border-gray-30 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  });
  </script>