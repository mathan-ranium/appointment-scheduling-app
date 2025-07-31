import axios from '../api/axois';

// Fetch booked slots
export const getBookings = async ({ page = 1, perPage = 5, search = '' }) => {
    const response = await axios.get('/bookings', {
        params: { page, perPage, search },
    });

    return response.data;
};

// Fetch available slots
export const getAvailableSlots = async (date) => {
    const formattedDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
    const response = await axios.get(`/slots?date=${formattedDate}`);
    return response.data;
};

// Book a slot
export const bookSlot = async ({ name, email, date, time, title }) => {
    const response = await axios.post("/book", { name, email, date, time, title });
    return response.data;
};
