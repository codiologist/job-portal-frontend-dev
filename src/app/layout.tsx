import type { Metadata } from "next";
import { Funnel_Sans, Inter } from "next/font/google";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
});

const funnelSans = Funnel_Sans({
    variable: "--font-funnel-sans", // Optional: for CSS variable usage
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    title: "Career Portal",
    description: "",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={` ${inter.variable} ${funnelSans.className} antialiased`}>
                <AuthProvider>
                    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
                        <ToastContainer />
                        {children}
                    </GoogleOAuthProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
