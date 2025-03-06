<script setup>
import { ref, onMounted } from "vue";

const readHistory = ref([]);

const loadReadHistory = () => {
  const storedNews = localStorage.getItem("readNews");
  readHistory.value = storedNews ? JSON.parse(storedNews) : [];
};

onMounted(loadReadHistory);
</script>

<template>
  <div class="container mx-auto py-4">
    <h2 class="text-[25px] text-blue-700 font-bold">Reading History</h2>
    <div v-if="readHistory.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div v-for="item in readHistory" :key="item.url" class="bg-white p-3 shadow-md rounded-lg">
        <img :src="item.image" alt="News Image" class="w-full h-32 object-cover rounded-md" />
        <h3 class="text-lg font-semibold mt-2 line-clamp-2">{{ item.title }}</h3>
        <div class="flex justify-end text-white mt-2">
          <a :href="item.url" target="_blank" class="text-blue-600 font-semibold">Read More</a>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-center text-gray-500">No recently history read.</p>
    </div>
  </div>
</template>

<style scoped></style>
