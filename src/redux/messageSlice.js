import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export const getMessage = createAsyncThunk(
  "message/getMessage",
  async (messageCredentials) => {
    const request = await axios.get(`/api/message/${messageCredentials}`, {
      withCredentials: true,
    });

    const response = await request.data;
    return response;
  }
);

export const sendNewMessage = createAsyncThunk(
  "message/sendNewMessage",
  async (messageCredentials) => {
    const request = await axios.post(
      `/api/message/send/${messageCredentials.receiverId}`,
      messageCredentials.body,
      {
        withCredentials: true,
      }
    );

    const response = await request.data;
    return response;
  }
);
