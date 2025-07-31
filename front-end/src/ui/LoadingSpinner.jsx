import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-75 z-50 font-inter">
            <div className="flex flex-col items-center">
                {/* Spinner animation */}
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-500"></div>
                {/* Loading text */}
                <p className="mt-4 text-lg text-gray-700 font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default LoadingSpinner;
