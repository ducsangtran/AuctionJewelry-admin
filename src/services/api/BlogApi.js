import api from "../../config/axios";

const getAllBlog = async () => {
    try {
        const response = await api.get(`blog/all`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

const addBlog = async (data) => {
    try {
        const response = await api.post("blog", data, { headers: { "Content-Type": "multipart/form-data" } });
        return response.data;
    } catch (error) {
        console.error("Error adding blog:", error);
        throw error;
    }
};

export { getAllBlog, addBlog };
