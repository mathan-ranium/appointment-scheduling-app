import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Navbar component - responsive navigation with user profile dropdown
 */
export default function Navbar() {
    const { user, logout } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profileDropdownRef = useRef(null);

    // Toggles mobile menu visibility
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(prev => !prev);
        setIsProfileDropdownOpen(false); // Always close profile menu on toggle
    };

    // Toggles profile dropdown visibility
    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(prev => !prev);
    };

    // Close profile dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Class for active/inactive NavLink
    const linkClass = ({ isActive }) =>
        `text-base font-semibold relative after:absolute after:bottom-0 after:transition-all after:duration-300 whitespace-nowrap
        ${isActive
            ? "text-indigo-600 after:w-full after:bg-indigo-600"
            : "text-gray-700 hover:after:w-full after:w-0 after:bg-current"
        }`;

    const getInitial = (name = "") => name.charAt(0).toUpperCase();

    return (
        <nav className="bg-white shadow-lg p-4 sticky top-0 z-40 font-inter">
            <div className="container mx-auto flex justify-between items-center">
                {/* Brand Logo */}
                <NavLink
                    to="/"
                    className="text-xl sm:text-2xl font-bold text-indigo-600 hover:text-indigo-800 transition duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                >
                    SlotBooker
                </NavLink>

                {/* Mobile Toggle Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 text-gray-700 hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                        aria-label="Toggle Menu"
                    >
                        {isMobileMenuOpen ? (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Navigation Links + Profile */}
                <div
                    className={`flex flex-col md:flex-row md:items-center md:space-x-6 absolute md:static top-full left-0 w-full md:w-auto
                        bg-white md:bg-transparent shadow-lg md:shadow-none transition-all duration-300 ease-in-out
                        ${isMobileMenuOpen ? 'max-h-screen py-4 opacity-100' : 'max-h-0 py-0 opacity-0 overflow-hidden'}
                        md:max-h-screen md:opacity-100 md:py-0 md:overflow-visible`}
                >
                    {user ? (
                        <>
                            {/* Authenticated Links */}
                            <div className="flex flex-col md:flex-row gap-3 lg:gap-6 text-center md:text-left w-full md:w-auto">
                                <NavLink to="/booking" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Book a New Slot</NavLink>
                                <NavLink to="/admin/booked-slots" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>View My Bookings</NavLink>
                                <NavLink to="/admin/edit-availability" className={linkClass} onClick={() => setIsMobileMenuOpen(false)}>Manage Available Slots</NavLink>
                            </div>

                            {/* Profile Dropdown */}
                            <div className="md:text-start text-center mx-auto md:mx-0 mt-4 md:mt-0" ref={profileDropdownRef}>
                                <button
                                    onClick={toggleProfileDropdown}
                                    className="flex items-center space-x-2 p-1 text-gray-700 hover:text-indigo-600 focus:outline-none"
                                    aria-expanded={isProfileDropdownOpen}
                                    aria-label="Profile menu"
                                >
                                    <div className="w-7 h-7 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-lg shadow-md">
                                        {getInitial(user.name)}
                                    </div>
                                    <span className="hidden md:block font-semibold text-md">{user.name}</span>
                                    <svg
                                        className={`h-5 w-5 transition-transform duration-200 ${isProfileDropdownOpen ? "rotate-180" : ""}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown Content */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-60 bg-white rounded-lg shadow-xl py-2 z-50 animate-fade-in-down">
                                        <div className="px-4 py-3 border-b border-gray-100">
                                            <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>
                                        <button
                                            onClick={() => {
                                                logout();
                                                setIsProfileDropdownOpen(false);
                                            }}
                                            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition duration-200"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        // Guest Links
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
                            <NavLink
                                to="/login"
                                className={({ isActive }) =>
                                    `text-gray-700 hover:text-indigo-600 font-medium transition duration-300 px-3 py-2 rounded-md text-center
                                    ${isActive ? "text-indigo-600 font-semibold underline" : ""}`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to="/register"
                                className={({ isActive }) =>
                                    `bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none
                                    focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out text-center
                                    ${isActive ? "ring-2 ring-indigo-500" : ""}`
                                }
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                Register
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}