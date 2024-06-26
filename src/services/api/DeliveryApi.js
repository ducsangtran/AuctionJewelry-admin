import axios from "axios";
const API_BASE_URL = "http://apijewelryauction.techx.id.vn:8081";
const getAllDeliveries = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/delivery-method`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const getDeliveryById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/delivery-method/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
export { getAllDeliveries, getDeliveryById };
