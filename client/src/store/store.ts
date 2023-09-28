import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import postsReducer from "./reducers/postsReducer";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
});

export const store = configureStore({ reducer: rootReducer });

export type RootState = ReturnType<typeof store.getState>;

export default store;
