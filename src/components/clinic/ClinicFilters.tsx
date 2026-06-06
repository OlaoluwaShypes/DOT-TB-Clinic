"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";

interface Props {
  lgas: string[];
}

export function ClinicFilters({ lgas }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const current = {
    q: searchParams.get("q") || "",
    lga: searchParams.get("lga") || "",
    genexpert: searchParams.get("genexpert") || "",
    pediatric: searchParams.get("pediatric") || "",
    hiv: searchParams.get("hiv") || "",
  };

  const hasFilters = Object.values(current).some(Boolean);

  function update(key: string, value: string) {
    const p = new URLSearchParams(searchParams.toString());
    if (value) p.set(key, value);
    else p.delete(key);
    router.push(`/clinics?${p.toString()}`);
  }

  function clearAll() {
    router.push("/clinics");
  }

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 sticky top-20">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 font-display font-semibold text-gray-900">
          <SlidersHorizontal className="w-4 h-4 text-blue-600" />
          Filters
        </div>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-red-500 hover:text-red-700 flex items-center gap-1"
          >
            <X className="w-3 h-3" /> Clear all
          </button>
        )}
      </div>

      <div className="space-y-5">
        {/* Search */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Clinic name or town..."
            defaultValue={current.q}
            onChange={(e) => update("q", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* LGA */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">
            LGA
          </label>
          <select
            value={current.lga}
            onChange={(e) => update("lga", e.target.value)}
            className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">All LGAs</option>
            {lgas.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </div>

        {/* Service checkboxes */}
        <div>
          <label className="block text-xs font-semibold text-gray-600 uppercase tracking-wider mb-3">
            Services
          </label>
          <div className="space-y-2.5">
            {[
              { key: "genexpert", label: "GeneXpert Available" },
              { key: "pediatric", label: "Pediatric TB Services" },
              { key: "hiv", label: "HIV/TB Integrated" },
            ].map((f) => (
              <label key={f.key} className="flex items-center gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={!!current[f.key as keyof typeof current]}
                  onChange={(e) => update(f.key, e.target.checked ? "1" : "")}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                />
                <span className="text-sm text-gray-700 group-hover:text-gray-900">
                  {f.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-blue-50 rounded-xl p-3">
          <p className="text-xs text-blue-700 leading-relaxed">
            All listed clinics offer{" "}
            <strong>free TB testing and treatment</strong> under the NTBLCP
            programme.
          </p>
        </div>
      </div>
    </div>
  );
}
