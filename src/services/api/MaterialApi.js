import axios from "axios";
import api from "../../config/axios";
const API_BASE_URL = "http://apijewelryauction.techx.id.vn:8081";
const createMaterial = async (name) => {
    try {
        const response = await api.post(`${API_BASE_URL}/api/v1/material`, {
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
        const response = await api.get(`${API_BASE_URL}/api/v1/material`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const getMaterialById = async (id) => {
    try {
        const response = await api.get(`${API_BASE_URL}/api/v1/material/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const updateMaterial = async (id, name) => {
    try {
        const response = await api.put(`${API_BASE_URL}/api/v1/material/${id}`, { name });
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};
const deleteMaterial = async (id) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/api/v1/material/${id}`);
        return response.data;
    } catch (error) {
        // Handle error
        console.error(error);
        throw error;
    }
};

export { createMaterial, getAllMaterials, getMaterialById, updateMaterial, deleteMaterial };
