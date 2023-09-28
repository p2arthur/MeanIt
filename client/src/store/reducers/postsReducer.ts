import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postInterface } from "../../interfaces/post-interface";

interface Post {
  id: number;
  title: string;
  content: string;
}

// Define the initial state for posts
const initialPostsState = {
  posts: [],
};

const postsSlice = createSlice({
  name: "posts",
  initialState: initialPostsState,
  reducers: {
    addPost: (state, action: PayloadAction<Post>) => {
      // Add the new post to the posts array
      state.posts.push(action.payload);
    },
  },
});

export const { addPost } = postsSlice.actions;
export default postsSlice.reducer;
