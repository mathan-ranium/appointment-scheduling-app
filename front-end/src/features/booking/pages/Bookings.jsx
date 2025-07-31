import { useEffect, useState, useRef } from 'react';
import { getBookings } from '../../../services/bookingService'; // <- Import the service
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import AnimatedList from "../../../ui/AnimatedList";
import { format } from 'date-fns';

export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [meta, setMeta] = useState({ current_page: 1, last_page: 1 });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const location = useLocation();
    const navigate = useNavigate();
    const toastShown = useRef(false);
    const perPage = 5;

    useEffect(() => {
        fetchBookings();

        if (location.state?.success && !toastShown.current) {
            toast.success(location.state.success);
            toastShown.current = true;
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, currentPage, searchTerm]);

    const fetchBookings = async () => {
        setLoading(true);
        setError(null);

        try {
            const data = await getBookings({
                page: currentPage,
                perPage,
                search: searchTerm,
            });

            setBookings(data.data);
            setMeta({
                current_page: data.current_page,
                last_page: data.last_page,
            });
        } catch (err) {
            console.error("Error fetching bookings:", err);
            setError(err.response?.data?.message || "Failed to load your bookings.");
            setBookings([]);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    return (
        <div className="md:min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
            <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-md max-w-5xl w-full text-center">
                <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 leading-tight">
                    Your <span className="text-indigo-600">Bookings</span>
                </h1>

                {/* Search input */}
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Search by name, email, or title..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full px-5 py-2 border border-gray-300 rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 transition duration-200"
                    />
                </div>

                {/* Main content */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500"></div>
                        <p className="mt-4 text-lg text-gray-700 font-medium">Loading your appointments...</p>
                    </div>
                ) : error ? (
                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg text-left">
                        <p className="font-semibold">Error:</p>
                        <p>{error}</p>
                    </div>
                ) : bookings.length > 0 ? (
                    <>
                        <h2 className="text-xl font-bold text-gray-800 mb-6 text-left">Upcoming Appointments</h2>

                        <AnimatedList
                            items={bookings}
                            listKey={`${currentPage}-${searchTerm}`}
                            renderItem={(booking) => (
                                <div className="p-4 bg-white border border-indigo-200 rounded-xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center">
                                    <div className="mb-3 sm:mb-0 flex-1">
                                        <p className="text-md font-semibold text-indigo-800 mb-1">
                                            {booking.title || 'Meeting'}
                                        </p>
                                        <div className="text-md text-indigo-700 space-y-2">
                                            <div className='flex items-center'>
                                                <svg className="h-4 w-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                                <p className="font-medium text-sm">
                                                    {format(new Date(booking.date), 'EEEE, MMM d, yyyy')}
                                                </p>
                                            </div>
                                            <div className='flex items-center'>
                                                <svg className="h-4 w-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <p className="font-medium text-sm">
                                                    {format(new Date(`2000-01-01T${booking.booked_time}`), 'hh:mm a')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-600 text-left sm:text-right mt-3 sm:mt-0">
                                        <p className="mb-1">
                                            Booked with: <span className="font-medium text-gray-800">{booking.name}</span> (<span className="font-medium text-gray-800">{booking.email}</span>)
                                        </p>
                                        <p>
                                            Booked on: <span className="font-medium text-gray-800">{format(new Date(booking.created_at), 'MMM d, yyyy hh:mm a')}</span>
                                        </p>
                                    </div>
                                </div>
                            )}
                        />

                        {/* Pagination Controls */}
                        {meta.last_page > 1 && (
                            <div className="flex justify-center items-center mt-8 space-x-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                                    disabled={currentPage === 1}
                                    className="px-3 py-3 rounded-lg border border-indigo-300 bg-white text-indigo-600 hover:bg-indigo-100 transition disabled:opacity-50"
                                >
                                    <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>

                                {Array.from({ length: meta.last_page }, (_, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`px-4 py-2 rounded-lg border ${meta.current_page === i + 1
                                            ? 'bg-indigo-600 text-white shadow-md'
                                            : 'bg-white text-indigo-600 border-indigo-300'
                                            } hover:bg-indigo-100 transition`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(meta.last_page, prev + 1))}
                                    disabled={currentPage === meta.last_page}
                                    className="px-3 py-3 rounded-lg border border-indigo-300 bg-white text-indigo-600 hover:bg-indigo-100 transition disabled:opacity-50"
                                >
                                    <svg className="h-4 w-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="py-10 text-gray-600 text-lg">
                        <p className="mb-4">You don't have any bookings yet.</p>
                        <p>Start by scheduling your first appointment!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
