import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",

  initialState: {
    user: null,
    loading: false,
    loadingMessage: "",
  },

  reducers: {
    SetUser: (state, action) => {
      state.user = action.payload;
    },

    ShowLoading: (state, action) => {
      state.loading = true;
      state.loadingMessage = action.payload || "Please wait...";
    },

    HideLoading: (state) => {
      state.loading = false;
      state.loadingMessage = "";
    },
  },
});

export const { SetUser, ShowLoading, HideLoading } = usersSlice.actions;

export default usersSlice.reducer;
