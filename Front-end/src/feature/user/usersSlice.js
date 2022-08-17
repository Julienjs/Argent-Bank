import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { editName, UserInfo } from "./userService"


const user = JSON.parse(localStorage.getItem("user"));
const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ''
}

export const getUser = createAsyncThunk('/profil', async (_, thunkAPI) => {
    try {
        const { token } = thunkAPI.getState().auth.token
        return await UserInfo(token)
    } catch (error) {
        const message = (error.response.data.message)
        return thunkAPI.rejectWithValue(message)
    }
})
export const userUpdate = createAsyncThunk(
    "/profil/editname",
    async (data, thunkAPI) => {
        try {
            const { token } = thunkAPI.getState().auth.token;
            return await editName(data, token);
        } catch (error) {
            const message = (error.response.data.message)
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const usersSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        resetUser: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUser.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = payload
            })
            .addCase(getUser.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
            })
        builder
            .addCase(userUpdate.pending, (state) => {
                state.isLoading = true
            })
            .addCase(userUpdate.fulfilled, (state, { payload }) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = payload
            })
            .addCase(userUpdate.rejected, (state, { payload }) => {
                state.isLoading = false
                state.isError = true
                state.message = payload
            })
    }
})


export default usersSlice.reducer
export const { resetUser } = usersSlice.actions

