import axios from "axios";

const API_BASE_URL = "http://apijewelryauction.techx.id.vn:8081";
export const LoginAPI = async (data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/user/signin`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
