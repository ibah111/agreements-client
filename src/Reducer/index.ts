import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Message from "./Message";
import Agreement from "./Agreement";
import User from "./User";
import Results from "./Results";
import Send from "./Send";
import Search from "./Search";
export const store = configureStore({
  reducer: { Message, Agreement, User, Results, Send, Search },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
