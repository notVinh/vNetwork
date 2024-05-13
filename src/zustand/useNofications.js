import { create } from "zustand";

const useNofications = create((set) => ({
  nofications: [],
  setNofication: (item) => set({ nofications: item }),
}));

export default useNofications;
