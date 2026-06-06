import Link from "next/link";
import { MapPin, Clock, Phone, ChevronRight, Stethoscope } from "lucide-react";
import { Clinic } from "@/types";

interface Props {
  clinic: Clinic;
}

export function ClinicCard({ clinic }: Props) {
  return (
    <Link
      href={`/clinics/${clinic.id}`}
      className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group block"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
          <Stethoscope className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex flex-wrap gap-1.5 justify-end ml-2">
          {clinic.genexpert_available && (
            <span className="badge badge-teal bg-teal-50 text-teal-700 border border-teal-200">GeneXpert</span>
          )}
          {clinic.hiv_tb_integrated && (
            <span className="badge bg-purple-50 text-purple-700 border border-purple-200">HIV/TB</span>
          )}
          {clinic.pediatric_tb && (
            <span className="badge bg-orange-50 text-orange-700 border border-orange-200">Child Friendly</span>
          )}
        </div>
      </div>

      <h3 className="font-display font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-2 leading-tight">
        {clinic.clinic_name}
      </h3>

      <div className="mt-3 space-y-1.5">
        <div className="flex items-start gap-2 text-gray-500 text-sm">
          <MapPin className="w-3.5 h-3.5 mt-0.5 shrink-0 text-blue-400" />
          <span className="line-clamp-1">{clinic.address}</span>
        </div>
        {clinic.opening_hours && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Clock className="w-3.5 h-3.5 shrink-0 text-green-500" />
            <span>{clinic.opening_hours}</span>
          </div>
        )}
        {clinic.phone && (
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <Phone className="w-3.5 h-3.5 shrink-0 text-gray-400" />
            <span>{clinic.phone}</span>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="badge bg-green-50 text-green-700 border border-green-200">Free</span>
          <span className="badge bg-blue-50 text-blue-700 border border-blue-200">DOT Centre</span>
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}
