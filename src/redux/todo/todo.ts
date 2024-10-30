import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";


type Todo = {
    id: number,
    title: string,
    completed: boolean,
    user : string,
    color : string,
    createdAt : Date,
}

type TodoState = {
    todos: Todo[],
    loading: boolean,
    message: null | string,
    success: boolean,
    error: boolean

}

const initialState: TodoState = {
    todos: [],
    loading: false,
    message: null,
    success: false,
    error: false
};



// Thunk for user SignUp
export const createTodo = createAsyncThunk("todo/signUpUser", async (todoData: { title: string, color: string }, thunkAPI) => {
    try {
        const response = await axios.post("/api/todo/create", todoData);
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "todo created failed. Please try again.";
        return thunkAPI.rejectWithValue(errorMessage);
    }
});

// Thunk for get all Todo
export const getAllTodo = createAsyncThunk("todo/getAllTodo", async (_ ,  thunkAPI) => {
    try {
        const response = await axios.get("/api/todo/getall");
        return response.data;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || "todo get failed. Please try again.";
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
        }
    },
    extraReducers: (builder) => {
        // Create Todo
        builder
            .addCase(createTodo.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
                state.message = null;
            })
            .addCase(createTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.error = false;
                state.loading = false;
                state.success = true;
                state.message = "Todo created successfuly!!!";
                state.todos = [...state.todos , action.payload]
            })
            .addCase(createTodo.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload as string;
            })
        // Get All Todo
        builder
            .addCase(getAllTodo.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.success = false;
                state.message = null;
            })
            .addCase(getAllTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
                state.error = false;
                state.loading = false;
                state.success = true;
                state.todos.push(action.payload);
            })
            .addCase(getAllTodo.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = true;
                state.message = action.payload as string;
            })
    }
})


export const { clearStatus } = slice.actions;
export default slice.reducer