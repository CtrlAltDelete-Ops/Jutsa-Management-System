import { create } from "zustand";
import {
  fetchCaawiyeFromAPI,
  fetchCaawiyeById,
  addCaawiye,
  updateCaawiye,
  deleteCaawiye,
} from "../services/caawiyeServices";

const useCaawiyeStore = create((set) => ({
  caawiyeDetails: [],
  selectedCaawiye: null,
  loading: false,
  error: null,

  fetchCaawiyeDetails: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCaawiyeFromAPI();
      set({ caawiyeDetails: data || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchCaawiyeById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchCaawiyeById(id);
      set({ selectedCaawiye: data || null, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  registerCaawiye: async (caawiyeData) => {
    set({ loading: true, error: null });
    try {
      const result = await addCaawiye(caawiyeData);
      set((state) => ({
        caawiyeDetails: [...state.caawiyeDetails, result.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateCaawiye: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const result = await updateCaawiye(id, updatedData);
      set((state) => ({
        caawiyeDetails: state.caawiyeDetails.map((caawiye) =>
          caawiye.id === id ? result.data : caawiye
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteCaawiye: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteCaawiye(id);
      set((state) => ({
        caawiyeDetails: state.caawiyeDetails.filter((caawiye) => caawiye.id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useCaawiyeStore;