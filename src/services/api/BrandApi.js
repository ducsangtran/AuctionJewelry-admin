import axios from "axios";
const API_BASE_URL = "http://167.71.212.203:8080";
const createBrand = async (name) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/brand`, {
            name,
        });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

const getAllBrands = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/brand`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const getBrandById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/brand/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const updateBrand = async (id, name) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/v1/brand/${id}`, {
            name,
        });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const deleteBrand = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/api/v1/brand/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

export { createBrand, deleteBrand, getAllBrands, updateBrand, getBrandById };
