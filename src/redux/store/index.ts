// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import auth from '../auth/auth'
import todo from '../todo/todo'

const store = configureStore({
    reducer: {
        auth,
        todo
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;