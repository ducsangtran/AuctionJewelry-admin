import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../../config/axios";

export const fetchAllShippers = createAsyncThunk("shipper/fetchAllShippers", async () => {
    const response = await api.get("/account/shippers");
    return response.data;
});

const shipperSlice = createSlice({
    name: "shipper",
    initialState: {
        shippers: [],
        loading: false,
        error: "",
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllShippers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllShippers.fulfilled, (state, action) => {
                state.loading = false;
                state.shippers = action.payload;
                state.error = "";
            })
            .addCase(fetchAllShippers.rejected, (state, action) => {
                state.loading = false;
                state.shippers = [];
                state.error = action.error.message;
            });
    },
});

export default shipperSlice.reducer;
