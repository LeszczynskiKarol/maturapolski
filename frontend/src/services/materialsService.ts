// frontend/src/services/materialsService.ts
import api from "./api";

export const materialsService = {
  // Public methods
  async getMaterials(params?: any) {
    const response = await api.get("/api/materials", { params });
    return response.data;
  },

  async getMaterial(slug: string) {
    const response = await api.get(`/api/materials/${slug}`);
    return response.data;
  },

  async getWorks(params?: any) {
    const response = await api.get("/api/materials/works", { params });
    return response.data;
  },

  async getWork(id: string) {
    const response = await api.get(`/api/materials/works/${id}`);
    return response.data;
  },

  async getEpochs() {
    const response = await api.get("/api/materials/epochs");
    return response.data;
  },

  async getQuotes(params?: any) {
    const response = await api.get("/api/materials/quotes", { params });
    return response.data;
  },

  // Admin methods
  async createMaterial(data: any) {
    const response = await api.post("/api/materials", data);
    return response.data;
  },

  async updateMaterial(id: string, data: any) {
    const response = await api.put(`/api/materials/${id}`, data);
    return response.data;
  },

  async deleteMaterial(id: string) {
    await api.delete(`/api/materials/${id}`);
  },

  // Dodaj metodę dla admina do pobierania wszystkich materiałów
  async getAdminMaterials() {
    const response = await api.get("/api/materials", {
      params: { includeUnpublished: true },
    });
    return response.data;
  },
};
