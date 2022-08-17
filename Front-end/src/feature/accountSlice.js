import { createSlice } from "@reduxjs/toolkit"


export const accountSlice = createSlice({
    name: "account",
    initialState: [{
        id: 1,
        title: "Argent Bank Checking (x8349)",
        amount: "$2,082.79",
        amountDescription: "Available Balance",
    },
    {
        id: 2,
        title: "Argent Bank Savings (x6712)",
        amount: "$10,928.42",
        amountDescription: "Available Balance",
    },
    {
        id: 3,
        title: "Argent Bank Credit Card (x8349)",
        amount: "$184.30",
        amountDescription: "Current Balance",
    }
    ],

    reducers: {

    }
})

export default accountSlice.reducer

