import { getRelatedVideo } from "./RelatedVideoApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    relatedVideo: {},
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const fetchRelatedVideo = createAsyncThunk(
    "relatedVideo/fetchRelatedVideo",
    async ({ tags, id }) => {
        const relatedVideo = await getRelatedVideo({ tags, id });
        // console.log(tags);
        return relatedVideo;
    }
);

const relatedVideoSlice = createSlice({
    name: "relatedVideo",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchRelatedVideo.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchRelatedVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.relatedVideo = action.payload;
            })
            .addCase(fetchRelatedVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.relatedVideo = {};
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default relatedVideoSlice.reducer;
