"use client";

import Link from "next/link";

export default function DesktopMenu() {
    return (
        <nav className="flex items-center space-x-8">
            <Link href="/">Home</Link>
            <Link href="/jobs">Jobs</Link>
        </nav>
    );
}
