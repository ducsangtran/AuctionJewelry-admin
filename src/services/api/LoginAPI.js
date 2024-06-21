import api from "../../config/axios";

const API_BASE_URL = "http://apijewelryauction.techx.id.vn:8081";
export const LoginAPI = async (data) => {
    try {
        const response = await api.post(`${API_BASE_URL}/api/v1/user/signin`, data);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
