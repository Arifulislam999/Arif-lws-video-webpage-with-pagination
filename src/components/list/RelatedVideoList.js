import RelatedVideoListItem from "./RelatedVideoListItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchRelatedVideo } from "../../features/RelatedFilter.js/RelatedVideoSlice";
import Loading from "../Loading";
export default function RelatedVideoList({ tags, id }) {
    const dispatch = useDispatch();
    const { isError, isLoading, error, relatedVideo } = useSelector(
        (state) => state.relatedVideo
    );

    useEffect(() => {
        dispatch(fetchRelatedVideo({ tags, id }));
    }, [dispatch, tags, id]);
    let content = null;
    if (isLoading) {
        content = <Loading />;
    }
    if (!isLoading && isError) {
        content = <div className="col-span-2">{error}</div>;
    }
    if (!isLoading && !isError && relatedVideo?.length === 0) {
        content = <div className="col-span-12">No video found in here.</div>;
    }
    if (!isLoading && !isError && relatedVideo?.length > 0) {
        content = relatedVideo.map((video) => (
            <RelatedVideoListItem key={video.id} video={video} />
        ));
    }
    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
