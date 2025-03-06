<script setup>
import { formattedDate, saveHistoryRead } from "../../utils";

defineProps({
  article: Object,
});
</script>

<template>
  <div class="bg-whiteshadow-lg rounded-lg relative flex flex-col justify-end">
    <div class="absolute inset-0 bg-cover bg-center rounded-md" :style="{ backgroundImage: `url(${article.urlToImage})` }"></div>
    <div class="relative bg-black p-2 bg-opacity-50">
      <h2 class="text-[14px] font-bold text-white line-clamp-2 leading-5">{{ article.title }}</h2>
      <p class="text-[10px] text-gray-200 mt-2 line-clamp-2 leading-4">{{ article.description }}</p>
      <div class="flex justify-between text-white text-[10px] mt-2">
        <div class="text-[10px] max-w-[70%]">
          <p class="line-clamp-1">Author : {{ article.author }}</p>
          <p>{{ formattedDate(new Date(article.publishedAt)) }}</p>
        </div>
        <a :href="article.url" target="_blank" @click="saveHistoryRead(article)" class="text-blue-300 font-semibold mt-4 inline-block">Read More</a>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
