import { configureStore } from "@reduxjs/toolkit";
import FilterReducer from "../features/filter/FilterSlice";
import LikeReducer from "../features/LikeUnlike/LikeSlice";
import RelatedVideoReducer from "../features/RelatedFilter.js/RelatedVideoSlice";
import TagReducer from "../features/tag/TagSlice";
import VideoReducer from "../features/video/VideoSlice";
import videosReducer from "../features/videos/videosSlice";

export const store = configureStore({
    reducer: {
        videos: videosReducer,
        video: VideoReducer,
        tag: TagReducer,
        filter: FilterReducer,
        relatedVideo: RelatedVideoReducer,
        like: LikeReducer,
    },
});
