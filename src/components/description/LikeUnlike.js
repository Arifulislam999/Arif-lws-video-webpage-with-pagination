import likeImage from "../../assets/like.svg";
import unlikeImage from "../../assets/unlike.svg";
import { useDispatch } from "react-redux";
import { fetchLike, fetchUnlike } from "../../features/LikeUnlike/LikeSlice";
import { useState } from "react";

export default function LikeUnlike({ id, likesCount, unlikesCount }) {
    const [like, setLikes] = useState(likesCount ?? 1);
    const [unlike, setUnlike] = useState(unlikesCount ?? 1);
    const dispatch = useDispatch();
    const handelLike = () => {
        setLikes((prev) => prev + 1);
        dispatch(fetchLike({ id, likes: like + 1 }));
    };
    const handleUnlike = () => {
        setUnlike((prev) => prev + 1);
        dispatch(fetchUnlike({ id, unlikes: unlike + 1 }));
    };

    return (
        <div className="flex gap-10 w-48">
            <div className="flex gap-1" onClick={handelLike}>
                <div className="shrink-0">
                    <img className="w-5 block" src={likeImage} alt="Like" />
                </div>
                <div className="text-sm leading-[1.7142857] text-slate-600">
                    {like}
                </div>
            </div>
            <div className="flex gap-1" onClick={handleUnlike}>
                <div className="shrink-0">
                    <img className="w-5 block" src={unlikeImage} alt="Unlike" />
                </div>
                <div className="text-sm leading-[1.7142857] text-slate-600">
                    {unlike}
                </div>
            </div>
        </div>
    );
}
