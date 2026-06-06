import { Metadata } from "next";
import Link from "next/link";
import { SEED_CLINICS } from "@/lib/seed-data";
import {
  Building2, MapPin, Search, BarChart3, Plus,
  CheckCircle, Activity, Users, Eye
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminDashboardPage() {
  const total = SEED_CLINICS.length;
  const active = SEED_CLINICS.filter((c) => c.status === "active").length;
  const genexpert = SEED_CLINICS.filter((c) => c.genexpert_available).length;
  const lgas = new Set(SEED_CLINICS.map((c) => c.lga)).size;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display text-2xl font-bold text-gray-900">
                Admin Dashboard
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Ogun DOT Connect — Programme Management
              </p>
            </div>
            <Link
              href="/admin/clinics/new"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              <Plus className="w-4 h-4" />
              Add Clinic
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Clinics", value: total, icon: <Building2 className="w-5 h-5" />, color: "text-blue-600 bg-blue-50" },
            { label: "Active Clinics", value: active, icon: <CheckCircle className="w-5 h-5" />, color: "text-green-600 bg-green-50" },
            { label: "LGAs Covered", value: lgas, icon: <MapPin className="w-5 h-5" />, color: "text-purple-600 bg-purple-50" },
            { label: "GeneXpert Sites", value: genexpert, icon: <Activity className="w-5 h-5" />, color: "text-teal-600 bg-teal-50" },
          ].map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-2xl p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center mb-3`}>
                {stat.icon}
              </div>
              <div className="font-display font-bold text-2xl text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          {[
            { href: "/admin/clinics", icon: <Building2 className="w-5 h-5" />, label: "Manage Clinics", desc: "Add, edit, or disable clinics", color: "bg-blue-600" },
            { href: "/clinics", icon: <Eye className="w-5 h-5" />, label: "View Public Site", desc: "See how the directory looks", color: "bg-gray-700" },
            { href: "/admin/analytics", icon: <BarChart3 className="w-5 h-5" />, label: "Analytics", desc: "Search and referral stats", color: "bg-purple-600" },
          ].map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-md hover:border-blue-200 transition-all group flex items-center gap-4"
            >
              <div className={`w-10 h-10 rounded-xl ${action.color} text-white flex items-center justify-center shrink-0`}>
                {action.icon}
              </div>
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                  {action.label}
                </div>
                <div className="text-xs text-gray-500">{action.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Clinics table */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-display font-semibold text-gray-900">All Clinics</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 w-48"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3 text-left">Clinic Name</th>
                  <th className="px-6 py-3 text-left">LGA</th>
                  <th className="px-6 py-3 text-left">Services</th>
                  <th className="px-6 py-3 text-left">Status</th>
                  <th className="px-6 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SEED_CLINICS.map((clinic) => (
                  <tr key={clinic.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{clinic.clinic_name}</div>
                      <div className="text-xs text-gray-500">{clinic.ward}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{clinic.lga}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {clinic.genexpert_available && (
                          <span className="badge bg-teal-50 text-teal-700 text-xs px-2 py-0.5 rounded-full">GX</span>
                        )}
                        {clinic.hiv_tb_integrated && (
                          <span className="badge bg-purple-50 text-purple-700 text-xs px-2 py-0.5 rounded-full">HIV/TB</span>
                        )}
                        {clinic.pediatric_tb && (
                          <span className="badge bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full">Peds</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        clinic.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${clinic.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                        {clinic.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/clinics/${clinic.id}`}
                          className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                        >
                          View
                        </Link>
                        <Link
                          href={`/admin/clinics/${clinic.id}/edit`}
                          className="text-xs text-gray-600 hover:text-gray-800 font-medium"
                        >
                          Edit
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
