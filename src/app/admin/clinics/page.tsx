import { Metadata } from "next";
import Link from "next/link";
import { SEED_CLINICS } from "@/lib/seed-data";
import { Plus, ArrowLeft, Pencil, Eye } from "lucide-react";

export const metadata: Metadata = { title: "Manage Clinics – Admin" };

export default function AdminClinicsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-700 mb-2">
                <ArrowLeft className="w-4 h-4" /> Dashboard
              </Link>
              <h1 className="font-display text-2xl font-bold text-gray-900">Manage Clinics</h1>
            </div>
            <Link
              href="/admin/clinics/new"
              className="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors text-sm"
            >
              <Plus className="w-4 h-4" /> Add New Clinic
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs uppercase tracking-wider border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3.5 text-left">Clinic</th>
                  <th className="px-6 py-3.5 text-left">LGA / Ward</th>
                  <th className="px-6 py-3.5 text-left">Phone</th>
                  <th className="px-6 py-3.5 text-left">Services</th>
                  <th className="px-6 py-3.5 text-left">Status</th>
                  <th className="px-6 py-3.5 text-left">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {SEED_CLINICS.map((clinic) => (
                  <tr key={clinic.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{clinic.clinic_name}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{clinic.address.substring(0, 40)}…</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-700">{clinic.lga}</div>
                      {clinic.ward && <div className="text-xs text-gray-400">{clinic.ward}</div>}
                    </td>
                    <td className="px-6 py-4 text-gray-600">{clinic.phone || "—"}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {clinic.genexpert_available && <span className="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-full">GeneXpert</span>}
                        {clinic.hiv_tb_integrated && <span className="text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded-full">HIV/TB</span>}
                        {clinic.pediatric_tb && <span className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">Peds</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        clinic.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${clinic.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                        {clinic.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Link href={`/clinics/${clinic.id}`} className="flex items-center gap-1 text-xs text-gray-600 hover:text-blue-700">
                          <Eye className="w-3.5 h-3.5" /> View
                        </Link>
                        <Link href={`/admin/clinics/${clinic.id}/edit`} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-medium">
                          <Pencil className="w-3.5 h-3.5" /> Edit
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
