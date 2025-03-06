<script setup>
import { ref, onMounted, computed } from "vue";
import { getDataNews } from "../services/news-api";
import SceletonLoading from "../components/sceleton-loading.vue";

const news = ref([]);
const newsSearch = ref("");
const isLoading = ref(false);

const fetchNews = async (query = "world") => {
  isLoading.value = true;
  news.value = await getDataNews(query);
  isLoading.value = false;
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
  const chunkSize = 5;
  let chunks = [];
  for (let i = 0; i < news.value.length; i += chunkSize) {
    chunks.push(news.value.slice(i, i + chunkSize));
  }
  return chunks;
});

const saveReadNews = (article) => {
  let storedNews = JSON.parse(localStorage.getItem("readNews")) || [];
  if (!storedNews.some((item) => item.url === article.url)) {
    storedNews.push({ title: article.title, url: article.url, image: article.urlToImage });
    localStorage.setItem("readNews", JSON.stringify(storedNews));
  }
};
</script>

<template>
  <div class="container mx-auto px-4">
    <div class="flex justify-between mb-4">
      <h2 class="text-[35px] text-blue-700 font-bold">
        <a href="/" class="font-bold"> HOTs News </a>
      </h2>
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

    <div v-if="isLoading">
      <SceletonLoading />
    </div>
    <div v-else>
      <div v-for="(chunk, chunkIndex) in chunkedNews" :key="chunkIndex" class="space-y-6">
        <div v-if="chunkIndex < 3">
          <div v-for="item in chunk" :key="item.url" class="bg-white p-4 shadow-md rounded-lg flex gap-4">
            <img :src="item.urlToImage || 'https://via.placeholder.com/150?text=No+Image'" alt="News Image" class="w-56 h-32 object-cover rounded-md" />
            <div class="flex-1">
              <h3 class="text-lg font-semibold line-clamp-2">{{ item.title }}</h3>
              <p class="text-gray-600 w-full line-clamp-3">{{ item.description }}</p>
              <a :href="item.url" target="_blank" class="text-blue-600 font-semibold inline-block mt-2" @click="saveReadNews(item)"> Read More </a>
            </div>
          </div>
        </div>
      </div>

      <p v-if="!isLoading && news.length === 0" class="text-gray-500 text-center mt-6">Tidak ada berita yang ditemukan.</p>
    </div>
  </div>
</template>

<style scoped></style>
