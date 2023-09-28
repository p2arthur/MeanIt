import { createSlice } from "@reduxjs/toolkit";
interface userStateInterface {
  isPremium: Boolean;
  userWalletAddress: string;
}

interface userStateActionsInterface {
  type: string;
  payload: { userId: string; userWalletAddress: string };
}

const initialState = {
  userWalletAddress: "",
  isPremium: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.userWalletAddress = action.payload.userWalletAddress;
      state.isPremium = action.payload.isPremium;
    },
    logOut: (state, action) => {
      state.userWalletAddress = "";
      state.isPremium = false;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;
export default userSlice.reducer;
