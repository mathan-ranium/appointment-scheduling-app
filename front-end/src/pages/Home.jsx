import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
    const { user, isAuthenticated } = useAuth();

    // Simulate auth loading if needed
    useEffect(() => {
        const timeout = setTimeout(() => {
        }, 500); // Delay to mimic loading, adjust if needed
        return () => clearTimeout(timeout);
    }, [user]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-inter transition-opacity duration-500">
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow max-w-6xl w-full text-center overflow-y-auto max-h-[calc(100vh-4rem)]">
                {/* App Icon */}
                <div className="mb-6">
                    <svg className="mx-auto h-24 w-24 text-indigo-600 drop-shadow-md" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                </div>

                <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
                    Welcome to <span className="text-indigo-600">SlotBooker</span>!
                </h1>

                <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-prose mx-auto">
                    Your ultimate solution for effortless booking and scheduling.
                    Manage your appointments, classes, or resources with ease.
                </p>

                {!isAuthenticated ? (
                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
                        <Link to="/login" className="btn-primary">Login</Link>
                        <Link to="/register" className="btn-outline">Register</Link>
                    </div>
                ) : (
                    <div className="mb-8">
                        <p className="text-xl font-semibold text-gray-800 mb-5">
                            Hello, <span className="text-indigo-700">{user?.name || 'Authenticated User'}</span>!
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <HomeButton to="/booking" label="Book a New Slot" color="green" icon="plus" />
                            <HomeButton to="/admin/booked-slots" label="View My Bookings" color="blue" icon="calendar" />
                            <HomeButton to="/admin/edit-availability" label="Manage Available Slots" color="purple" icon="settings" />
                        </div>
                    </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Effortless Booking at Your Fingertips</h3>
                    <p className="text-md text-gray-700 leading-relaxed max-w-prose mx-auto">
                        With SlotBooker, you can easily view available time slots, book appointments,
                        and manage your schedule from anywhere. Our intuitive interface ensures a smooth experience.
                    </p>
                </div>
            </div>
        </div>
    );
}

function HomeButton({ to, label, color, icon }) {
    const colors = {
        green: 'bg-green-100 text-green-700 hover:bg-green-700 hover:text-white focus:ring-green-500',
        blue: 'bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-white focus:ring-blue-500',
        purple: 'bg-purple-100 text-purple-700 hover:bg-purple-700 hover:text-white focus:ring-purple-500',
    };

    const icons = {
        plus: <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>,
        calendar: <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>,
        settings: <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37a1.724 1.724 0 002.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    };

    return (
        <Link
            to={to}
            className={`px-6 py-2 font-bold text-sm rounded-xl shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:-translate-y-0.5 hover:scale-105 flex items-center justify-center ${colors[color]}`}
        >
            {icons[icon]} {label}
        </Link>
    );
}

export default Home;