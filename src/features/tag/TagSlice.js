import { tagApi } from "./TagApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    tags: [],
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const fetchTag = createAsyncThunk("tag/fetchTag", async () => {
    const tag = await tagApi();
    return tag;
});

const tagSlice = createSlice({
    name: "tag",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchTag.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchTag.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tags = action.payload;
            })
            .addCase(fetchTag.rejected, (state, action) => {
                state.isLoading = false;
                state.tags = {};
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default tagSlice.reducer;
