import { updateLike } from "./LikeApi";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    like: 0,
    unlike: 0,
};

// async thunk
export const fetchLike = createAsyncThunk(
    "LikeUnlike/fetchLike",
    async ({ id, likes }) => {
        // console.log(likes);
        const totallike = await updateLike({ id, likes });
        return totallike;
    }
);
export const fetchUnlike = createAsyncThunk(
    "LikeUnlike/fetchUnlike",
    async ({ id, unlikes }) => {
        const updateUnlike = await updateLike({ id, unlikes });
        return updateUnlike;
    }
);

const likeSlice = createSlice({
    name: "like",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchLike.fulfilled, (state, action) => {
                state.like = action.payload.likes;
                // console.log(action.payload);
            })
            .addCase(fetchUnlike.fulfilled, (state, action) => {
                state.unlike = action.payload.unlikes;
                // console.log(action.payload);
            });
    },
});

export default likeSlice.reducer;
