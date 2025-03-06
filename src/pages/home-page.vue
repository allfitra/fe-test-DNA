<script setup>
import { ref, onMounted, computed } from "vue";
import { getDataNews } from "../services/news-api";
import MainCard from "../components/Home/main-card.vue";
import ReadHistory from "../components/Home/read-history.vue";
import SideCard from "../components/Home/side-card.vue";
import SceletonLoading from "../components/sceleton-loading.vue";

const news = ref([]);
const newsSearch = ref("");
const isLoading = ref(false);

const fetchNews = async (query = "world") => {
  isLoading.value = true;
  news.value = await getDataNews(query);
  isLoading.value = false;
  console.log(news);
};

const searchNews = async () => {
  if (newsSearch.value.trim() !== "") {
    await fetchNews(newsSearch.value);
  }
};

onMounted(() => {
  fetchNews();
});

const chunkedNews = computed(() => {
  let chunkSize = 5;
  let chunks = [];
  for (let i = 0; i < news.value.length; i += chunkSize) {
    chunks.push(news.value.slice(i, i + chunkSize));
  }
  return chunks;
});

console.log(chunkedNews);
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-between mb-4">
      <h2 class="text-[35px] text-blue-700 font-bold">HOTs News</h2>
      <form @submit.prevent="searchNews" class="w-[400px] relative">
        <label for="default-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500" aria-hidden="true" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            v-model="newsSearch"
            class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Keywords..."
            required
          />
          <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-4 py-2">Search</button>
        </div>
      </form>
    </div>

    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <SceletonLoading />
      <SceletonLoading />
      <SceletonLoading />
      <SceletonLoading />
    </div>
    <div v-for="(chunk, index) in chunkedNews" :key="index">
      <div v-if="index == 0">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <MainCard :article="chunk[0]" />

          <div class="space-y-6">
            <SideCard :article="chunk[1]" />
            <SideCard :article="chunk[2]" />
          </div>
          <div class="space-y-6">
            <SideCard :article="chunk[3]" />
            <SideCard :article="chunk[4]" />
          </div>
        </div>
      </div>
      <div v-if="index == 1">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
          <div class="space-y-6">
            <SideCard :article="chunk[1]" />
            <SideCard :article="chunk[2]" />
          </div>
          <div class="space-y-6">
            <SideCard :article="chunk[3]" />
            <SideCard :article="chunk[4]" />
          </div>
          <MainCard :article="chunk[0]" />
        </div>
      </div>
    </div>

    <ReadHistory />
  </div>
</template>

<style scoped></style>
