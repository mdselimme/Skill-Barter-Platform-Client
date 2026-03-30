"use server";

import { LogInData } from "@/types/auth/auth";

export const logInAccountAction = async (logInData: LogInData) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_API_PUBLIC_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(logInData),
      },
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to log in. Please try again.");
    }

    return {
      success: true,
      message: data.message || "Log in successful",
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
