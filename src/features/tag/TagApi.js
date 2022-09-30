import axios from "../../utils/axios";

export const tagApi = async () => {
    const response = await axios.get("/tags");

    return response.data;
};
