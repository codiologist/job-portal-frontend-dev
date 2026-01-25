"use client";

import { useAuth } from "@/context/AuthContext";

const ProfileDetails = () => {
    const { isAuthenticated, user, logout } = useAuth();

    return <div>ProfileDetails</div>;
};

export default ProfileDetails;
