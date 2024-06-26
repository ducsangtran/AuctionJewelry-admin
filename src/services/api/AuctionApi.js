import axios from "axios";
import api from "../../config/axios";
const API_BASE_URL = "http://apijewelryauction.techx.id.vn:8081";
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

const getAuctionById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/auction/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const searchAuctionByAdmin = async (
    data
    // page
) => {
    try {
        const response = await api.get(`/auction/admin/search`, {
            params: {
                data,
                // page,
            },
        });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const cancelAuction = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/cancel/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

export { getAllAuctions, getAuctionById, searchAuctionByAdmin, cancelAuction };
