import { create } from "zustand";

const toggleMessageBox = create((set) => ({
  isOpen: false,
  toggle: (state) => set({ isOpen: state }),
  recieverInfo: "null",
  setRecieverInfo: (info) => set({ recieverInfo: info }),
  loadingDot: false,
  setLoadingDot: (value) => set({ loadingDot: value }),
}));

export default toggleMessageBox;
