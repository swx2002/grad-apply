import Link from "next/link";

export default function RegisterPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {/* Top Links */}
      <div className="fixed top-4 right-4 text-sm">
        <span className="text-gray-600">Already have an account? </span>
        <Link href="/login" className="text-black underline">Log in</Link>
        <div className="mt-1 text-gray-600">
          <Link href="/forgot-credentials" className="hover:underline">
            Forget your user ID or password?
          </Link>
        </div>
      </div>

      {/* Registration Form */}
      <div className="w-full max-w-lg p-6 rounded-2xl border border-gray-400">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Create an account</h1>
        <p className="text-gray-600 text-center mb-8">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lobortis maximus
        </p>

        <form className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-gray-600 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-6 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              {/* <div className="absolute right-0 top-0 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg mt-2 mr-2">
                We will use your email as your user ID.
              </div> */}
            </div>
          </div>

          {/* Phone Input
          <div>
            <label className="block text-gray-600 mb-2">Phone</label>
            <input
              type="tel"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <p className="text-sm text-gray-500 mt-1">
              We strongly recommend adding a phone number. This will help verify your account and keep it safe.
            </p>
          </div> */}

          {/* Password Input */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-gray-600">Password</label>
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
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span>Use 8 or more characters</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span>Use upper and lower case letters (e.g. Aa)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span>Use a number (e.g. 1234)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                <span>Use a symbol (e.g. !@#$)</span>
              </div>
            </div>
          </div>

          {/* Sign in Button */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
          >
            Sign in
          </button>

          {/* Terms */}
          <p className="text-sm text-center text-gray-600">
            By creating an account, you agree to the{' '}
            <Link href="/terms" className="underline">
              Terms of use
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline">
              Privacy Policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
    )
}