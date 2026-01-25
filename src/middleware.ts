import { NextRequest, NextResponse } from "next/server";

// Define paths that don't need auth
const PUBLIC_PATHS = ["/login", "/register", "/api/public"];

export function middleware(req: NextRequest) {
    // Check cookie for token
    const token = req.cookies.get("token")?.value;

    const { pathname } = req.nextUrl;

    console.log("Pathname", pathname);

    if ((token && pathname.startsWith("/login")) || pathname.startsWith("/register")) {
        const loginUrl = new URL("/", req.url);
        return NextResponse.redirect(loginUrl);
    }

    if (!token) {
        // Redirect to login if no token
        const loginUrl = new URL("/login", req.url);
        return NextResponse.redirect(loginUrl);
    }

    // Allow public paths
    if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
        return NextResponse.next();
    }

    // If token exists, continue
    return NextResponse.next();
}

// Apply middleware only for certain routes
export const config = {
    matcher: ["/dashboard/:path*", "/profile/:path*"], // protect these routes
};
