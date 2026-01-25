"use client";
import { Mail, User } from "lucide-react";
import GoogleBtn from "../../login/_components/GoogleBtn";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";

import { useAuth } from "@/context/AuthContext";
import { SignupInput, signupSchema } from "@/schemas/auth.schema";
import { useState } from "react";
import { toast } from "react-toastify";

const RegistrationForm = () => {
    const [loading, setLoading] = useState(false);

    const { signup } = useAuth();

    const form = useForm<SignupInput>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            name: "Firoj Ahmed",
            email: "robin.promoteur@gmail.com",
            password: "123456",
            confirmPassword: "123456",
            terms: true,
        },
    });

    const onSubmit = async (data: SignupInput) => {
        try {
            setLoading(true);

            const res = await signup(data.name, data.email, data.password);

            console.log(res);
            if (res.status) {
                toast.success("Account created successfully! Please verify your email.");
                setLoading(false);
            }
        } catch (error: any) {
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {/* Full Name */}
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                        <Input {...field} className="pl-10" placeholder="John Doe" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email Address</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                        <Input {...field} className="pl-10" placeholder="you@email.com" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                        <Input {...field} type="password" className="pl-10" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Confirm Password */}
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                                        <Input {...field} type="password" className="pl-10" />
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Terms */}
                    <FormField
                        control={form.control}
                        name="terms"
                        render={({ field }) => (
                            <FormItem className="flex items-start gap-2">
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                </FormControl>
                                <FormLabel className="text-sm font-normal">
                                    I agree to the{" "}
                                    <Link href="#" className="text-primary">
                                        Terms
                                    </Link>{" "}
                                    &
                                    <Link href="#" className="text-primary">
                                        {" "}
                                        Privacy
                                    </Link>
                                </FormLabel>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button disabled={loading} className="w-full">
                        {loading ? "Creating..." : "Create Account"}
                        <ArrowRight className="ml-2 h-4 w-4" />
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

export default RegistrationForm;
