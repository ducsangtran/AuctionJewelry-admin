import axios from "axios";
const API_BASE_URL = "http://localhost:8080";
const createMaterial = async (name) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/api/v1/material`, {
            name,
        });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

const getAllMaterials = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/v1/materials`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const getMaterialById = async (id) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/api/v1/materials/${id}`
        );
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const updateMaterial = async (id, name) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/api/v1/material/${id}`,
            { name }
        );
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const deleteMaterial = async (id) => {
    try {
        const response = await axios.delete(
            `${API_BASE_URL}/api/v1/material/${id}`
        );
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

export {
    createMaterial,
    getAllMaterials,
    getMaterialById,
    updateMaterial,
    deleteMaterial,
};
