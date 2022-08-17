import { createSlice } from "@reduxjs/toolkit"

export const transactionSlice = createSlice({
    name: "transaction",
    initialState: {
        transaction: null,
    },

    reducers: {
        setTransactionData: (state, { payload }) => {
            state.transaction = payload;
        }
    }
})

export default transactionSlice.reducer
export const { setTransactionData } = transactionSlice.actions

