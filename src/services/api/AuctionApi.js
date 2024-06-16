import axios from "axios";
const API_BASE_URL = "http://167.71.212.203:8080";
const getAllAuctions = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/auction`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

const searchAuctionById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/auction/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
export { getAllAuctions, searchAuctionById };
