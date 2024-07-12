import api from "../../config/axios";

export const getWalletSystem = async () => {
    try {
        const response = await api.get(`wallet/system`);
        return response.data;
    } catch (error) {
        console.error("Error fetching transactions:", error);
        throw error;
    }
};
