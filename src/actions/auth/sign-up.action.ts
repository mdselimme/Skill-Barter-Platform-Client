"use server";
import { SignUpData } from "@/types/auth/sign-up.type";

export const signUpAccountAction = async (signUpDate: SignUpData) => {
    try {
        const response = await fetch(`${process.env.NEXT_API_PUBLIC_BASE_URL}/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(signUpDate),
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || "Failed to sign up");
        }

        return {
            success: true,
            message: data.message || "Sign up successful",
        }
    } catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "An unknown error occurred",
        };
    }
};