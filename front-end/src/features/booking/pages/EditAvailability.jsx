import React, { useEffect, useState } from 'react';
import { fetchAvailabilities, updateAvailability } from '../../../services/availabilityService';
import { format, parseISO } from 'date-fns';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/**
 * EditAvailability component
 * Allows users to view and edit their weekly availability time slots.
 */
export default function EditAvailability() {
    // Local state for availability data
    const [availabilities, setAvailabilities] = useState([]);
    const [loading, setLoading] = useState(false); // Submit loading state
    const [fetchLoading, setFetchLoading] = useState(true); // Initial fetch loading state
    const [fetchError, setFetchError] = useState(null); // Error state

    // Fetch availability on mount
    useEffect(() => {
        loadAvailabilities();
    }, []);

    /**
     * Generate time options in 15-minute intervals (00:00 to 23:45)
     * Format each time to display in 12-hour format (e.g., 3:15 PM)
     */
    const generateTimeOptions = () => {
        const times = [];
        for (let h = 0; h < 24; h++) {
            for (let m = 0; m < 60; m += 15) {
                const hour = String(h).padStart(2, '0');
                const minute = String(m).padStart(2, '0');
                const value = `${hour}:${minute}`;
                const label = format(parseISO(`2000-01-01T${value}:00`), 'hh:mm a');
                times.push({ value, label });
            }
        }
        return times;
    };

    const timeOptions = generateTimeOptions();

    // Fetch the current user's availabilities
    const loadAvailabilities = async () => {
        setFetchLoading(true);
        setFetchError(null);
        try {
            const data = await fetchAvailabilities(); // API call
            setAvailabilities(data); // Populate state
        } catch (error) {
            console.error('Fetch error:', error);
            setFetchError(error.response?.data?.message || 'Failed to load availabilities.');
        } finally {
            setFetchLoading(false);
        }
    };
    
    // Update a specific field (start_time or end_time) of an availability
    const handleChange = (index, key, value) => {
        const updated = [...availabilities];
        updated[index][key] = value;
        setAvailabilities(updated);
    };

    
    // Send all availability changes to the server
    const handleSaveAllChanges = async () => {
        setLoading(true);
        setFetchError(null);

        try {
            await Promise.all(
                availabilities.map(item => updateAvailability(item.id, item)) // API call per item
            );
            toast.success('All availabilities updated successfully!');
            loadAvailabilities(); // Refresh list
        } catch (error) {
            console.error('Update error:', error);
            const msg = error.response?.data?.message || 'Failed to save all changes.';
            setFetchError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-2xl max-w-3xl w-full text-center">
                <h1 className="text-2xl font-extrabold text-gray-900 mb-8">
                    Manage <span className="text-indigo-600">Availability</span>
                </h1>

                {/* Loading spinner */}
                {fetchLoading ? (
                    <div className="flex flex-col items-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500" />
                        <p className="mt-4 text-lg text-gray-700 font-medium">
                            Loading availabilities...
                        </p>
                    </div>
                ) : (
                    <div className="space-y-2 text-left">
                        <h2 className="text-md font-bold text-gray-800 mb-4">Edit Your Slots</h2>

                        {/* Table Header for Desktop */}
                        <div className="hidden md:grid grid-cols-3 gap-4 px-6 py-3 text-sm font-semibold text-gray-600 border-b border-gray-200">
                            <div>Day</div>
                            <div>Start Time</div>
                            <div>End Time</div>
                        </div>

                        {/* Editable Rows */}
                        {availabilities.map((item, index) => (
                            <div key={item.id} className="bg-white md:bg-transparent rounded-xl shadow-sm md:shadow-none">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 py-2 px-4 md:px-6 even:bg-gray-50 rounded-lg">
                                    {/* Day Column */}
                                    <div>
                                        <label className="md:hidden block text-sm font-medium text-gray-700 mb-1">
                                            Day
                                        </label>
                                        <p className="font-semibold text-gray-800 bg-gray-100 px-4 py-2 rounded-lg border border-gray-200 md:border-none md:bg-transparent md:p-0">
                                            {item.day}
                                        </p>
                                    </div>

                                    {/* Start Time Column */}
                                    <div>
                                        <label className="md:hidden block text-sm font-medium text-gray-700 mb-1">
                                            Start Time
                                        </label>
                                        <select
                                            value={item.start_time.slice(0, 5)} // Trim to HH:mm
                                            onChange={e => handleChange(index, 'start_time', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {timeOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* End Time Column */}
                                    <div>
                                        <label className="md:hidden block text-sm font-medium text-gray-700 mb-1">
                                            End Time
                                        </label>
                                        <select
                                            value={item.end_time.slice(0, 5)}
                                            onChange={e => handleChange(index, 'end_time', e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                        >
                                            {timeOptions.map(opt => (
                                                <option key={opt.value} value={opt.value}>
                                                    {opt.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Save Button */}
                        <button
                            onClick={handleSaveAllChanges}
                            disabled={loading}
                            className="w-full bg-indigo-100 text-indigo-700 font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 hover:text-white focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out mt-6"
                        >
                            {loading ? 'Saving All Changes...' : 'Save All Changes'}
                        </button>

                        {/* If no availability data */}
                        {availabilities.length === 0 && (
                            <div className="py-10 text-gray-600 text-center">
                                <p className="mb-2">No availability slots found.</p>
                                <p>You may need to add them first.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Toast Notification Container */}
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
}