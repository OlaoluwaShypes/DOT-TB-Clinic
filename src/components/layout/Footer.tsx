import Link from "next/link";
import { Activity, Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-display font-bold text-white text-lg leading-none block">
                  Ogun DOT Connect
                </span>
                <span className="text-xs text-blue-400 font-medium">
                  Free TB Services Directory
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Helping people across Ogun State quickly find and access free tuberculosis
              testing and treatment services.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: "/clinics", label: "Find a DOT Clinic" },
                { href: "/symptom-checker", label: "TB Symptom Checker" },
                { href: "/about", label: "About Tuberculosis" },
                { href: "/admin", label: "Admin Login" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partners */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Partners
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>Ogun State Ministry of Health</li>
              <li>NTBLCP</li>
              <li>World Health Organization</li>
              <li>Stop TB Partnership</li>
              <li>National Health Fellows Programme</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5 text-gray-400">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                Ogun State Ministry of Health, Oke-Mosan, Abeokuta, Ogun State
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <Phone className="w-4 h-4 shrink-0 text-blue-400" />
                +234 800 000 0000
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <Mail className="w-4 h-4 shrink-0 text-blue-400" />
                tb@ogunhealth.gov.ng
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Ogun DOT Connect. Built under the National Health Fellows
            Programme.
          </p>
          <p>
            TB is curable. Early diagnosis saves lives.{" "}
            <span className="text-green-400 font-semibold">Treatment is free.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
