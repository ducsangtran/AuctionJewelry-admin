import api from "../../config/axios";

export const getAllUsers = async () => {
    try {
        const response = await api.get(`/account `);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
export const getRoles = async () => {
    try {
        const response = await api.get(`/account/roles `);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
export const updateUser = async (
    id,
    full_name,
    email,
    password,
    roleId,
    phone_number,
    address,
    is_active,
    date_of_birth
) => {
    try {
        const response = await api.put(`account/${id}`, {
            full_name,
            email,
            password,
            roleId,
            phone_number,
            address,
            is_active,
            date_of_birth,
        });
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

export const banUser = async (id) => {
    try {
        const response = await api.put(`account/${id}/ban`);
        return response.data;
    } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
    }
};
