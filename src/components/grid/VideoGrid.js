import VideoGridItem from "./VideoGridItem";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { changePage, fetchVideos } from "../../features/videos/videosSlice";
import Loading from "../Loading";
export default function VideGrid() {
    const dispatch = useDispatch();
    const { tags, search } = useSelector((state) => state.filter);
    useEffect(() => {
        dispatch(fetchVideos({ tags, search }));
    }, [dispatch, search, tags]);

    const {
        isLoading,
        isError,
        error,
        videos,
        // page: currentPage,
        page,
        // author: filterData,
        author,
    } = useSelector((state) => state.videos);
    // Pagination of Post video Start here
    // youtube video link https://www.youtube.com/watch?v=6DtBw3PaeHs
    // useEffect(() => {
    //     console.log(filterData);
    // }, [filterData]);

    const [itemPage] = useState(4);

    let videoLength = 0;
    if (author?.length > 0) {
        videos.forEach((video) => {
            if (video.author === author) {
                videoLength += 1;
            }
        });
    }
    let updateVideo = [];
    if (videoLength > 0) {
        videos.map((video) => {
            if (video.author === author) {
                return updateVideo.push(video);
            } else {
                return 0;
            }
        });
    } else {
        videos.map((video) => updateVideo.push(video));
    }

    let pages = [];
    for (let i = 1; i <= Math.ceil(updateVideo.length / itemPage); i++) {
        pages.push(i);
    }

    const handleChange = (e) => {
        dispatch(changePage(e.target.id));
    };
    const indexOfLastItem = page * itemPage;
    const indexOfFirstItem = indexOfLastItem - itemPage;
    const currentItem = updateVideo.slice(indexOfFirstItem, indexOfLastItem);
    const renderThePageNumber = pages.map((number) => {
        return (
            <div
                key={number}
                className={
                    page === number
                        ? "bg-green-400 text-lg m-px rounded rounded-lg"
                        : "bg-blue-200 text-lg m-px rounded rounded-lg"
                }
            >
                <li
                    onClick={handleChange}
                    className="list-none px-2 cursor-pointer "
                    key={number}
                    id={number}
                >
                    {number}
                </li>
            </div>
        );
    });

    const handelNext = () => {
        if (page < Math.ceil(updateVideo.length / itemPage)) {
            dispatch(changePage(Number(page) + 1));
        }
    };

    const handelPrev = () => {
        if (page > 1) {
            dispatch(changePage(Number(page) - 1));
        }
    };
    let content = null;
    if (isLoading) {
        content = <Loading />;
    }
    if (!isLoading && isError) {
        content = <div className="col-span-12">{error}</div>;
    }
    if (!isLoading && !isError && videos?.length === 0) {
        content = <div className="col-span-12">No video found avabal</div>;
    }
    if (!isLoading && !isError && videos?.length > 0) {
        if (author !== "") {
            content = currentItem
                .filter((video) => video.author === author)
                .map((video) => <VideoGridItem key={video.id} video={video} />);
        } else {
            content = currentItem.map((video) => (
                <VideoGridItem key={video.id} video={video} />
            ));
        }
    }
    return (
        <section className="pt-2 mx-2">
            <section className="pt-2">
                <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
                    {content}
                </div>
                <div>
                    <div className="flex justify-items-center justify-end">
                        <button
                            onClick={handelPrev}
                            className="bg-blue-200 text-lg m-px px-2 cursur-pointer rounded rounded-lg"
                        >
                            Prev
                        </button>
                        <div className="flex">{renderThePageNumber}</div>
                        <button
                            onClick={handelNext}
                            className=" bg-blue-200 text-lg m-px rounded rounded-lg  px-2 cursur-pointer"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </section>
    );
}
