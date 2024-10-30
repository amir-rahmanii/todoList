import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


interface AuthState {
    email: string | null;
    username: string | null;
    loading: boolean;
    success: boolean;
    error: boolean;
    message: string | null

}


const initialState: AuthState = {
    email: null,
    username: null,
    loading: false,
    success: false,
    error: false,
    message: null
}



// Thunk for user SignUp
export const signUpUser = createAsyncThunk("auth/signUpUser", async (userData: { username: string, email: string, password: string }, thunkAPI) => {
    try {
        const response = await axios.post("/api/auth/signup", userData);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "SignUp failed. Please try again.";
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

// Thunk for user Login
export const loginUser = createAsyncThunk("auth/loginUser", async (userData: { idenity: string, password: string }, thunkAPI) => {
    try {
        const response = await axios.post("/api/auth/login", userData);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "login failed. Please try again.";
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

// Thunk for Get Me Info
export const getMeInfo = createAsyncThunk("auth/getMeInfo", async (_, thunkAPI) => {
    try {
        const response = await axios.get("/api/auth/me");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "get info user failed. Please try again.";
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

// Thunk for user LogOut
export const logOutUser = createAsyncThunk("auth/logOutUser", async (_, thunkAPI) => {
    try {
        const response = await axios.post("/api/auth/logout");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "logOut failed. Please try again.";
        return thunkAPI.rejectWithValue(errorMessage);
    }
});


const slice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        clearStatus(state) {
            state.error = false;
            state.success = false;
            state.message = null;
            state.username = null;
            state.email = null;
        }
    },
    extraReducers: (builder) => {
        // SignUp user
        builder
            .addCase(signUpUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
                state.message = null;
            })
            .addCase(signUpUser.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.error = false;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(signUpUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload as string;
            })

        //Login User
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
                state.message = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.error = false;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload as string;
            })

        //logOut User
        builder
            .addCase(logOutUser.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
                state.message = null;
            })
            .addCase(logOutUser.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.error = false;
                state.loading = false;
                state.success = true;
                state.message = action.payload.message;
            })
            .addCase(logOutUser.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload as string;
            })

        //Get Me Info
        builder
            .addCase(getMeInfo.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
                state.message = null;
            })
            .addCase(getMeInfo.fulfilled, (state, action: PayloadAction<AuthState>) => {
                state.error = false;
                state.loading = false;
                state.success = true;
                state.username = action.payload.username;
                state.email = action.payload.email;
            })
            .addCase(getMeInfo.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload as string;
            })
    }
})


export const { clearStatus } = slice.actions;
export default slice.reducer