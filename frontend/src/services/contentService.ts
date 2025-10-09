// frontend/src/services/contentService.ts
import api from "./api";

export const contentService = {
  // Public
  async getHubs(params?: any) {
    const response = await api.get("/api/content/hubs", { params });
    return response.data;
  },

  async getHub(slug: string) {
    const response = await api.get(`/api/content/${slug}`);
    return response.data;
  },

  async getPage(hubSlug: string, pageSlug: string) {
    const response = await api.get(`/api/content/${hubSlug}/${pageSlug}`);
    return response.data;
  },

  async getHubPages(hubSlug: string) {
    const response = await api.get(`/api/content/${hubSlug}/pages`);
    return response.data;
  },

  // Ratings
  async submitRating(pageId: string, rating: number) {
    const response = await api.post(`/api/content/pages/${pageId}/rate`, {
      rating,
    });
    return response.data;
  },

  async getPageRating(pageId: string) {
    const response = await api.get(`/api/content/pages/${pageId}/rating`);
    return response.data;
  },

  // Admin
  async createHub(data: any) {
    const response = await api.post("/api/content/hubs", data);
    return response.data;
  },

  async updateHub(id: string, data: any) {
    const response = await api.put(`/api/content/hubs/${id}`, data);
    return response.data;
  },

  async deleteHub(id: string) {
    await api.delete(`/api/content/hubs/${id}`);
  },

  async createPage(hubId: string, data: any) {
    const response = await api.post(`/api/content/hubs/${hubId}/pages`, data);
    return response.data;
  },

  async updatePage(id: string, data: any) {
    const response = await api.put(`/api/content/pages/${id}`, data);
    return response.data;
  },

  async deletePage(id: string) {
    await api.delete(`/api/content/pages/${id}`);
  },

  async reorderPages(hubId: string, pageIds: string[]) {
    const response = await api.put(`/api/content/hubs/${hubId}/pages/reorder`, {
      pageIds,
    });
    return response.data;
  },
};
