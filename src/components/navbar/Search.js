import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { searched } from "../../features/filter/FilterSlice";
export default function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const match = useMatch("/");
    const { search } = useSelector((state) => state.filter);
    const [input, setInput] = useState(search);
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(searched(input));
        if (!match) {
            navigate("/");
        }
    };

    useEffect(() => {
        if (input === "") {
            dispatch(searched(""));
        }
    }, [dispatch, input]);

    return (
        <form onSubmit={handleSubmit}>
            <input
                className="outline-none border-none mr-2"
                type="search"
                name="search"
                placeholder="Search"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
        </form>
    );
}
