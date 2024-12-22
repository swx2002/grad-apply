'use client';
import Link from 'next/link';
import LoginForm from '../ui/login-button';
import { useState } from 'react';
import { handleLogin } from '../services/auth-service';
export default function LoginPage() {
    const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4 border-2 border-black">
      
      {/* Login Form */}
      <div className="w-full max-w-md p-6 rounded-2xl border border-gray-400">
        <h1 className="text-2xl text-center mb-8 text-black font-semibold">Log in</h1>
        
        <form className = "space-y-6" action={async (formData: FormData) => {
                setIsLoading(true);
                console.log(isLoading);
                await handleLogin(formData);
                console.log(isLoading);
              }}>
        {/* Name Input
        <div>
            <label className="block text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name" 
              name="name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div> */}
          {/* Email Input */}
          <div>
            <label className="block text-gray-600 mb-2">
              Email or mobile phone number
            </label>
            <input
              type="email"
              id="email" 
              name="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-600">Your password</label>
              <button type="button" className="text-gray-600">
                Hide
              </button>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          {/* Login Button */}
          <button disabled = {isLoading} className="w-full py-3 bg-gray-300 text-white rounded-full hover:bg-gray-400 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed">
          Log in
        </button>

          {/* Terms */}
          <p className="text-sm text-center text-gray-600">
            By continuing, you agree to the{' '}
            <Link href="/terms" className="underline">
              Terms of use
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>

          {/* Help Links */}
          <div className="flex justify-between text-sm">
            <Link href="/help" className="text-gray-900 underline">
              Other issue with sign in
            </Link>
            <Link href="/forgot-password" className="text-gray-900 underline">
              Forget your password
            </Link>
          </div>
        </form>

        {/* Divider */}
        <div className="mt-12 mb-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500">
                New to our community
              </span>
            </div>
          </div>
        </div>

        {/* Create Account Button */}
        <Link
          href="/signup"
          className="block w-full py-3 text-center border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
        >
          Create an account
        </Link>
      </div>
    </div>
  );
}