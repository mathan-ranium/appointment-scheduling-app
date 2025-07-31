import React, { useState } from "react";
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

/**
 * BookingForm Component
 *
 * date - Selected booking date (ISO string)
 * time - Selected time slot object, expected format { time: "HH:mm" }
 * title - Title of the event
 * onSubmit - Form submission handler
 * errors - Optional form field errors
 */
export default function BookingForm({ date, time, title, onSubmit, errors = {} }) {
    const [formData, setFormData] = useState({ name: "", email: "" });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSubmit({
                ...formData,
                date,
                time: time?.time,
                title: title || 'New Meeting'
            });
        } finally {
            setLoading(false);
        }
    };

    // Safely format date/time for display
    const formattedDate = date ? format(new Date(date), 'PPP') : "Invalid date";
    const formattedTime = time?.time
        ? format(new Date(`2000-01-01T${time.time}`), 'hh:mm a')
        : "Invalid time";

    return (
        <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl max-w-xl w-full mx-auto font-inter">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center">
                Confirm Your Details
            </h2>

            {/* Summary of Selected Slot */}
            <div className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
                <p className="text-lg font-semibold text-indigo-800 mb-1">
                    Event: <span className="text-indigo-900">{title || 'New Meeting'}</span>
                </p>
                <p className="text-md text-indigo-700">
                    On <span className="font-medium">{formattedDate}</span> at{' '}
                    <span className="font-medium">{formattedTime}</span>
                </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Full Name */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        required
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-200 ease-in-out
                            ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}
                        `}
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                    />
                    {errors.name && (
                        <p id="name-error" className="text-sm text-red-600 mt-1">{errors.name[0]}</p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Your Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        required
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg shadow-sm placeholder-gray-400 transition duration-200 ease-in-out
                            ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'}
                        `}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email && (
                        <p id="email-error" className="text-sm text-red-600 mt-1">{errors.email[0]}</p>
                    )}
                </div>

                {/* General Server-side Error */}
                {errors.message && (
                    <p className="text-red-600 text-center mt-4">{errors.message}</p>
                )}

                {/* Actions */}
                <div className="space-y-3">
                    <Link
                        to="/"
                        className="w-full block bg-white text-indigo-600 border border-indigo-600 font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out text-center"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out
                            ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-green-700'}
                        `}
                    >
                        {loading ? 'Confirming...' : 'Confirm Booking'}
                    </button>
                </div>
            </form>
        </div>
    );
}