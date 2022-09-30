import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import VideoGridItem from "./VideoGridItem";

function FilterByAuthor() {
    const { videos } = useSelector((state) => state.videos);
    const location = useLocation();

    const { author } = location.state;
    console.log(author);
    return (
        <section className="pt-2">
            <div className="grid ">
                <div>
                    {videos
                        .filter((data) => data.author === author)
                        .map((video) => (
                            <VideoGridItem key={video.id} video={video} />
                        ))}
                </div>
            </div>
        </section>
    );
}

export default FilterByAuthor;
