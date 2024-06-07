import axios from "axios";
const API_BASE_URL = "http://localhost:8080";
const createCollection = async (name, brand) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/collection`, {
            name,
            brand,
        });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

const getAllCollections = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/collection`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const getCollectionById = async (id) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/collection/${id}`
        );
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const updateCollection = async (id, name, brand) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/v1/collection/${id}`,
            {
                name,
                brand,
            }
        );
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const deleteCollection = async (id) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/api/v1/brand/${id}`
        );
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

export {
    createCollection,
    deleteCollection,
    getAllCollections,
    updateCollection,
    getCollectionById,
};
