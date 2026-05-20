import { configureStore } from "@reduxjs/toolkit";
import fileTreeSlice from "./features/fileTreeSlice";
import { useDispatch, useSelector } from "react-redux";
// ...

export const store = configureStore({
  reducer: {
    tree: fileTreeSlice,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
