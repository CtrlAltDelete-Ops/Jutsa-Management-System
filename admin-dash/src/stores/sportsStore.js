import { create } from "zustand";
import {
  fetchSportsDetailsFromAPI,
  addSports,
  updateSports,
  deleteSports,
  fetchSportsByIdAPI,
} from "../services/sportsServices";

const useSportsStore = create((set) => ({
  SportsDetails: [], // Always starts as an empty array
  loading: false,
  error: null,

  fetchSportsDetails: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchSportsDetailsFromAPI();
      set({ SportsDetails: data || [], loading: false }); // Ensure data is always an array
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchSportsById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchSportsByIdAPI(id);
      set({ SportsDetails: data, loading: false });
      return data; // Return the fetched data
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err; // Rethrow error for external handling
    }
  },

  registerSport: async (sportData) => {
    set({ loading: true, error: null });

    try {
      const result = await addSports(sportData);
      set((state) => ({
        SportsDetails: [...state.SportsDetails, result.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
  updateSports: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const result = await updateSports(id, updatedData);
      set((state) => ({
        SportsDetails: state.SportsDetails.map((sport) =>
          sport._id === id ? result.data : sport
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteSports: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteSports(id);
      set((state) => ({
        SportsDetails: state.SportsDetails.filter(
          (Sports) => Sports._id !== id
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useSportsStore;