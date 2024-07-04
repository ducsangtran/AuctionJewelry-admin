import api from "../../config/axios";

export const getAllShipper = async () => {
    try {
        const response = await api.get(`account/shippers`);
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
};
export const addShipper = async (full_name, email, password, role_id, phone_number, address, date_of_birth) => {
    try {
        const response = await api.post(`account/users/shipper`, {
            full_name,
            email,
            password,
            role_id,
            phone_number,
            address,
            date_of_birth,
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching shippers:", error);
        throw error;
    }
};
