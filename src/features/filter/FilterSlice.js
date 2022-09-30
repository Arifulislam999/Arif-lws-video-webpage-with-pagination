const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    tags: [],
    search: "",
};

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        tagSelected: (state = initialState, action) => {
            state.tags.push(action.payload);
        },
        tagRemoved: (state = initialState, action) => {
            const existTagInd = state.tags.indexOf(action.payload);
            if (existTagInd !== -1) {
                state.tags.splice(existTagInd, 1);
            }
        },
        searched: (state = initialState, action) => {
            state.search = action.payload;
        },
    },
});

export default filterSlice.reducer;
export const { tagRemoved, tagSelected, searched } = filterSlice.actions;
