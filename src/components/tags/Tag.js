import { useDispatch, useSelector } from "react-redux";
import { tagRemoved, tagSelected } from "../../features/filter/FilterSlice";
import { changePage } from "../../features/videos/videosSlice";

export default function Tag({ title }) {
    const dispatch = useDispatch();
    const { tags } = useSelector((state) => state.filter);
    const isSelected = tags.includes(title) ? true : false;
    const style = isSelected
        ? "bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer"
        : "bg-blue-100 text-blue-600 px-4 py-1 rounded-full cursor-pointer";
    const handleSelected = () => {
        if (isSelected) {
            dispatch(tagRemoved(title));
        } else {
            dispatch(tagSelected(title));
        }
        console.log(isSelected, tags);
        dispatch(changePage(1));
    };
    return (
        <div className={style} onClick={handleSelected}>
            {title}
        </div>
    );
}

/* <div className="bg-blue-600 text-white px-4 py-1 rounded-full cursor-pointer">
redux
</div> */
