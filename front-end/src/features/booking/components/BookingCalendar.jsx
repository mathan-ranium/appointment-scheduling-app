import React, { useState, useEffect, useMemo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
} from "date-fns";

/**
 * BookingCalendar Component
 * Props:
 * - availableSlots: Array of slot objects
 * - onDateTimeSelect: callback when both date & time are selected
 * - onDateChange: callback when calendar date changes
 * - isLoading: loading state for time slots
 */
export default function BookingCalendar({ onDateTimeSelect, availableSlots, onDateChange, isLoading }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null);
    const [title, setTitle] = useState("New Meeting");

    // Reset time when selectedDate or slots change
    useEffect(() => {
        setSelectedTime(null);
    }, [selectedDate, availableSlots]);

    // Notify parent when date + time + title are selected
    useEffect(() => {
        if (selectedDate && selectedTime) {
            onDateTimeSelect(selectedDate, selectedTime, title);
        }
    }, [selectedDate, selectedTime, title, onDateTimeSelect]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedTime(null);

        if (!isSameMonth(date, currentMonth)) {
            setCurrentMonth(date);
        }

        onDateChange(date); // Inform parent
    };

    const handleTimeSelect = (slot) => {
        if (!slot.isBooked) setSelectedTime(slot);
    };

    const goToNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const goToPreviousMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Memoized to avoid recalculation on each render
    const calendarDays = useMemo(() => {
        const daysInMonth = eachDayOfInterval({
            start: startOfMonth(currentMonth),
            end: endOfMonth(currentMonth),
        });

        const firstDayOfWeek = startOfMonth(currentMonth).getDay();
        const leading = Array.from({ length: firstDayOfWeek });
        const totalCells = leading.length + daysInMonth.length;
        const trailing = Array.from({ length: (7 - (totalCells % 7)) % 7 });

        return { daysInMonth, leading, trailing };
    }, [currentMonth]);

    return (
        <div className="p-8 bg-white rounded-3xl shadow-2xl mx-auto w-full min-h-[550px]">
            <div className="mb-4">
                <h1 className="font-bold">Select a Date & Time</h1>
                <div className="mt-4">
                    <label className="text-sm text-gray-600 font-medium">Event type</label>
                    <input
                        type="text"
                        required
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Your title"
                        className="p-2 border rounded w-full font-semibold"
                    />
                </div>
            </div>

            <div className="flex items-center text-sm font-medium text-gray-700 mb-6">
                <svg className="h-5 w-5 mr-2 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                30 mins
            </div>

            <div className={`mt-3 ${selectedDate ? 'md:flex md:flex-col lg:flex-row gap-8' : 'md:flex gap-8'}`}>
                {/* Calendar */}
                <div className="flex-1 p-6 border border-gray-100 rounded-2xl shadow-sm bg-gray-50">
                    <div className="flex justify-between items-center mb-6">
                        <button onClick={goToPreviousMonth} className="p-2 rounded-full hover:bg-gray-200 text-sm text-gray-700">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <h2 className="text-md font-bold text-gray-800">{format(currentMonth, "MMMM yyyy")}</h2>
                        <button onClick={goToNextMonth} className="p-2 rounded-full hover:bg-gray-200 text-sm text-gray-700">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Day Labels */}
                    <div className="grid grid-cols-7 text-center text-sm font-semibold text-gray-500 mb-4">
                        {dayNames.map(day => (
                            <div key={day} className="py-2">{day}</div>
                        ))}
                    </div>

                    {/* Date Cells */}
                    <div className="grid grid-cols-7 gap-y-2">
                        {calendarDays.leading.map((_, i) => (
                            <div key={`leading-${i}`} className="py-3"></div>
                        ))}

                        {calendarDays.daysInMonth.map(day => {
                            const isCurrentMonth = isSameMonth(day, currentMonth);
                            const isSelected = selectedDate && isSameDay(day, selectedDate);
                            const isToday = isSameDay(day, new Date());
                            const isPast = day < new Date().setHours(0, 0, 0, 0);

                            return (
                                <div key={day.toISOString()} className="px-1">
                                    <button
                                        onClick={() => handleDateChange(day)}
                                        disabled={isPast}
                                        className={`
                                            py-1 px-3.5 rounded-full w-full h-10 flex items-center justify-center text-lg font-medium
                                            ${isCurrentMonth ? 'text-gray-900' : 'text-gray-400'}
                                            ${isSelected
                                                ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-500 ring-offset-2'
                                                : isToday
                                                    ? 'border border-indigo-500 text-indigo-700 bg-indigo-50'
                                                    : 'hover:bg-indigo-100 hover:text-indigo-800'}
                                            ${isPast ? 'cursor-not-allowed opacity-50' : ''}
                                        `}
                                    >
                                        {format(day, 'd')}
                                    </button>
                                </div>
                            );
                        })}

                        {calendarDays.trailing.map((_, i) => (
                            <div key={`trailing-${i}`} className="py-3"></div>
                        ))}
                    </div>
                </div>

                {/* Time Slots */}
                <div className="flex-1 p-6 border border-gray-100 rounded-2xl shadow-sm bg-gray-50">
                    <h3 className="text-xl font-bold text-gray-800 mb-6">Available Time Slots</h3>

                    {!selectedDate ? (
                        <p className="text-center text-gray-500 text-md mt-8">Please select a date.</p>
                    ) : isLoading ? (
                        <div className="flex justify-center items-center h-32">
                            <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                            </svg>
                        </div>
                    ) : availableSlots?.length > 0 ? (
                        <div className={`transition-all duration-500 ease-in-out transform ${selectedDate ? "opacity-100 max-h-[500px] scale-100" : "opacity-0 max-h-0 scale-95 pointer-events-none"} grid grid-cols-2 sm:grid-cols-3 gap-4 flex-grow overflow-y-auto pr-2 custom-scrollbar`}>
                            {availableSlots.map(slot => {
                                const isSelected = selectedTime && selectedTime.id === slot.id;
                                return (
                                    <button
                                        key={slot.id}
                                        onClick={() => handleTimeSelect(slot)}
                                        disabled={slot.isBooked}
                                        className={`
                                            px-4 py-2 rounded-xl h-10 text-sm font-medium
                                            ${slot.isBooked
                                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                                : isSelected
                                                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-500 ring-offset-2'
                                                    : 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200'}
                                        `}
                                    >
                                        {format(new Date(`2000-01-01T${slot.time}`), 'hh:mm a')}
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 text-md mt-8">No available slots for {selectedDate?.toDateString()}.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
