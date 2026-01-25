// import { NextRequest, NextResponse } from "next/server";

// // Define paths that don't need auth
// const PUBLIC_PATHS = ["/login", "/register", "/api/public"];

// export function middleware(req: NextRequest) {
//     // Check cookie for token
//     const token = req.cookies.get("token")?.value;

//     const { pathname } = req.nextUrl;

//     console.log({ req });

//     // Allow public paths
//     if (PUBLIC_PATHS.some((path) => pathname.startsWith(path))) {
//         return NextResponse.next();
//     }

//     if (!token) {
//         // Redirect to login if no token
//         const loginUrl = new URL("/login", req.url);
//         return NextResponse.redirect(loginUrl);
//     }

//     // If token exists, continue
//     return NextResponse.next();
// }

// // Apply middleware only for certain routes
// export const config = {
//     matcher: ["/dashboard/:path*", "/profile/:path*", "/login"], // protect these routes
// };

import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    console.log(request);
    return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
    matcher: "/about/:path*",
};
