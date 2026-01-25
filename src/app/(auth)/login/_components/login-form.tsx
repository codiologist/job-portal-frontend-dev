"use client";

import { Form } from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { toast } from "react-toastify";
import * as z from "zod";
import GoogleBtn from "./GoogleBtn";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { login } = useAuth();
    const router = useRouter();

    const form = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "robin.promoteur@gmail.com",
            password: "123456",
        },
    });

    type LoginResponse = {
        message?: string;
        [key: string]: any;
    };

    async function onSubmit(data: LoginFormData) {
        setIsLoading(true);
        setError(null);
        try {
            await login(data.email, data.password);
            toast.success("Login successful!");
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err?.response?.data?.message || err?.message || "An unexpected error occurred.");
            setError(err?.response?.data?.message || "An unexpected error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="email">Email</Label>
                                <Input {...field} id="email" placeholder="you@example.com" type="email" disabled={isLoading} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <Label htmlFor="password">Password</Label>
                                <Input {...field} id="password" placeholder="Enter your password" type="password" disabled={isLoading} />
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            </Form>
            <div className="flex my-6 items-center">
                <div className="w-full h-px bg-gray-300"></div>
                <span className="mx-4 text-sm font-semibold text-gray-500">Or</span>
                <div className="w-full h-px bg-gray-300"></div>
            </div>

            <div>
                <GoogleBtn />
            </div>
        </div>
    );
};

export default LoginForm;
