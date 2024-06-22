import api from "../../config/axios";

const API_BASE_URL = "http://localhost:8080/user/api/v1";

export const fetchUsers = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
export const getAllStaff = async () => {
    try {
        const response = await api.get(`account/users/staff`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const fetchTotalUsers = async () => {
    try {
        const response = await api.get(`${API_BASE_URL}/users`);
        return response.data.length;
    } catch (error) {
        console.error("Error fetching total users:", error);
        throw error;
    }
};
export const updateUser = async (user) => {
    try {
        const response = await api.put(`${API_BASE_URL}/users/${user.id}`, user);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};
export const addUser = async (user) => {
    try {
        const response = await api.post(`${API_BASE_URL}/users`, user);
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await api.delete(`${API_BASE_URL}/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
