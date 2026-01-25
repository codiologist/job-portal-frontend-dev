import Link from "next/link";
import LoginForm from "./_components/login-form";

const LoginPage = () => {
    return (
        <div>
            <div className="flex w-full flex-wrap">
                <div className="flex w-full flex-col md:w-1/2 lg:w-1/3">
                    <div className="my-auto flex flex-col justify-center px-6 pt-8 sm:px-24 md:justify-start md:px-8 md:pt-0 lg:px-12">
                        <p className="text-center text-3xl font-bold">Welcome</p>
                        <p className="mt-2 text-center">Login to access your account.</p>

                        <LoginForm />

                        <div className="pt-12 pb-12 text-center">
                            <p className="whitespace-nowrap">
                                Don't have an account? Please{" "}
                                <Link href="/register" className="font-semibold text-blue-700">
                                    Signup.
                                </Link>
                            </p>
                        </div>
                    </div>
                    <p className="text-center py-6">© 2026 Career Portal. All rights reserved.</p>
                </div>
                <div className="pointer-events-none hidden select-none bg-black shadow-2xl md:block md:w-1/2 lg:w-2/3">
                    <img className="h-screen w-full object-cover opacity-80" src="/login-bg.jpg" />
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
