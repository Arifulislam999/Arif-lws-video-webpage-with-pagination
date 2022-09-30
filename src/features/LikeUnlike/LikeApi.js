import axios from "../../utils/axios";

export const updateLike = async ({ id, likes, unlikes }) => {
    if (likes) {
        const response = await axios.patch(`/videos/${id}`, { likes });
        return response.data;
    } else {
        const response = await axios.patch(`/videos/${id}`, { unlikes });
        return response.data;
    }
};
