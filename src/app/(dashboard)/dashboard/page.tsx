"use client";

import { useAuth } from "@/context/AuthContext";

import ProfileDetails from "@/app/features/profile/profile-details";
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
    return <ProfileDetails />;
};

export default Dashboard;
