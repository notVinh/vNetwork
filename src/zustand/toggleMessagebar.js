import { create } from "zustand";

const toggleMessagebar = create((set) => ({
  open: false,

  toggleState: (state) => set({ open: state }),
}));

export default toggleMessagebar;
