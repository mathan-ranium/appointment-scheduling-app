import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Ensure the path is valid

function Register() {
    const { register } = useAuth(); // Get register function from context
    const navigate = useNavigate(); // For navigation after registration

    // Form field states
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    // Error & success feedback
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState('');

    // Form submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setSuccess('');

        // Call register method from AuthContext
        const { error, success } = await register({
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
        });

        // Handle response
        if (error) {
            setErrors(error);
        } else {
            setSuccess(success);
            setTimeout(() => {
                navigate('/'); // Redirect to home after 1.5s
            }, 1500);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl max-w-lg w-full text-center transform transition-all duration-300 hover:scale-105">

                {/* Icon */}
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

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-6">
                    Register for SlotBooker
                </h2>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-5" noValidate>

                    {/* Full Name */}
                    <div>
                        <label htmlFor="name" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            aria-invalid={!!errors.name}
                        />
                        {Array.isArray(errors.name) && errors.name.map((msg, idx) => (
                            <p key={idx} className="text-red-600 text-sm text-left mt-1">{msg}</p>
                        ))}
                    </div>

                    {/* Email */}
                    <div>
                        <label htmlFor="email" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            aria-invalid={!!errors.email}
                        />
                        {Array.isArray(errors.email) && errors.email.map((msg, idx) => (
                            <p key={idx} className="text-red-600 text-sm text-left mt-1">{msg}</p>
                        ))}
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            aria-invalid={!!errors.password}
                        />
                        {Array.isArray(errors.password) && errors.password.map((msg, idx) => (
                            <p key={idx} className="text-red-600 text-sm text-left mt-1">{msg}</p>
                        ))}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label htmlFor="passwordConfirmation" className="block text-left text-sm font-medium text-gray-700 mb-1">
                            Confirm Password
                        </label>
                        <input
                            id="passwordConfirmation"
                            type="password"
                            placeholder="••••••••"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:ring-indigo-500 focus:border-indigo-500 transition"
                            aria-invalid={!!errors.password_confirmation}
                        />
                        {Array.isArray(errors.password_confirmation) && errors.password_confirmation.map((msg, idx) => (
                            <p key={idx} className="text-red-600 text-sm text-left mt-1">{msg}</p>
                        ))}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 transform hover:-translate-y-0.5"
                    >
                        Register
                    </button>
                </form>

                {/* General Errors */}
                {Array.isArray(errors.general) && errors.general.map((msg, idx) => (
                    <p key={idx} className="mt-4 text-red-600 text-sm text-left font-medium">{msg}</p>
                ))}

                {/* Success Message */}
                {success && (
                    <p className="mt-4 text-green-600 text-sm font-medium">
                        {success}
                    </p>
                )}

                {/* Link to login */}
                <p className="mt-6 text-gray-600 text-sm">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-300">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Register;