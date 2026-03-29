"use client"

import Link from "next/link"
import { ArrowRight, Loader2, Lock, Mail, Sparkles, UserRound } from "lucide-react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import GoogleLogo from "@/assets/logoComponent/GoogleLogo"
import { signUpAccountAction } from "@/actions/auth/sign-up.action"
import { useRouter } from "next/navigation"

const passwordRule = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/

//register form validation schema
const registerSchema = z
    .object({
        fullName: z
            .string()
            .trim()
            .min(2, "Name must be at least 2 characters long."),
        email: z.email("Please enter a valid email address."),
        password: z
            .string()
            .regex(
                passwordRule,
                "Password must include uppercase, lowercase, special character, and be at least 8 characters."
            ),
        confirmPassword: z.string().min(1, "Please confirm your password."),
    })
    .refine((values) => values.password === values.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match.",
    })

type RegisterSchema = z.infer<typeof registerSchema>

const RegisterForm = () => {

    const router = useRouter();

    //react hook form validation
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    //submit register form
    const onSubmit = async (values: RegisterSchema) => {

        const registerData = {
            name: values.fullName,
            email: values.email,
            password: values.password,
        };

        const result = await signUpAccountAction(registerData);

        if (!result.success) {
            toast.error("Registration failed", {
                description: result.message,
            });
            return;
        }

        if (result.success) {
            toast.success("Registration successful", {
                description: result.message,
            });

            router.push("/login");

            reset({
                fullName: values.fullName,
                email: values.email,
                password: "",
                confirmPassword: "",
            });

        }

    };

    const onGoogleSignUp = () => {
        toast.info("Google sign up clicked", {
            description: "Connect this action to your OAuth registration flow.",
        })
    }

    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-8 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
            <div className="pointer-events-none absolute top-24 -left-12 h-52 w-52 rounded-full bg-accent blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-secondary/70 blur-3xl" />

            <Card className="relative w-full max-w-lg overflow-hidden border-border/70 bg-card/70 shadow-[0_24px_70px_-25px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.24),rgba(255,255,255,0.05))] dark:bg-[linear-gradient(145deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/70 to-transparent" />

                <CardHeader className="relative space-y-3 pb-4 text-center">
                    <p className="mx-auto inline-flex items-center gap-1 rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary backdrop-blur">
                        <Sparkles className="size-3" />
                        Join Skill Barter
                    </p>
                    <CardTitle className="text-3xl font-semibold tracking-tight text-foreground">Create Account</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Fill in your details to start your skill exchange journey.
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        <Field>
                            <FieldLabel htmlFor="fullName" className="text-foreground">Full Name</FieldLabel>
                            <div className="relative">
                                <UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="fullName"
                                    type="text"
                                    placeholder="Your full name"
                                    className="h-11 rounded-xl border-input bg-background/80 pl-9 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30"
                                    aria-invalid={Boolean(errors.fullName)}
                                    {...register("fullName")}
                                />
                            </div>
                            {errors.fullName ? (
                                <FieldError>{errors.fullName.message}</FieldError>
                            ) : null}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="email" className="text-foreground">Email</FieldLabel>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-11 rounded-xl border-input bg-background/80 pl-9 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30"
                                    aria-invalid={Boolean(errors.email)}
                                    {...register("email")}
                                />
                            </div>
                            {errors.email ? (
                                <FieldError>{errors.email.message}</FieldError>
                            ) : null}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="password" className="text-foreground">Password</FieldLabel>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="h-11 rounded-xl border-input bg-background/80 pl-9 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30"
                                    aria-invalid={Boolean(errors.password)}
                                    {...register("password")}
                                />
                            </div>
                            {errors.password ? (
                                <FieldError>{errors.password.message}</FieldError>
                            ) : (
                                <p className="text-xs text-muted-foreground">
                                    Use 8+ characters including uppercase, lowercase, and a special symbol.
                                </p>
                            )}
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="confirmPassword" className="text-foreground">Confirm Password</FieldLabel>
                            <div className="relative">
                                <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Re-enter your password"
                                    className="h-11 rounded-xl border-input bg-background/80 pl-9 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30"
                                    aria-invalid={Boolean(errors.confirmPassword)}
                                    {...register("confirmPassword")}
                                />
                            </div>
                            {errors.confirmPassword ? (
                                <FieldError>{errors.confirmPassword.message}</FieldError>
                            ) : null}
                        </Field>

                        <Button
                            type="submit"
                            className="h-11 w-full cursor-pointer rounded-xl"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Sign Up
                                    <ArrowRight className="size-4" />
                                </>
                            )}
                        </Button>

                        <div className="flex items-center gap-3">
                            <Separator />
                            <span className="text-xs font-medium text-muted-foreground">OR</span>
                            <Separator />
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 w-full cursor-pointer rounded-xl border-input bg-background/80 text-foreground transition hover:bg-muted"
                            onClick={onGoogleSignUp}
                        >
                            <GoogleLogo />
                            Continue with Google
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-foreground underline-offset-4 transition hover:text-primary hover:underline"
                            >
                                Log in
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

export default RegisterForm