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
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_#d9ecff,_#f7fbff_32%,_#f7f8fa_72%)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-300/35 blur-3xl" />
            <div className="pointer-events-none absolute top-24 -left-12 h-52 w-52 rounded-full bg-blue-200/45 blur-3xl" />
            <div className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-indigo-200/40 blur-3xl" />

            <Card className="relative w-full max-w-md overflow-hidden border-white/60 bg-white/45 shadow-[0_24px_70px_-25px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.55),rgba(255,255,255,0.14))]" />
                <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/85 to-transparent" />

                <CardHeader className="relative space-y-3 pb-4 text-center">
                    <p className="mx-auto inline-flex items-center gap-1 rounded-full border border-cyan-200/80 bg-cyan-50/80 px-3 py-1 text-xs font-medium text-cyan-700 backdrop-blur">
                        <Sparkles className="size-3" />
                        Secure Login
                    </p>
                    <CardTitle className="text-3xl font-semibold tracking-tight text-slate-900">Welcome Back</CardTitle>
                    <CardDescription className="text-slate-600">
                        Enter your credentials to continue your skill exchange journey.
                    </CardDescription>
                </CardHeader>

                <CardContent className="relative">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                        <Field>
                            <FieldLabel htmlFor="email" className="text-slate-700">Email</FieldLabel>
                            <div className="relative">
                                <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="you@example.com"
                                    className="h-11 rounded-xl border-white/65 bg-white/75 pl-9 text-slate-900 placeholder:text-slate-400 focus-visible:border-cyan-400 focus-visible:ring-cyan-100"
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
                                <FieldLabel htmlFor="password" className="text-slate-700">Password</FieldLabel>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-medium text-slate-500 transition-colors hover:text-slate-900 hover:underline"
                                >
                                    Forgot password ?
                                </Link>
                            </div>
                            <FieldContent>
                                <div className="relative">
                                    <Lock className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        className="h-11 rounded-xl border-white/65 bg-white/75 pl-9 text-slate-900 placeholder:text-slate-400 focus-visible:border-cyan-400 focus-visible:ring-cyan-100"
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
                            className="h-11 w-full cursor-pointer rounded-xl bg-slate-900 text-white transition hover:bg-slate-800"
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
                            <span className="text-xs font-medium text-slate-500">OR</span>
                            <Separator />
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            className="h-11 w-full rounded-xl border-black/70 bg-white/70 text-slate-800 hover:bg-white cursor-pointer transition hover:border-slate-900 hover:text-slate-900"
                            onClick={onGoogleLogin}
                        >
                            <GoogleLogo />
                            Continue with Google
                        </Button>

                        <p className="text-center text-sm text-slate-600">
                            Don&apos;t have an account?{" "}
                            <Link
                                href="/sign-up"
                                className="font-semibold text-slate-900 underline-offset-4 transition hover:underline"
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
