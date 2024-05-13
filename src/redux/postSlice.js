import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.withCredentials = true;

export const createNewpost = createAsyncThunk(
  "post/createNewpost",
  async (postCredentials) => {
    const request = await axios.post(`/api/post/create`, postCredentials, {
      withCredentials: true,
    });

    const response = await request.data;
    return response;
  }
);

export const getPost = createAsyncThunk("post/getPost", async () => {
  const request = await axios.get(`/api/post/getposts`);

  const response = await request.data;
  return response;
});

export const likePost = createAsyncThunk(
  "post/likePost",
  async (postCredentials) => {
    const request = await axios.put(
      `/api/post/likepost/${postCredentials.postId}`,
      postCredentials.user,
      {
        withCredentials: true,
      }
    );

    const response = await request.data;
    return response;
  }
);

export const deletePost = createAsyncThunk(
  "post/deletePost",
  async (postCredentials) => {
    const request = await axios.delete(
      `/api/post/deletepost/${postCredentials.postId}`,
      {
        withCredentials: true,
      }
    );

    const response = await request.data;
    return response;
  }
);
