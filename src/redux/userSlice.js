import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
// axios.defaults.withCredentials = true;

export const getUser = createAsyncThunk(
  "user/getUser",
  async (userCredentials) => {
    const request = await axios.get(`/api/user/${userCredentials}`);
    // console.log(userCredentials);
    const response = await request.data;
    return response;
  }
);

export const loginGoogleUser = createAsyncThunk(
  "user/loginGoogleUser",
  async (userCredentials) => {
    const request = await axios.post(`/api/auth/google`, userCredentials, {
      withCredentials: true,
    });
    // console.log(userCredentials);
    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userCredentials) => {
    const request = await axios.post(`/api/auth/signin`, userCredentials, {
      withCredentials: true,
    });

    const response = await request.data;
    localStorage.setItem("user", JSON.stringify(response));
    return response;
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userCredentials) => {
    await axios.post(`/api/auth/signup`, userCredentials);

    // console.log(request);
  }
);

export const signoutUser = createAsyncThunk("user/signoutUser", async () => {
  const request = await axios.post(`/api/auth/signout`);
  localStorage.removeItem("user");
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    user: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.user = null;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        console.log(action.error.message);
        if (action.error.message === "request failed") {
          state.error = "access denied";
        } else {
          state.error = action.error.message;
        }
      });
  },
});

export default userSlice.reducer;
