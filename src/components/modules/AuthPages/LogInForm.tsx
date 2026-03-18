"use client"

import Link from "next/link"
import { ArrowRight, Loader2, Lock, Mail, Sparkles } from "lucide-react"
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
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import GoogleLogo from "@/assets/logoComponent/GoogleLogo"

const logInSchema = z.object({
    email: z.email("Please enter a valid email address."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long."),
})

type LogInSchema = z.infer<typeof logInSchema>

const LogInForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LogInSchema>({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const onSubmit = async (values: LogInSchema) => {
        await new Promise((resolve) => setTimeout(resolve, 700))

        toast.success("Login request submitted", {
            description: `Welcome back, ${values.email}.`,
        })
    }

    const onGoogleLogin = () => {
        toast.info("Google login clicked", {
            description: "Connect this action to your OAuth flow.",
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
                        Secure Login
                    </p>
                    <CardTitle className="text-3xl font-semibold tracking-tight text-foreground">Welcome Back</CardTitle>
                    <CardDescription className="text-muted-foreground">
                        Enter your credentials to continue your skill exchange journey.
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                        <Field>
                            <FieldLabel htmlFor="email" className="text-foreground">Email</FieldLabel>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
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
                            <div className="flex items-center justify-between gap-2">
                                <FieldLabel htmlFor="password" className="text-foreground">Password</FieldLabel>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
                                >
                                    Forgot password ?
                                </Link>
                            </div>
                            <FieldContent>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="h-11 rounded-xl border-input bg-background/80 pl-9 text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/30"
                                        aria-invalid={Boolean(errors.password)}
                                        {...register("password")}
                                    />
                                </div>
                            </FieldContent>
                            {errors.password ? (
                                <FieldError>{errors.password.message}</FieldError>
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
                                    Logging in...
                                </>
                            ) : (
                                <>
                                    Log In
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
                            onClick={onGoogleLogin}
                        >
                            <GoogleLogo />
                            Continue with Google
                        </Button>

                        <p className="text-center text-sm text-muted-foreground">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="font-semibold text-foreground underline-offset-4 transition hover:text-primary hover:underline"
                            >
                                Sign up
                            </Link>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
}

export default LogInForm
