import { create } from "zustand";

const toggleSidebar = create((set) => ({
  isOpen: false,

  toggle: (state) => set({ isOpen: state }),
}));

export default toggleSidebar;
