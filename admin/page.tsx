import { Metadata } from "next";
import Link from "next/link";
import { Activity, Lock } from "lucide-react";

export const metadata: Metadata = { title: "Admin Login" };

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-teal-800 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-teal-500 flex items-center justify-center mx-auto mb-4">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-gray-900">Ogun DOT Connect</h1>
          <p className="text-gray-500 text-sm mt-1">Admin Portal</p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl p-3 mb-6">
          <Lock className="w-4 h-4 text-blue-600 shrink-0" />
          <p className="text-xs text-blue-700">Secure admin access. Authorised personnel only.</p>
        </div>

        <form action="/admin/dashboard" method="get" className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              placeholder="admin@ogunhealth.gov.ng"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-colors"
          >
            Sign In to Dashboard
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-gray-100 text-center">
          <Link href="/" className="text-sm text-gray-500 hover:text-blue-700 transition-colors">
            ← Back to Public Site
          </Link>
        </div>
      </div>
    </div>
  );
}
