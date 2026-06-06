import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, AlertTriangle, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "About Tuberculosis (TB)",
  description: "Learn about tuberculosis — symptoms, causes, treatment, and prevention. TB is curable with free treatment available across Ogun State.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="hero-gradient text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            About Tuberculosis (TB)
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Everything you need to know about TB — from symptoms to cure.
            Knowledge saves lives.
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* What is TB */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-4">
            What is Tuberculosis?
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Tuberculosis (TB) is an infectious disease caused by the bacterium{" "}
            <em>Mycobacterium tuberculosis</em>. It is one of the leading
            infectious disease killers worldwide, but it is{" "}
            <strong>preventable and curable</strong>.
          </p>
          <p className="text-gray-600 leading-relaxed">
            TB primarily affects the lungs (pulmonary TB) but can also affect
            other parts of the body such as the lymph nodes, kidneys, spine, and
            brain (extra-pulmonary TB). It spreads through the air when an
            infected person coughs, sneezes, speaks, or sings.
          </p>
        </section>

        {/* Symptoms */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
            Symptoms of TB
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: "🫁", title: "Persistent Cough", desc: "A cough lasting more than 2 weeks is the most common symptom of pulmonary TB." },
              { icon: "🩸", title: "Coughing Blood", desc: "Blood-stained sputum (haemoptysis) is a serious sign that requires immediate medical attention." },
              { icon: "🌡️", title: "Fever", desc: "A low-grade fever, especially in the afternoons and evenings, is a hallmark of TB." },
              { icon: "🌙", title: "Night Sweats", desc: "Drenching night sweats that soak your clothes are a classic TB symptom." },
              { icon: "⚖️", title: "Unexplained Weight Loss", desc: "Significant weight loss without dieting can indicate active TB infection." },
              { icon: "😮‍💨", title: "Fatigue", desc: "Feeling very tired or weak, even after resting, may be a sign of TB." },
            ].map((s) => (
              <div key={s.title} className="bg-red-50 border border-red-100 rounded-2xl p-5">
                <div className="text-3xl mb-3">{s.icon}</div>
                <h3 className="font-display font-semibold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800">
              If you experience any of these symptoms for more than 2 weeks,
              please visit a DOT clinic immediately. Early diagnosis is key to a
              faster, easier recovery.
            </p>
          </div>
        </section>

        {/* Treatment */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
            TB Treatment in Nigeria
          </h2>
          <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-7 h-7 text-green-600" />
              <h3 className="font-display font-bold text-green-900 text-lg">
                TB Treatment is 100% Free
              </h3>
            </div>
            <p className="text-green-800 leading-relaxed">
              Under Nigeria's National TB, Leprosy and Buruli Ulcer Control
              Programme (NTBLCP), all TB medications are provided free of charge
              at government-approved DOT clinics across Ogun State.
            </p>
          </div>
          <div className="space-y-4 text-gray-600">
            <p className="leading-relaxed">
              Standard TB treatment follows the{" "}
              <strong className="text-gray-800">DOTS (Directly Observed Treatment, Short-course)</strong>{" "}
              strategy. Treatment lasts 6 months and involves two phases:
            </p>
            <ul className="space-y-2 pl-4">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold shrink-0">1.</span>
                <span>
                  <strong>Intensive Phase (2 months):</strong> Four antibiotics
                  (Isoniazid, Rifampicin, Pyrazinamide, Ethambutol) taken daily.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold shrink-0">2.</span>
                <span>
                  <strong>Continuation Phase (4 months):</strong> Two antibiotics
                  (Isoniazid and Rifampicin) taken daily.
                </span>
              </li>
            </ul>
            <p className="leading-relaxed">
              A health worker will watch you take your medication each day (DOT —
              Directly Observed Therapy). This ensures you complete treatment
              correctly and reduces the risk of developing drug-resistant TB.
            </p>
          </div>
        </section>

        {/* Prevention */}
        <section>
          <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
            Preventing TB
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "BCG Vaccine", desc: "Infants should receive the BCG vaccine at birth to protect against severe TB." },
              { title: "Ventilation", desc: "Open windows and doors to improve air circulation in homes and workplaces." },
              { title: "Cover Coughs", desc: "Cover your mouth and nose when coughing or sneezing." },
              { title: "Test Close Contacts", desc: "If someone at home has TB, all household members should be tested." },
              { title: "Complete Treatment", desc: "If diagnosed with TB, complete your full 6-month course of treatment." },
              { title: "Early Testing", desc: "Get tested early if you have symptoms — don't wait." },
            ].map((p) => (
              <div key={p.title} className="flex gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{p.title}</div>
                  <div className="text-xs text-gray-600 mt-0.5">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-br from-blue-700 to-teal-600 rounded-2xl p-8 text-white text-center">
          <h2 className="font-display text-2xl font-bold mb-3">
            Ready to Get Tested?
          </h2>
          <p className="text-blue-100 mb-6">
            Find a free DOT clinic near you in Ogun State. No appointment needed.
          </p>
          <Link
            href="/clinics"
            className="inline-flex items-center gap-2 bg-white text-blue-800 font-bold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors"
          >
            <MapPin className="w-5 h-5" />
            Find Nearest DOT Clinic
          </Link>
        </section>
      </div>
    </div>
  );
}
