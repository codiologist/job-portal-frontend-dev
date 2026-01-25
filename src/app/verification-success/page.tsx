import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, BadgeCheck } from "lucide-react";
import Link from "next/link";

const VerificationSuccess = () => {
    return (
        <div>
            <div className="flex flex-col items-center justify-center min-h-screen bg-liner-to-b from-gray-50 to-gray-100">
                <Card className="w-full lg:max-w-2xl rounded-sm border border-green-200 text-center">
                    <CardContent>
                        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-8 bg-green-100 rounded-full">
                            <BadgeCheck className="w-12 h-12 text-green-700" />
                        </div>

                        <h1 className="mb-3 text-3xl font-bold text-green-700 uppercase">Congratulations</h1>
                        <h1 className="mb-6 text-lg font-bold text-green-700 uppercase">Verification Successful!</h1>

                        <div className="mt-12">
                            <Button className="rounded-sm text-base bg-green-700 hover:bg-green-800">
                                <Link href="/login" className="pl-4">
                                    Go to login
                                </Link>
                                <ArrowRight className="mr-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default VerificationSuccess;
