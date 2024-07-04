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
const getMyDelivery = async () => {
    try {
        const response = await api.get(`delivery-method/me`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const editDelivery = async (id, staffId, status = "DELIVERING") => {
    try {
        const response = await api.put(`delivery-method/${id}`, { staffId, status });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const editDelivering = async (delivering_id, staff_id) => {
    try {
        const response = await api.put(`checkout/delivering`, { delivering_id, staff_id });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const editDelivered = async (id) => {
    try {
        const response = await api.put(`checkout/delivered/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
export { getAllDeliveries, getDeliveryById, editDelivering, editDelivered, getMyDelivery, editDelivery };
