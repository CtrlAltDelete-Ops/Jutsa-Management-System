import { create } from "zustand";
import {
  fetchFinanceDetailsFromAPI,
  fetchFinanceByIdAPI,
  addFinance,
  updateFinance,
  deleteFinance,
} from "../services/financeServices";

const useFinanceStore = create((set) => ({
  financeDetails: [],
  selectedFinance: null,
  loading: false,
  error: null,

  fetchFinanceDetails: async () => {
    set({ loading: true, error: null });
    try {
      const data = await fetchFinanceDetailsFromAPI();
      set({ financeDetails: data || [], loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchFinanceById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchFinanceByIdAPI(id);
      set({ selectedFinance: data, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  registerFinance: async (financeData) => {
    set({ loading: true, error: null });
    try {
      const result = await addFinance(financeData);
      set((state) => ({
        financeDetails: [...state.financeDetails, result.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateFinance: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      const result = await updateFinance(id, updatedData);
      set((state) => ({
        financeDetails: state.financeDetails.map((finance) =>
          finance._id === id ? result.data : finance
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteFinance: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteFinance(id);
      set((state) => ({
        financeDetails: state.financeDetails.filter(
          (finance) => finance._id !== id
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useFinanceStore;