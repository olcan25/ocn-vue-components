<template>
    <!-- v-if="isAdio" -->

    <div v-if="isPdf" class="flex justify-center">
      <embed :src="previewFileUrl" type="application/pdf" width="100%" height="600px" />
    </div>

    <div v-if="isImage" class="flex justify-center">
      <img :src="previewFileUrl" />
    </div>

    <div v-if="isVideo" class="flex justify-center">
      <video :src="previewFileUrl" controls></video>
    </div>

    <div v-if="isAudio" class="flex justify-center">
      <audio :src="previewFileUrl" controls></audio>
    </div>

    <div v-if="!isPdf && !isImage && !isVideo && !isAudio" class="flex justify-center">
      <p>File type not supported</p>
    </div>
</template>

<script setup>
import { computed } from "vue";
const { previewFileUrl } = defineProps({
  previewFileUrl: {
    type: String,
    required: true,
  },
});

const isPdf = computed(() => {
  return previewFileUrl.value.includes("pdf");
});

const isImage = computed(() => {
  return previewFileUrl.value.includes("image");
});

const isVideo = computed(() => {
  return previewFileUrl.value.includes("video");
});

const isAudio = computed(() => {
  return previewFileUrl.value.includes("audio");
});

</script>
