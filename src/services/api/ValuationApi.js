import api from '../../config/axios';

const getAllValuations = async () => {
  try {
    const response = await api.get(`valuating`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
const getMyValuations = async () => {
  try {
    const response = await api.get(`valuating/me`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
const getAvailableStaff = async () => {
  try {
    const response = await api.get(`valuating/available_staff`);
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};
const editValuating = async (
  id,
  address,
  staffId,
  valuation_value,
  notes,
  status,
  desiredPrice,
  paymentMethod,
  valuatingMethod,
  startingPrice
) => {
  try {
    const response = await api.put(`valuating/${id}`, {
      address,
      staffId,
      valuation_value,
      notes,
      status,
      desiredPrice,
      paymentMethod,
      valuatingMethod,
      startingPrice
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
const searchValuationById = async (id) => {
  try {
    const response = await api.get(`valuating/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};
const deleteValuation = async (id) => {
  try {
    const response = await api.delete(`valuating/${id}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error(error);
    throw error;
  }
};

export const valuatingOnline = async (data) => {
  const response = await api.post('valuating', data);
  return response.data;
};

export {
  getAllValuations,
  editValuating,
  searchValuationById,
  deleteValuation,
  getMyValuations,
  getAvailableStaff,
};
