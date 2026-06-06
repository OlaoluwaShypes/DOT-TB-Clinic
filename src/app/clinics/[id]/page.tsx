import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import {
  MapPin, Phone, Clock, Mail, CheckCircle, ArrowLeft,
  Navigation, MessageCircle, User, Calendar, Stethoscope
} from "lucide-react";
import { SEED_CLINICS } from "@/lib/seed-data";
import { getDirectionsUrl, getWhatsAppLink, getMapsEmbedUrl } from "@/lib/utils";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return SEED_CLINICS.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const clinic = SEED_CLINICS.find((c) => c.id === id);
  if (!clinic) return { title: "Clinic Not Found" };
  return {
    title: clinic.clinic_name,
    description: `Free TB testing and DOT treatment at ${clinic.clinic_name}, ${clinic.lga} LGA, Ogun State.`,
  };
}

export default async function ClinicDetailPage({ params }: Props) {
  const { id } = await params;
  const clinic = SEED_CLINICS.find((c) => c.id === id);
  if (!clinic) notFound();

  const mapEmbedUrl = getMapsEmbedUrl(clinic.latitude, clinic.longitude);
  const directionsUrl = getDirectionsUrl(clinic.latitude, clinic.longitude, clinic.clinic_name);
  const waLink = clinic.whatsapp_number
    ? getWhatsAppLink(clinic.whatsapp_number, `Hello, I need information about TB services at ${clinic.clinic_name}.`)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back nav */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/clinics"
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clinic Directory
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-14 h-14 rounded-2xl bg-blue-700 flex items-center justify-center shrink-0">
                  <Stethoscope className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h1 className="font-display text-2xl font-bold text-gray-900 leading-tight">
                    {clinic.clinic_name}
                  </h1>
                  <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    {clinic.lga} LGA, Ogun State
                  </div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-5">
                <span className="badge bg-green-100 text-green-800 border border-green-200">
                  <CheckCircle className="w-3 h-3" /> Free Treatment
                </span>
                <span className="badge bg-blue-100 text-blue-800 border border-blue-200">
                  DOT Centre
                </span>
                {clinic.genexpert_available && (
                  <span className="badge bg-teal-100 text-teal-800 border border-teal-200">
                    GeneXpert Available
                  </span>
                )}
                {clinic.hiv_tb_integrated && (
                  <span className="badge bg-purple-100 text-purple-800 border border-purple-200">
                    HIV/TB Integrated
                  </span>
                )}
                {clinic.pediatric_tb && (
                  <span className="badge bg-orange-100 text-orange-800 border border-orange-200">
                    Child Friendly
                  </span>
                )}
                {clinic.status === "active" && (
                  <span className="badge bg-emerald-100 text-emerald-800 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Active
                  </span>
                )}
              </div>

              {/* Contact details */}
              <div className="grid sm:grid-cols-2 gap-4">
                {clinic.phone && (
                  <a
                    href={`tel:${clinic.phone}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Phone</div>
                      <div className="text-sm font-semibold text-gray-800 group-hover:text-blue-700">
                        {clinic.phone}
                      </div>
                    </div>
                  </a>
                )}
                {clinic.opening_hours && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Opening Hours</div>
                      <div className="text-sm font-semibold text-gray-800">
                        {clinic.opening_hours}
                      </div>
                    </div>
                  </div>
                )}
                {clinic.contact_officer && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Contact Officer</div>
                      <div className="text-sm font-semibold text-gray-800">
                        {clinic.contact_officer}
                      </div>
                    </div>
                  </div>
                )}
                {clinic.drug_refill_days && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Drug Refill Days</div>
                      <div className="text-sm font-semibold text-gray-800">
                        {clinic.drug_refill_days}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Services */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6">
              <h2 className="font-display font-semibold text-gray-900 mb-4">
                Services Offered
              </h2>
              <div className="grid grid-cols-2 gap-2.5">
                {[
                  { label: "TB Screening", active: true },
                  { label: "DOT Treatment", active: true },
                  { label: "Free Medication", active: true },
                  { label: "GeneXpert Testing", active: clinic.genexpert_available },
                  { label: "HIV/TB Clinic", active: clinic.hiv_tb_integrated },
                  { label: "Pediatric TB Care", active: clinic.pediatric_tb },
                  ...(clinic.services?.map((s) => ({ label: s, active: true })) || []),
                ].map((service) => (
                  <div
                    key={service.label}
                    className={`flex items-center gap-2 p-2.5 rounded-lg text-sm ${
                      service.active
                        ? "bg-green-50 text-green-800"
                        : "bg-gray-50 text-gray-400"
                    }`}
                  >
                    <CheckCircle
                      className={`w-4 h-4 shrink-0 ${
                        service.active ? "text-green-600" : "text-gray-300"
                      }`}
                    />
                    {service.label}
                  </div>
                ))}
              </div>
            </div>

            {/* Map */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-gray-100 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span className="font-semibold text-gray-900 text-sm">Location</span>
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-3">{clinic.address}</p>
                <iframe
                  src={mapEmbedUrl}
                  className="w-full h-60 rounded-xl border border-gray-200"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map of ${clinic.clinic_name}`}
                />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Action buttons */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-3">
              <h3 className="font-display font-semibold text-gray-900 text-sm">
                Get to this Clinic
              </h3>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
              >
                <Navigation className="w-4 h-4" />
                Get Directions
              </a>
              {waLink && (
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Clinic
                </a>
              )}
              {clinic.phone && (
                <a
                  href={`tel:${clinic.phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 rounded-xl transition-colors text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Call Clinic
                </a>
              )}
            </div>

            {/* Info box */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
              <h3 className="font-display font-semibold text-blue-900 text-sm mb-2">
                What to bring
              </h3>
              <ul className="text-xs text-blue-800 space-y-1.5">
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  Government-issued ID (optional)
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  Previous TB test results (if any)
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  List of current medications
                </li>
                <li className="flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  Walk-in welcome — no appointment needed
                </li>
              </ul>
            </div>

            {/* Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Important:</strong> This directory provides facility
                information only. For medical emergencies, call your nearest
                hospital or 112.
              </p>
            </div>

            {/* LGA info */}
            <div className="bg-white border border-gray-100 rounded-2xl p-5">
              <p className="text-xs text-gray-500 mb-1">Local Government Area</p>
              <p className="font-semibold text-gray-800">{clinic.lga}</p>
              {clinic.ward && (
                <>
                  <p className="text-xs text-gray-500 mt-2 mb-1">Ward</p>
                  <p className="font-semibold text-gray-800">{clinic.ward}</p>
                </>
              )}
              {clinic.facility_location_type && (
                <>
                  <p className="text-xs text-gray-500 mt-2 mb-1">Area Type</p>
                  <p className="font-semibold text-gray-800">{clinic.facility_location_type}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
