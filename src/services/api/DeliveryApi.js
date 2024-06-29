import axios from "axios";
import api from "../../config/axios";

const getAllDeliveries = async () => {
    try {
        const response = await api.get(`delivery-method`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

// const getMyDelivery = async () => {
//     try {
//         const response = await axios.get
//     }
// }
const getDeliveryById = async (id) => {
    try {
        const response = await api.get(`delivery-method/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
export { getAllDeliveries, getDeliveryById };
