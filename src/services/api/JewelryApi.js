import axios from "axios";
const API_BASE_URL = "http://apijewelryauction.techx.id.vn:8081";
const getAllJewelries = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/jewelry`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const getJewelryById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/jewelry/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

export { getAllJewelries, getJewelryById };
