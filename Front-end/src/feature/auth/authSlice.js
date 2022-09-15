import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { login, logout } from "./authService";

const user = JSON.parse(localStorage.getItem("user"));
console.log("user", user);

const initialState = {
    token: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const signin = createAsyncThunk('/login', async (data, thunkAPI) => {
    try {
        return await login(data)
    } catch (error) {
        const message = (error.response.data.message)
        return thunkAPI.rejectWithValue(message)
    }
})

export const disconnected = createAsyncThunk('/', async () => {
    await logout()
})

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isSuccess = false
            state.isError = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signin.pending, (state) => {
                state.isLoading = true
            })
            .addCase(signin.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.token = payload
                state.isError = false
                state.message = "";
            })
            .addCase(signin.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
                state.token = null
            })
        builder
            .addCase(disconnected.fulfilled, (state) => {
                state.token = null
            })
    },
})


export const { reset } = authSlice.actions
export default authSlice.reducer




