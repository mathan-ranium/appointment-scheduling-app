import axios from '../api/axois';

// Fetch all availability slots
export const fetchAvailabilities = async () => {
    const response = await axios.get('/availabilities');
    return response.data;
};

// Update a single availability slot by ID
export const updateAvailability = async (id, data) => {
    const response = await axios.put(`/availabilities/${id}`, data);
    return response.data;
};
