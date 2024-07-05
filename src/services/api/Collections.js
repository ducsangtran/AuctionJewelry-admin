import api from "../../config/axios";
const API_BASE_URL = "http://apijewelryauction.techx.id.vn:8081";
const createCollection = async (name, brand) => {
    try {
        const response = await api.post(`collection`, {
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
        const response = await api.get(`collection`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const getCollectionById = async (id) => {
    try {
        const response = await api.get(`collection/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const updateCollection = async (id, name, brand) => {
    try {
        const response = await api.put(`collection/${id}`, {
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
const deleteCollection = async (id) => {
    try {
        const response = await api.delete(`collection/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

export { createCollection, deleteCollection, getAllCollections, updateCollection, getCollectionById };
