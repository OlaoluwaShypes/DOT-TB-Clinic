"use client";

import { useState } from "react";
import Link from "next/link";
import { Activity, AlertTriangle, CheckCircle, MapPin, ChevronRight } from "lucide-react";

const SYMPTOMS = [
  { id: "cough", label: "Cough for more than 2 weeks", weight: 3 },
  { id: "weightloss", label: "Unexplained weight loss", weight: 2 },
  { id: "nightsweats", label: "Night sweats", weight: 2 },
  { id: "fever", label: "Prolonged fever", weight: 2 },
  { id: "bloodsputum", label: "Blood in sputum (coughing blood)", weight: 4 },
  { id: "contact", label: "Close contact with a known TB patient", weight: 3 },
  { id: "fatigue", label: "Persistent fatigue or tiredness", weight: 1 },
  { id: "chestpain", label: "Chest pain or difficulty breathing", weight: 2 },
];

export default function SymptomCheckerClient() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [result, setResult] = useState<null | "low" | "moderate" | "high">(null);
  const [submitted, setSubmitted] = useState(false);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    if (submitted) { setSubmitted(false); setResult(null); }
  }

  function assess() {
    const score = SYMPTOMS.filter((s) => selected.has(s.id)).reduce((acc, s) => acc + s.weight, 0);
    if (score >= 7) setResult("high");
    else if (score >= 3) setResult("moderate");
    else setResult("low");
    setSubmitted(true);
  }

  function reset() { setSelected(new Set()); setResult(null); setSubmitted(false); }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="hero-gradient text-white py-12">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">TB Symptom Checker</h1>
          <p className="text-blue-100">Quick, confidential, and takes less than 2 minutes. Not a medical diagnosis.</p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {!submitted ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8">
            <p className="text-sm text-gray-600 mb-6 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <strong>Instructions:</strong> Select all symptoms you have been experiencing recently.
            </p>
            <h2 className="font-display font-semibold text-gray-900 mb-4">Do you currently have:</h2>
            <div className="space-y-3 mb-8">
              {SYMPTOMS.map((s) => (
                <label key={s.id}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    selected.has(s.id) ? "bg-blue-50 border-blue-400 text-blue-900" : "bg-white border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}>
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
                    selected.has(s.id) ? "border-blue-600 bg-blue-600" : "border-gray-300"
                  }`}>
                    {selected.has(s.id) && (
                      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <input type="checkbox" checked={selected.has(s.id)} onChange={() => toggle(s.id)} className="sr-only" />
                  <span className="text-sm font-medium">{s.label}</span>
                </label>
              ))}
            </div>
            <button onClick={assess}
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors flex items-center justify-center gap-2">
              Check My Risk <ChevronRight className="w-5 h-5" />
            </button>
            <p className="text-xs text-gray-400 text-center mt-3">This tool does not provide a medical diagnosis.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {result === "high" && (
              <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-red-900 text-xl mb-1">High Risk — Please Seek Care Now</div>
                    <p className="text-red-800 text-sm leading-relaxed">
                      You may be at risk for Tuberculosis. Visit a DOT clinic as soon as possible for proper evaluation and testing.
                      <strong> This tool does not provide a diagnosis.</strong>
                    </p>
                  </div>
                </div>
                <div className="p-3 bg-red-100 rounded-xl text-xs text-red-700">
                  TB is curable with free treatment. The earlier you are diagnosed, the easier the treatment.
                </div>
              </div>
            )}
            {result === "moderate" && (
              <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-amber-900 text-xl mb-1">Moderate Risk — See a Clinic Soon</div>
                    <p className="text-amber-800 text-sm leading-relaxed">
                      Some symptoms may be consistent with TB. Visit a DOT clinic for screening, especially if symptoms persist.
                      <strong> This tool does not provide a diagnosis.</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
            {result === "low" && (
              <div className="bg-green-50 border-2 border-green-300 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-green-900 text-xl mb-1">Low Risk</div>
                    <p className="text-green-800 text-sm leading-relaxed">
                      Your current TB risk appears low. If symptoms change or worsen, visit a DOT clinic.
                      <strong> This tool does not provide a diagnosis.</strong>
                    </p>
                  </div>
                </div>
              </div>
            )}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 space-y-3">
              <Link href="/clinics"
                className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-colors">
                <MapPin className="w-5 h-5" /> Find Nearest DOT Clinic
              </Link>
              <button onClick={reset} className="w-full py-3 text-sm text-gray-600 hover:text-gray-900 font-medium">
                ← Start Over
              </button>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="text-xs text-gray-500 leading-relaxed">
                <strong>Disclaimer:</strong> This symptom checker is for educational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
