"use client"

import React, { useState } from "react"
import Link from "next/link"
import { ArrowRight, BriefcaseBusiness, Check, Eye, EyeOff, LockKeyhole, Mail, Sparkles, UserRound } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"

export type SignUpFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
  callbackUrl: string
}

type SignUpErrors = Partial<Record<"name" | "email" | "password" | "confirmPassword", string>>

const SignUpPage = () => {
  const [errors, setErrors] = useState<SignUpErrors>({})
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMsg(null)
    setSuccessMsg(null)

    const formData = new FormData(e.currentTarget)
    const data: SignUpFormData = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      password: String(formData.get("password") ?? ""),
      confirmPassword: String(formData.get("confirmPassword") ?? ""),
      callbackUrl: window.location.origin,
    }

    const nextErrors: SignUpErrors = {}
    if (!data.name) {
      nextErrors.name = "Please enter your full name."
    }
    if (!data.email) {
      nextErrors.email = "Please enter your email address."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      nextErrors.email = "Enter a valid email address."
    }
    if (!data.password) {
      nextErrors.password = "Please create a password."
    } else if (data.password.length < 8) {
      nextErrors.password = "Use at least 8 characters."
    }
    if (!data.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password."
    } else if (data.password !== data.confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match."
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    try {
      const { error } = await authClient.signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: data.callbackUrl,
      })

      if (error) {
        setErrorMsg(error.message || "Unable to create your account. Please try again.")
        return
      }

      setSuccessMsg("Your account is ready. You can now sign in to HireNest.")
    } catch {
      setErrorMsg("Unable to create your account. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="relative isolate flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden bg-muted/40 px-4 py-10 sm:px-6 lg:py-14">
      <div aria-hidden className="pointer-events-none absolute -top-32 right-1/4 size-80 rounded-full bg-primary/5 blur-3xl" />
      <div className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-background shadow-xl shadow-foreground/5 lg:min-h-[680px] lg:grid-cols-[0.95fr_1.05fr]">
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
              A FRESH START FOR YOUR CAREER
            </span>
            <h1 className="text-4xl leading-tight font-semibold tracking-tight xl:text-5xl">
              Find a place to grow.
            </h1>
            <p className="mt-5 text-base leading-7 text-slate-300">
              Create your free account and discover opportunities that fit your ambitions.
            </p>
            <ul className="mt-8 space-y-4 text-sm text-slate-200">
              <li className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-200"><Check className="size-3.5" /></span>
                Keep your job search organized
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-6 items-center justify-center rounded-full bg-cyan-300/15 text-cyan-200"><Check className="size-3.5" /></span>
                Find opportunities made for you
              </li>
            </ul>
          </div>
          <p className="relative text-xs text-slate-400">Your next chapter starts here.</p>
        </aside>

        <section className="flex items-center px-6 py-10 sm:px-10 lg:px-12 lg:py-12">
          <div className="mx-auto w-full max-w-md">
            <div className="mb-8 flex items-center gap-3 lg:hidden">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <BriefcaseBusiness className="size-5" />
              </span>
              <span className="font-semibold tracking-tight">HireNest</span>
            </div>
            <div className="mb-7">
              <p className="mb-2 text-sm font-medium text-primary">Get started for free</p>
              <h2 className="text-3xl font-semibold tracking-tight">Create your account</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A few details are all it takes to join HireNest.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              {errorMsg && (
                <div role="alert" className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div role="status" className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-700 dark:text-emerald-300">
                  {successMsg}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label htmlFor="name">Full name</Label>
                <div className="relative">
                  <UserRound aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Alex Morgan"
                    autoComplete="name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "name-error" : undefined}
                    className="h-11 pl-10"
                    onChange={() => {
                      setErrors((current) => ({ ...current, name: undefined }))
                      setErrorMsg(null)
                      setSuccessMsg(null)
                    }}
                  />
                </div>
                {errors.name && <p id="name-error" className="text-sm text-destructive">{errors.name}</p>}
              </div>

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
                      setSuccessMsg(null)
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
                    placeholder="At least 8 characters"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={errors.password ? "password-error" : undefined}
                    className="h-11 px-10"
                    onChange={() => {
                      setErrors((current) => ({ ...current, password: undefined }))
                      setErrorMsg(null)
                      setSuccessMsg(null)
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

              <div className="flex flex-col gap-2">
                <Label htmlFor="confirmPassword">Confirm password</Label>
                <div className="relative">
                  <LockKeyhole aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    required
                    minLength={8}
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                    className="h-11 px-10"
                    onChange={() => {
                      setErrors((current) => ({ ...current, confirmPassword: undefined }))
                      setErrorMsg(null)
                      setSuccessMsg(null)
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((visible) => !visible)}
                    aria-label={showConfirmPassword ? "Hide confirmed password" : "Show confirmed password"}
                    aria-pressed={showConfirmPassword}
                    className="absolute top-1/2 right-3 -translate-y-1/2 rounded-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                  >
                    {showConfirmPassword ? <EyeOff aria-hidden className="size-4" /> : <Eye aria-hidden className="size-4" />}
                  </button>
                </div>
                {errors.confirmPassword && <p id="confirm-password-error" className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              <Button type="submit" className="mt-1 h-11 w-full gap-2" disabled={loading}>
                {loading ? "Creating account..." : "Create account"}
                {!loading && <ArrowRight aria-hidden className="size-4" />}
              </Button>
              <p className="text-center text-xs leading-5 text-muted-foreground">
                By creating an account, you agree to keep your information accurate and secure.
              </p>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold text-foreground underline-offset-4 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default SignUpPage