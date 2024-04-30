import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.withCredentials = true;

export const createNewComment = createAsyncThunk(
  "comment/createNewComment",
  async (commentCredentials) => {
    const request = await axios.post(`/api/comment/create`, commentCredentials);

    const response = await request.data;
    return response;
  }
);

export const getPostComment = createAsyncThunk(
  "comment/getPostComment",
  async (postId) => {
    const request = await axios.get(`/api/comment/getpostcomments/${postId}`);

    const response = await request.data;
    return response;
  }
);

export const likeComment = createAsyncThunk(
  "comment/likeComment",
  async (commentCredentials) => {
    const request = await axios.put(
      `/api/comment/likeComment/${commentCredentials.commentId}`,
      commentCredentials.user
    );

    const response = await request.data;
    return response;
  }
);

export const deleteComment = createAsyncThunk(
  "comment/deleteComment",
  async (commentCredentials) => {
    const request = await axios.delete(
      `/api/comment/deleteComment/${commentCredentials.commentId}`
    );

    const response = await request.data;
    return response;
  }
);

export const deleteCommentByPost = createAsyncThunk(
  "comment/deleteCommentByPost",
  async (postCredentials) => {
    const request = await axios.delete(
      `/api/comment/deleteCommentByPost/${postCredentials.postId}`
    );

    const response = await request.data;
    return response;
  }
);
