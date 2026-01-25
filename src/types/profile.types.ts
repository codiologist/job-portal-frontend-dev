// Root API response
export interface TGetMyProfileResponse {
    status: boolean;
    message: string;
    data: TUserData;
}

// User object
export interface TUserData {
    id: string;
    fullName: string;
    email: string;
    role: "USER" | "ADMIN" | "RECRUITER"; // extend if you have more roles
    createdAt: string; // ISO date string
    profile: TUserProfile;
}

// Profile object
export interface TUserProfile {
    id: string;
    avatar: string;
    dob: string; // ISO date string
    address: string;
    country: string;
    zip: string;
    maritalStatus: boolean;
    bio: string;
    isVerified: boolean;
    totalExperience: string; // e.g. "13 years"
    portfolioLink: string;
    socialLink: string[]; // currently empty array
    resumeUpload: string;
    skill: string[];
    userId: string;
}
