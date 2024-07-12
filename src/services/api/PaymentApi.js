import api from "../../config/axios";

export const getAllPayment = async () => {
    try {
        const response = await api.get(`payment`);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment:", error);
        throw error;
    }
};
