// frontend/src/services/blogService.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const blogService = {
  // Ambil semua blog
  getAll: (params) => API.get("/blogs", { params }),

  // Ambil detail blog
  getBySlug: (slug) => API.get(`/blogs/${slug}`),

  // Ambil blog berdasarkan experience
  getByExperience: (experience) =>
    API.get("/blogs", {
      params: { experience },
    }),
};
