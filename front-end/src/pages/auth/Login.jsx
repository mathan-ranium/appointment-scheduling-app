import React, { useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext'; // Auth context for login
import { Link } from 'react-router-dom'; // For navigation to Register

function Login() {
    const { login } = useAuth();

    // Local form state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    // Handles form submission and login logic
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({}); // Clear previous errors

        try {
            await login({ email, password }); // Attempt login
        } catch (err) {
            console.error('Login error:', err);

            // Handle structured error messages
            if (err?.response?.data?.errors) {
                setErrors(err.response.data.errors);
            } else if (err?.response?.data?.message) {
                setErrors({ general: [err.response.data.message] });
            } else {
                setErrors({ general: ['Something went wrong. Please try again.'] });
            }
        } finally {
            setLoading(false);
        }
    }, [email, password, login]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl max-w-lg w-full text-center transform transition-all duration-300 hover:scale-105">

                {/* App Logo */}
                <div className="mb-6">
                    <svg
                        className="mx-auto h-16 w-16 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1.5"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
                    Login to SlotBooker
                </h2>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Email Field */}
                    <div>
                        <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            required
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? 'email-error' : undefined}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-400"
                        />
                        {Array.isArray(errors.email) && errors.email.map((msg, idx) => (
                            <p key={idx} id="email-error" className="text-red-600 text-left text-sm mt-1">{msg}</p>
                        ))}
                    </div>

                    {/* Password Field */}
                    <div>
                        <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            aria-invalid={!!errors.password}
                            aria-describedby={errors.password ? 'password-error' : undefined}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 placeholder-gray-400"
                        />
                        {Array.isArray(errors.password) && errors.password.map((msg, idx) => (
                            <p key={idx} id="password-error" className="text-red-600 text-left text-sm mt-1">{msg}</p>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out
                            ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-indigo-700 hover:-translate-y-0.5'}
                        `}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {/* General Errors */}
                {Array.isArray(errors.general) && errors.general.map((msg, idx) => (
                    <p key={idx} className="mt-4 text-red-600 text-sm font-medium">
                        {msg}
                    </p>
                ))}

                {/* Redirect to Register */}
                <p className="mt-6 text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-300">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;