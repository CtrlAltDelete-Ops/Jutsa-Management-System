import { create } from "zustand";
import {
  fetchPositionDetailsFromAPI,
  fetchPositionById,
  registerPosition,
  updatePosition,
  deletePosition,
} from "../services/positionServices";

const usePositionStore = create((set) => ({
  PositionsDetails: [],
  loading: false,
  error: null,

  // Fetch positions
  fetchPositionDetails: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchPositionDetailsFromAPI();
      set({ PositionsDetails: data || [], loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Fetch position by ID
fetchPositionById: async (id) => {
  set({ loading: true, error: null });
  try {
    const data = await fetchPositionById(id);
    set({ PositionsDetails: data, loading: false });
    return data;
  } catch (error) {
    set({ error: error.message, loading: false });
  }
},

  // Register position
  register: async (formData) => {
    set({ loading: true, error: null });
    try {
      const newPosition = await registerPosition(formData);
      set((state) => ({
        PositionsDetails: [...state.PositionsDetails, newPosition],
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Update position
  updatePosition: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const updatedPosition = await updatePosition(id, updatedData);
      set((state) => ({
        PositionsDetails: state.PositionsDetails.map((position) =>
          position.id === id ? updatedPosition : position
        ),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  // Delete position
  deletePosition: async (id) => {
    set({ loading: true, error: null });
    try {
      await deletePosition(id);
      set((state) => ({
        PositionsDetails: state.PositionsDetails.filter((position) => position.id !== id),
        loading: false,
      }));
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));

export default usePositionStore;
