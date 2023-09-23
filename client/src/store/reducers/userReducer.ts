import { createSlice } from "@reduxjs/toolkit";
interface userStateInterface {
  userId: string;
  isLoggedIn: Boolean;
  userWallet: string;
}

interface userStateActionsInterface {
  type: string;
  payload: { userId: string; userWallet: string };
}

const initialState = {
  userId: "",
  isLoggedIn: false,
  userWallet: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true;
      state.userId = action.payload.userId;
      state.userWallet = action.payload.userWallet;
    },
    logOut: (state, action) => {
      state.isLoggedIn = false;
      state.userId = "";
      state.userWallet = "";
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
