"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

import { useRouter } from "next/navigation";

const Dashboard = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const router = useRouter();
    const handleLogout = async () => {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.error("Logout failed:", error);
            // Optionally, show an error message to the user
        }
    };
    return (
        <div className="flex h-screen overflow-hidden">
            <Button onClick={handleLogout}>Logout</Button>
            {/* <!-- Sidebar --> */}
            <div className="hidden md:flex md:shrink-0">
                <div className="flex flex-col w-64 bg-blue-800 text-white">
                    <div className="flex items-center justify-center h-16 px-4 bg-blue-900">
                        <span className="text-xl font-semibold">Hotel Vista</span>
                    </div>
                    <div className="flex flex-col grow px-4 py-4 overflow-y-auto">
                        <nav className="flex-1 space-y-2">
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-blue-700 text-white">
                                <i className="fas fa-tachometer-alt mr-3"></i>
                                Dashboard
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white">
                                <i className="fas fa-calendar-check mr-3"></i>
                                Bookings
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white">
                                <i className="fas fa-bed mr-3"></i>
                                Rooms
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white">
                                <i className="fas fa-users mr-3"></i>
                                Guests
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white">
                                <i className="fas fa-concierge-bell mr-3"></i>
                                Services
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white">
                                <i className="fas fa-chart-bar mr-3"></i>
                                Reports
                            </a>
                            <a href="#" className="flex items-center px-4 py-2 text-sm font-medium rounded-md hover:bg-blue-700 text-white">
                                <i className="fas fa-cog mr-3"></i>
                                Settings
                            </a>
                        </nav>
                    </div>
                </div>
            </div>

            {/* <!-- Main Content --> */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* <!-- Top Navigation --> */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
                    <div className="flex items-center">
                        <button className="md:hidden text-gray-500 focus:outline-none">
                            <i className="fas fa-bars"></i>
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800 ml-4">Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-500 focus:outline-none">
                            <i className="fas fa-bell"></i>
                        </button>
                        <button className="text-gray-500 focus:outline-none">
                            <i className="fas fa-envelope"></i>
                        </button>
                        <div className="relative">
                            <button className="flex items-center focus:outline-none">
                                <img className="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/women/11.jpg" alt="User" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* <!-- Main Content Area --> */}
                <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
                    {/* <!-- Stats Cards --> */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                                    <i className="fas fa-bed text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Total Rooms</p>
                                    <p className="text-2xl font-semibold text-gray-800">120</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-green-100 text-green-600">
                                    <i className="fas fa-calendar-check text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Occupied</p>
                                    <p className="text-2xl font-semibold text-gray-800">84</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                                    <i className="fas fa-calendar-day text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Check-ins Today</p>
                                    <p className="text-2xl font-semibold text-gray-800">12</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center">
                                <div className="p-3 rounded-full bg-red-100 text-red-600">
                                    <i className="fas fa-calendar-times text-xl"></i>
                                </div>
                                <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-500">Check-outs Today</p>
                                    <p className="text-2xl font-semibold text-gray-800">8</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div></div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
