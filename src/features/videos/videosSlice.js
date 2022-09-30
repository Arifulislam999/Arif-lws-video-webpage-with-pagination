import { getVideos } from "./videosAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    videos: [],
    isLoading: false,
    isError: false,
    error: "",
    page: 1,
    author: "",
};

// async thunk
export const fetchVideos = createAsyncThunk(
    "videos/fetchVideos",
    async ({ tags, search }) => {
        const videos = await getVideos(tags, search);
        return videos;
    }
);

const videoSlice = createSlice({
    name: "videos",
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.page = action.payload;
        },
        changeAuthorName: (state, action) => {
            state.author = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.videos = action.payload;
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.videos = [];
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default videoSlice.reducer;
export const { changePage, changeAuthorName } = videoSlice.actions;
