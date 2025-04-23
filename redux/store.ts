import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import talentRegistrationSlice from "./slices/talentRegistrationSlice";
import notificationSlice from "./slices/notificationSlice";
import jobPostsSlice from "./slices/jobPostSlice";
import contentSlice from "./slices/contentSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import jobSlice from "./slices/jobSlice";
import appliedJobSlice from "./slices/appliedJobSlice";

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine all your reducers into a root reducer
const rootReducer = combineReducers({
  auth: authSlice,
  talentRegistration: talentRegistrationSlice,
  job: jobSlice,
  jobPosts: jobPostsSlice,
  appliedJobs: appliedJobSlice,
  content: contentSlice,
  notification: notificationSlice,
});

// Persisting the combined reducers
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Creating persistor to persist the store
export const persistor = persistStore(store);

// Types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
