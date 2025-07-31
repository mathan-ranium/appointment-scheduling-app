import React, { useState, useEffect } from "react";
import BookingCalendar from "../components/BookingCalendar";
import BookingForm from "../components/BookingForm";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { getAvailableSlots, bookSlot } from "../../../services/bookingService"; // 👈 new

export default function BookSlot() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState(null);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [formErrors, setFormErrors] = useState({});

    const navigate = useNavigate();

    const fetchSlots = async (date) => {
        setIsLoadingSlots(true);
        try {
            const data = await getAvailableSlots(date);
            setAvailableSlots(data);
        } catch (err) {
            console.error("Failed to fetch slots:", err);
            toast.error("Unable to load slots. Please try again.");
            setAvailableSlots([]);
        } finally {
            setIsLoadingSlots(false);
        }
    };

    useEffect(() => {
        fetchSlots(new Date());
    }, []);

    const handleDateChange = async (date) => {
        setSelectedDate(date);
        setSelectedTimeSlot(null);
        await fetchSlots(date);
    };

    const handleDateTimeSelect = (date, timeSlot, title) => {
        setSelectedDate(date);
        setSelectedTimeSlot(timeSlot);
        setTitle(title);
    };

    const handleBookingSubmit = async ({ name, email, date, time, title }) => {
        try {
            setFormErrors({});
            await bookSlot({ name, email, date, time, title }); // 👈 use service
            setError(null);

            setTimeout(() => {
                navigate("/admin/booked-slots", {
                    state: { success: "Event Booked, A notification has been sent." }
                });
            }, 1500);
        } catch (err) {
            const response = err.response;
            if (response?.data?.errors) {
                setFormErrors(response.data.errors);
            } else {
                const message = response?.data?.message || "Booking failed.";
                toast.error(message);
                setError(message);
            }
        }
    };

    return (
        <div className="max-w-5xl mx-auto mt-10 space-y-6 px-4">
            {error && <p className="text-red-500 text-center text-lg">{error}</p>}

            {!selectedTimeSlot && (
                <BookingCalendar
                    availableSlots={availableSlots}
                    onDateTimeSelect={handleDateTimeSelect}
                    onDateChange={handleDateChange}
                    isLoading={isLoadingSlots}
                />
            )}

            {selectedDate && selectedTimeSlot && (
                <BookingForm
                    date={selectedDate.toLocaleDateString('en-CA')}
                    time={selectedTimeSlot}
                    title={title}
                    onSubmit={handleBookingSubmit}
                    errors={formErrors}
                />
            )}
        </div>
    );
}
