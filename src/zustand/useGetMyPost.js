import { create } from "zustand";

const useGetMyPost = create((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts: posts }),
}));

export default useGetMyPost;
