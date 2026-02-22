"use client";

import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

function FullScreenClerkLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#17a2b8]">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 rounded-full border-2 border-white/40 border-t-white animate-spin" />
        <p className="text-sm text-white/80">Loading sign in…</p>
      </div>
    </div>
  );
}
export default function SignInPage() {
  return (
    <>
    
    {/* Show this until Clerk is fully ready */}
    <ClerkLoading>
        <FullScreenClerkLoader />
      </ClerkLoading>

    <ClerkLoaded>

    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1e3a5f] via-[#2a4a6f] to-[#17a2b8]">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(23,162,184,0.1),transparent_50%)]" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px]" />

      {/* Floating orbs */}
      <div className="absolute top-20 left-10 h-64 w-64 rounded-full bg-[#17a2b8] opacity-20 blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-[#17a2b8] opacity-10 blur-3xl animate-pulse [animation-delay:2s]" />

      <div className="relative flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
              <Image 
                src="/Logo.png" 
                alt="DineSmart Logo" 
                width={48}
                height={48}
                className="object-contain"
              />
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight text-white mb-2">
              Register with DineSmart
            </h1>
          </div>

          {/* Sign in card - centered */}
          <div className="flex justify-center">
            <SignUp
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-2xl",
                  
                  headerTitle: "text-[#1e3a5f] text-2xl font-bold",
                  headerSubtitle: "text-gray-600",
                  
                  socialButtonsBlockButton: 
                    "bg-white border-2 border-gray-200 hover:border-[#17a2b8] hover:bg-gray-50 text-gray-700 font-medium transition-all duration-200",
                  socialButtonsBlockButtonText: "font-medium",
                  
                  formButtonPrimary: 
                    "bg-gradient-to-r from-[#17a2b8] to-[#1e3a5f] hover:from-[#1e3a5f] hover:to-[#17a2b8] text-white font-semibold shadow-lg shadow-[#17a2b8]/30 hover:shadow-xl hover:shadow-[#17a2b8]/40 transition-all duration-300 normal-case",
                  
                  formFieldLabel: "text-gray-700 font-medium text-sm",
                  formFieldInput: 
                    "border-gray-300 focus:border-[#17a2b8] focus:ring-2 focus:ring-[#17a2b8]/20 rounded-lg transition-all duration-200",
                  
                  footerActionLink: "text-[#17a2b8] hover:text-[#1e3a5f] font-semibold",
                  
                  identityPreviewText: "text-gray-700 font-medium",
                  identityPreviewEditButton: "text-[#17a2b8] hover:text-[#1e3a5f]",
                  
                  formFieldInputShowPasswordButton: "text-gray-500 hover:text-[#17a2b8]",
                  
                  dividerLine: "bg-gray-200",
                  dividerText: "text-gray-500 font-medium text-xs uppercase tracking-wide",
                  
                  formFieldAction: "text-[#17a2b8] hover:text-[#1e3a5f] font-medium",
                  
                  formFieldSuccessText: "text-emerald-600",
                  formFieldErrorText: "text-red-600",
                  
                  formFieldHintText: "text-gray-500 text-xs",
                  
                  alertText: "text-sm",
                  
                  formResendCodeLink: "text-[#17a2b8] hover:text-[#1e3a5f] font-medium",
                  
                  otpCodeFieldInput: 
                    "border-gray-300 focus:border-[#17a2b8] focus:ring-2 focus:ring-[#17a2b8]/20",
                },
              }}
            />
          </div>

          {/* Footer links */}
          <div className="mt-6 text-center">            
            <div className="mt-4 flex items-center justify-center gap-6 text-sm">
              <Link 
                href="/" 
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                ← Back to home
              </Link>
              
              <Link 
                href="/help" 
                className="text-white/70 hover:text-white transition-colors duration-200"
              >
                Need help?
              </Link>
            </div>
          </div>

          {/* Terms */}
          <div className="mt-8 text-center text-xs text-white/50">
            By signing in, you agree to our{" "}
            <Link href="/terms" className="text-white/70 hover:text-white underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-white/70 hover:text-white underline">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
    </ClerkLoaded>
    </>
  );
}