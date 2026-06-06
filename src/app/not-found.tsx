import Link from "next/link";
import { MapPin } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="text-8xl font-display font-bold text-blue-100 mb-4">404</div>
        <h1 className="font-display text-2xl font-bold text-gray-900 mb-3">Page Not Found</h1>
        <p className="text-gray-500 mb-8">
          The page you are looking for does not exist. Try searching for a DOT clinic below.
        </p>
        <Link
          href="/clinics"
          className="inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-800 transition-colors"
        >
          <MapPin className="w-5 h-5" />
          Find a DOT Clinic
        </Link>
      </div>
    </div>
  );
}
