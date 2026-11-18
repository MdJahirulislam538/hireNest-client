"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowRight, BriefcaseBusiness, Eye, EyeOff, LockKeyhole, Mail, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export type SignInFormData = {
  email: string
  password: string
  callbackUrl: string
}

type SignInErrors = Partial<Record<"email" | "password", string>>

const SignInPage = () => {
  const [errors, setErrors] = useState<SignInErrors>({})
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg(null)

    const formData = new FormData(e.currentTarget)
    const data: SignInFormData = {
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
      callbackUrl: window.location.origin,
    }

    const nextErrors: SignInErrors = {}
    if (!data.email) {
      nextErrors.email = "Please enter your email address."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Enter a valid email address."
    }
    if (!data.password) {
      nextErrors.password = "Please enter your password."
    } else if (data.password.length < 8) {
      nextErrors.password = "Your password must be at least 8 characters."
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    try {
      const { error } = await authClient.signIn.email({
        email: data.email,
        password: data.password,
        callbackURL: data.callbackUrl,
      })

      if (error) {
        setErrorMsg(error.message || "Unable to sign in. Please try again.")
      }
    } catch {
      setErrorMsg("Unable to sign in. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden bg-muted/40 px-4 py-10 sm:px-6 lg:py-14">
      <div aria-hidden className="pointer-events-none absolute -top-32 left-1/4 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-background shadow-xl shadow-foreground/5 lg:min-h-[620px] lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden flex-col justify-between overflow-hidden bg-slate-950 p-10 text-white lg:flex xl:p-12">
          <div aria-hidden className="absolute -right-20 -bottom-24 size-80 rounded-full bg-cyan-400/20 blur-3xl" />
          <div aria-hidden className="absolute top-20 -left-24 size-64 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/15">
              <BriefcaseBusiness className="size-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight">HireNest</span>
          </div>
          <div className="relative max-w-sm">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
              <Sparkles className="size-3.5 text-cyan-300" />
              YOUR NEXT OPPORTUNITY STARTS HERE
            </span>
            <h1 className="text-4xl leading-tight font-semibold tracking-tight xl:text-5xl">
              Make your next move count.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Sign in to pick up where you left off and move your career forward with HireNest.
            </p>
            <div className="mt-9 flex items-center gap-3 text-sm text-slate-300">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/10">
                <LockKeyhole className="size-4" />
              </span>
              Your account and applications, all in one place
            </div>
          </div>
          <p className="relative text-xs text-slate-400">A better way to find what&apos;s next.</p>
        </aside>

        <section className="flex items-center px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <BriefcaseBusiness className="size-5" />
              </span>
              <span className="font-semibold tracking-tight">HireNest</span>
            </div>
            <div className="mb-8">
              <p className="mb-2 text-sm font-medium text-primary">Welcome back</p>
              <h2 className="text-3xl font-semibold tracking-tight">Sign in to your account</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Enter your details below to continue your journey.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
              {errorMsg && (
                <div role="alert" className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errorMsg}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <Mail aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className="h-11 pl-10"
                    onChange={() => {
                      setErrors((current) => ({ ...current, email: undefined }))
                      setErrorMsg(null)
                    }}
                  />
                </div>
                {errors.email && <p id="email-error" className="text-sm text-destructive">{errors.email}</p>}
              </div>

              <div className="flex flex-col gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <LockKeyhole aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    minLength={8}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    className="h-11 px-10"
                    onChange={() => {
                      setErrors((current) => ({ ...current, password: undefined }))
                      setErrorMsg(null)
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {showPassword ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}
                  </button>
                </div>
                {errors.password && <p id="password-error" className="text-sm text-destructive">{errors.password}</p>}
              </div>

              <Button type="submit" className="mt-1 h-11 w-full gap-2" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
                {!loading && <ArrowRight aria-hidden className="size-4" />}
              </Button>
            </form>

            <p className="mt-7 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link href="/sign-up" className="font-semibold text-foreground underline-offset-4 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default SignInPage
