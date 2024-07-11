import api from "../../config/axios";

export const getAllTransactions = async () => {
    try {
        const response = await api.get(`transaction`);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};
