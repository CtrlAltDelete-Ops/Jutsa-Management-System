import { create } from "zustand";
import {
  fetchCompetitorsFromAPI,
  fetchCompetitorByIdAPI,
  addCompetitor,
  updateCompetitor,
  deleteCompetitor,
} from "../services/competitorServices";

const useCompetitorStore = create((set) => ({
  competitors: [],
  selectedCompetitor: null,
  loading: false,
  error: null,

  fetchCompetitors: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCompetitorsFromAPI();
      set({ competitors: data || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCompetitorById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCompetitorByIdAPI(id);
      set({ selectedCompetitor: data, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  registerCompetitor: async (competitorData) => {
    set({ loading: true, error: null });
    try {
      const result = await addCompetitor(competitorData);
      set((state) => ({
        competitors: [...state.competitors, result.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateCompetitor: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const result = await updateCompetitor(id, updatedData);
      set((state) => ({
        competitors: state.competitors.map((competitor) =>
          competitor._id === id ? result.data : competitor
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteCompetitor: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteCompetitor(id);
      set((state) => ({
        competitors: state.competitors.filter(
          (competitor) => competitor._id !== id
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useCompetitorStore;
