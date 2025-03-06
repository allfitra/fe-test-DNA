import axios from "axios";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_NEWS_API_URL,
  headers: {
    Authorization: import.meta.env.VITE_NEWS_API_KEY, // API Key from .env
  },
});

export const getDataNews = async (q = "", from = "", sortBy = "") => {
  try {
    const response = await apiClient.get(`/everything`, {
      params: { q, from, sortBy, apiKey: import.meta.env.VITE_NEWS_API_KEY },
    });
    return response.data.articles;
  } catch (error) {
    console.error("NewsAPI Error:", error);
    return [];
  }
};
