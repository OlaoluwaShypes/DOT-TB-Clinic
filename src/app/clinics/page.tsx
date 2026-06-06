import { Suspense } from "react";
import { Metadata } from "next";
import { SEED_CLINICS } from "@/lib/seed-data";
import { ClinicCard } from "@/components/clinic/ClinicCard";
import { ClinicFilters } from "@/components/clinic/ClinicFilters";
import { MapPin, Search } from "lucide-react";

export const metadata: Metadata = {
  title: "Find a DOT Clinic",
  description:
    "Search all free TB DOT clinics in Ogun State by LGA, town, or services offered.",
};

interface Props {
  searchParams: Promise<{ q?: string; lga?: string; genexpert?: string; pediatric?: string; hiv?: string }>;
}

export default async function ClinicsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { q, lga, genexpert, pediatric, hiv } = params;

  let clinics = SEED_CLINICS;

  if (q) {
    const lower = q.toLowerCase();
    clinics = clinics.filter(
      (c) =>
        c.clinic_name.toLowerCase().includes(lower) ||
        c.town.toLowerCase().includes(lower) ||
        c.address.toLowerCase().includes(lower)
    );
  }
  if (lga) clinics = clinics.filter((c) => c.lga.toLowerCase() === lga.toLowerCase());
  if (genexpert === "1") clinics = clinics.filter((c) => c.genexpert_available);
  if (pediatric === "1") clinics = clinics.filter((c) => c.pediatric_tb);
  if (hiv === "1") clinics = clinics.filter((c) => c.hiv_tb_integrated);

  const totalClinics = SEED_CLINICS.length;
  const lgas = [...new Set(SEED_CLINICS.map((c) => c.lga))].sort();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-blue-700 flex items-center justify-center">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-gray-900">
                DOT Clinic Directory
              </h1>
              <p className="text-gray-500 text-sm">
                {totalClinics} free TB treatment centres across Ogun State
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-64 shrink-0">
            <Suspense>
              <ClinicFilters lgas={lgas} />
            </Suspense>
          </aside>

          {/* Results */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-5">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-gray-900">{clinics.length}</span>{" "}
                {clinics.length === 1 ? "clinic" : "clinics"} found
                {(q || lga || genexpert || pediatric || hiv) && (
                  <span className="text-blue-600"> (filtered)</span>
                )}
              </p>
            </div>

            {clinics.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
                <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="font-display font-semibold text-gray-700 mb-2">
                  No clinics found
                </h3>
                <p className="text-sm text-gray-500">
                  Try adjusting your search or removing filters.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {clinics.map((clinic) => (
                  <ClinicCard key={clinic.id} clinic={clinic} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
