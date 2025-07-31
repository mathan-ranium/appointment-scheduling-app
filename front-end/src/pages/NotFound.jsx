import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h1>
            <p className="text-gray-700 mb-6">Oops! The page you’re looking for doesn’t exist.</p>
            <Link
                to="/"
                className="text-blue-600 hover:underline font-medium"
            >
                Go to Home
            </Link>
        </main>
    );
}
