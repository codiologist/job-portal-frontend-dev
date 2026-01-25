import { User } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
    return (
        <div className="hidden md:flex md:shrink-0">
            <div className="flex flex-col w-64 text-white">
                <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
                    <span className="text-2xl font-bold text-primary">Career Portal</span>
                </div>
                <div className="flex flex-col grow px-4 py-4 overflow-y-auto">
                    <nav className="flex-1 space-y-2">
                        <Link href="#" className="flex items-center px-4 py-2 text-sm font-medium rounded-md bg-blue-700 text-white">
                            <User className="mr-3" />
                            My Profile
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
