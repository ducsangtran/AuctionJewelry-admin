import axios from "axios";
const API_BASE_URL = "http://167.71.212.203:8080";
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
export { getAllDeliveries };
