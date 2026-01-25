import Link from "next/link";

const VerificationSuccess = () => {
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
                <div className="w-full max-w-2xl p-12 mx-4 text-center transition-all transform bg-white shadow-lg rounded-xl hover:shadow-xl">
                    <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
                        <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>

                    <h1 className="mb-6 text-4xl font-extrabold text-green-600">Email Verification Successfull !</h1>

                    <div className="mt-12">
                        <Link href="/login">Please Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerificationSuccess;
