import { create } from "zustand";

const useSearch = create((set) => ({
  searchText: undefined,
  setSearchText: (item) => {
    if (item !== " ") {
      set({ searchText: item });
    }
  },
}));

export default useSearch;
