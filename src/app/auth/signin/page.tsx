"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRouter } from "next/navigation";

// GraphQL mutation for user login
const LOGIN_USER = gql`
    mutation LoginUser($username: String!, $password: String!) {
        loginUser(username: $username, password: $password) {
            user {
                id
                username
                email
            }
            success
            errors
            token
        }
    }
`;

// Form validation schema
const signinSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

type SigninFormData = z.infer<typeof signinSchema>;

export default function SigninPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [serverErrors, setServerErrors] = useState<string[]>([]);

    const [loginUser] = useMutation(LOGIN_USER);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SigninFormData>({
        resolver: zodResolver(signinSchema),
    });

    const onSubmit = async (data: SigninFormData) => {
        setIsLoading(true);
        setServerErrors([]);

        try {
            const { data: result } = await loginUser({
                variables: {
                    username: data.username,
                    password: data.password,
                },
            });

            if (result.loginUser.success) {
                // Save token if needed, then redirect
                router.push("/");
            } else {
                setServerErrors(result.loginUser.errors || ["Login failed"]);
            }
        } catch (error) {
            console.error("Login error:", error);
            setServerErrors(["An unexpected error occurred. Please try again."]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {/* Header */}
            <div className="absolute top-0 left-0 right-0 p-6">
                <div className="container mx-auto">
                    <Link href="/" className="flex items-center space-x-2 w-fit">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">Q</span>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">QuickCoach</h1>
                    </Link>
                </div>
            </div>

            {/* Main Content */}
            <div className="w-full max-w-md mt-20">
                <Card className="shadow-xl">
                    <CardHeader className="text-center">
                        <Badge className="mx-auto mb-4 w-fit" variant="secondary">
                            🔑 Sign in to QuickCoach
                        </Badge>
                        <CardTitle className="text-2xl">Welcome Back</CardTitle>
                        <CardDescription>
                            Sign in to continue your AI-powered coaching journey
                        </CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Server Errors */}
                            {serverErrors.length > 0 && (
                                <div className="bg-red-50 border border-red-200 rounded-md p-3">
                                    {serverErrors.map((error, index) => (
                                        <p key={index} className="text-red-600 text-sm">{error}</p>
                                    ))}
                                </div>
                            )}

                            {/* Username */}
                            <div className="space-y-2">
                                <label htmlFor="username" className="text-sm font-medium text-gray-700">
                                    Username
                                </label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    {...register("username")}
                                    className={errors.username ? "border-red-500" : ""}
                                />
                                {errors.username && (
                                    <p className="text-red-500 text-sm">{errors.username.message}</p>
                                )}
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    {...register("password")}
                                    className={errors.password ? "border-red-500" : ""}
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm">{errors.password.message}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button 
                                type="submit" 
                                className="w-full" 
                                disabled={isLoading}
                                size="lg"
                            >
                                {isLoading ? "Signing In..." : "Sign In"}
                            </Button>
                        </form>

                        {/* Signup Link */}
                        <div className="mt-6 text-center">
                            <p className="text-sm text-gray-600">
                                Don't have an account?{" "}
                                <Link href="/auth/signup" className="text-blue-600 hover:underline font-medium">
                                    Create one here
                                </Link>
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
