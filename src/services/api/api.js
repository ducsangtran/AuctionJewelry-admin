// src/services/api.js
import axios from "axios";

const API_BASE_URL = "https://664ef232fafad45dfae1a318.mockapi.io/user/api/v1";

export const fetchUsers = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};

export const updateUser = async (user) => {
    try {
        const response = await axios.put(
            `${API_BASE_URL}/users/${user.id}`,
            user
        );
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
};
