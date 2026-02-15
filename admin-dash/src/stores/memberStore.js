import { create } from "zustand";
import {
  fetchMemberDetailsFromAPI,
  fetchMemberByIdAPI,
  registerMember,
  updateMember,
  deleteMember,
} from "../services/memberServices";

const useMemberStore = create((set) => ({
  MemberDetails: [], // Always starts as an empty array
  loading: false,
  error: null,

  fetchMemberDetails: async () => {
    set({ loading: true, error: null });

    try {
      const data = await fetchMemberDetailsFromAPI();
      set({ MemberDetails: data || [], loading: false }); // Ensure data is always an array
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchMemberById: async (id) => {
    set({ loading: true, error: null });
    try {
      const data = await fetchMemberByIdAPI(id);
      set({ MemberDetails: data, loading: false });
      return data;
    } catch (err) {
      set({ error: err.message, loading: false });
      throw err;
    }
  },

  register: async (formData) => {
    set({ loading: true, error: null });

    try {
      // Call the API to register the member
      const result = await registerMember(formData);
      set((state) => ({
        // Add the new member to the existing list of members
        MemberDetails: [...state.MemberDetails, result.data],
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateMember: async (id, formData) => {
    set({ loading: true, error: null });

    try {
      const result = await updateMember(id, formData);
      set((state) => ({
        // Update the member in the existing list of members
        MemberDetails: state.MemberDetails.map((member) =>
          member._id === id ? result.data : member
        ),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  deleteMember: async (id) => {
    set({ loading: true, error: null });
    try {
      await deleteMember(id);
      set((state) => ({
        // Remove the member from the existing list of members
        MemberDetails: state.MemberDetails.filter((member) => member._id !== id),
        loading: false,
      }));
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useMemberStore;
