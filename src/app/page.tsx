import Link from "next/link";
import {
  Search,
  MapPin,
  CheckCircle,
  AlertTriangle,
  ChevronDown,
  Activity,
  Users,
  Clock,
  Shield,
  Pill,
  Stethoscope,
} from "lucide-react";
import { SEED_CLINICS } from "@/lib/seed-data";

export default function HomePage() {
  const totalClinics = SEED_CLINICS.length;
  const genexpertCount = SEED_CLINICS.filter((c) => c.genexpert_available).length;
  const lgaCount = new Set(SEED_CLINICS.map((c) => c.lga)).size;

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative overflow-hidden hero-gradient text-white">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Partner logos bar */}
        <div className="relative border-b border-white/10 bg-white/5">
          <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-white/70 tracking-wide uppercase">
            <span>Ogun State Ministry of Health</span>
            <span className="hidden sm:block text-white/30">|</span>
            <span>NTBLCP</span>
            <span className="hidden sm:block text-white/30">|</span>
            <span>World Health Organization</span>
            <span className="hidden sm:block text-white/30">|</span>
            <span>Stop TB Partnership</span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Free TB Treatment Available Now
            </div>

            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Free Tuberculosis Testing &amp; Treatment in{" "}
              <span className="text-teal-300">Ogun State</span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100 mb-10 leading-relaxed max-w-2xl">
              Find the nearest DOT clinic and begin treatment early. TB is
              curable. Early diagnosis saves lives — and all services are{" "}
              <strong className="text-white">completely free</strong>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/clinics"
                className="inline-flex items-center justify-center gap-2 bg-white text-blue-800 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl text-base shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                <MapPin className="w-5 h-5" />
                Find a DOT Clinic
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl text-base transition-all duration-200"
              >
                Learn About TB
                <ChevronDown className="w-4 h-4" />
              </Link>
            </div>

            {/* Quick stats */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-md">
              {[
                { value: `${totalClinics}+`, label: "DOT Clinics" },
                { value: `${lgaCount}`, label: "LGAs Covered" },
                { value: "100%", label: "Free Treatment" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display font-bold text-2xl text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-blue-200 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── QUICK SEARCH ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
          <h2 className="font-display font-bold text-xl text-gray-900 mb-4">
            Find a DOT Clinic Near You
          </h2>
          <form action="/clinics" method="get" className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="q"
                placeholder="Search by clinic name or town..."
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </div>
            <select
              name="lga"
              className="px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white min-w-[180px]"
            >
              <option value="">All LGAs</option>
              <option value="Sagamu">Sagamu</option>
              <option value="Abeokuta North">Abeokuta North</option>
              <option value="Abeokuta South">Abeokuta South</option>
              <option value="Ijebu Ode">Ijebu Ode</option>
              <option value="Ado-Odo/Ota">Ado-Odo/Ota</option>
            </select>
            <button
              type="submit"
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-sm"
            >
              Search Clinics
            </button>
          </form>
        </div>
      </section>

      {/* ── WHAT IS TB ── */}
      <section id="about-tb" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              What You Need to Know
            </span>
            <h2 className="section-title mt-2 mb-4">What is Tuberculosis (TB)?</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Tuberculosis (TB) is an infectious disease caused by the bacterium{" "}
              <em>Mycobacterium tuberculosis</em>. It primarily affects the lungs
              but can spread to other organs. TB spreads through the air when an
              infected person coughs, sneezes, or speaks.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              TB is <strong className="text-gray-800">curable</strong> with proper
              treatment. In Nigeria, all TB treatment is provided free of charge
              through government-supported DOT clinics.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition-colors"
            >
              Learn more about TB treatment →
            </Link>
          </div>

          {/* Symptoms grid */}
          <div>
            <h3 className="font-display font-semibold text-gray-800 mb-5 text-lg">
              Common Symptoms of TB
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { icon: "🫁", label: "Persistent cough", sub: "2+ weeks" },
                { icon: "🌡️", label: "Fever", sub: "Low-grade, prolonged" },
                { icon: "💧", label: "Night sweats", sub: "Drenching sweats" },
                { icon: "⚖️", label: "Weight loss", sub: "Unexplained" },
                { icon: "🩸", label: "Blood in sputum", sub: "Coughing blood" },
                { icon: "😮‍💨", label: "Chest pain", sub: "Breathing difficulty" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-red-50 border border-red-100 rounded-xl p-3.5 flex items-start gap-3"
                >
                  <span className="text-2xl">{s.icon}</span>
                  <div>
                    <div className="font-semibold text-gray-800 text-sm">
                      {s.label}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-sm text-amber-800">
                If you have any of these symptoms, <strong>visit a DOT clinic immediately</strong>.
                Early treatment prevents spread to family members.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── IS TB CURABLE ── */}
      <section className="bg-gradient-to-br from-blue-700 to-teal-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-300" />
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Yes — TB is Curable!
          </h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto mb-10">
            With the right medication taken consistently for 6 months, TB can be
            completely cured. The Directly Observed Therapy (DOT) programme
            ensures patients complete treatment successfully — at no cost.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: <Pill className="w-6 h-6" />, text: "Free medication" },
              { icon: <Clock className="w-6 h-6" />, text: "6-month treatment" },
              { icon: <Shield className="w-6 h-6" />, text: "95% cure rate" },
              { icon: <Users className="w-6 h-6" />, text: "DOT support" },
            ].map((item) => (
              <div
                key={item.text}
                className="bg-white/10 rounded-xl p-4 flex flex-col items-center gap-2"
              >
                <div className="text-green-300">{item.icon}</div>
                <span className="text-sm font-medium text-white">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TREATMENT PROCESS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            How it Works
          </span>
          <h2 className="section-title mt-2">The TB Treatment Journey</h2>
          <p className="section-subtitle mx-auto text-center">
            From first symptoms to complete cure — here is what to expect.
          </p>
        </div>

        <div className="relative">
          <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-3/4 h-0.5 bg-blue-100" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Notice Symptoms",
                desc: "Persistent cough, fever, weight loss, night sweats lasting 2+ weeks.",
                color: "bg-red-50 border-red-200",
                num: "bg-red-500",
              },
              {
                step: "02",
                title: "Visit a DOT Clinic",
                desc: "Go to your nearest free DOT clinic. No referral letter needed.",
                color: "bg-orange-50 border-orange-200",
                num: "bg-orange-500",
              },
              {
                step: "03",
                title: "Get Tested",
                desc: "Sputum test or GeneXpert test to confirm TB diagnosis. Results within hours.",
                color: "bg-yellow-50 border-yellow-200",
                num: "bg-yellow-500",
              },
              {
                step: "04",
                title: "Start Treatment",
                desc: "Free medication provided. A health worker observes you take each dose.",
                color: "bg-blue-50 border-blue-200",
                num: "bg-blue-500",
              },
              {
                step: "05",
                title: "Complete Cure",
                desc: "After 6 months of consistent treatment, TB is completely cured.",
                color: "bg-green-50 border-green-200",
                num: "bg-green-500",
              },
            ].map((step) => (
              <div
                key={step.step}
                className={`border rounded-2xl p-5 ${step.color} relative`}
              >
                <div
                  className={`w-8 h-8 ${step.num} text-white rounded-full flex items-center justify-center text-sm font-bold mb-3`}
                >
                  {step.step}
                </div>
                <h3 className="font-display font-semibold text-gray-900 mb-2 text-sm">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY EARLY DIAGNOSIS ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Why It Matters
              </span>
              <h2 className="section-title mt-2 mb-6">
                Why Early Diagnosis Matters
              </h2>
              <div className="space-y-4">
                {[
                  {
                    icon: <Activity className="w-5 h-5 text-green-600" />,
                    title: "Faster recovery",
                    desc: "Early treatment means a shorter, easier path to full recovery.",
                  },
                  {
                    icon: <Users className="w-5 h-5 text-blue-600" />,
                    title: "Protect your family",
                    desc: "Untreated TB spreads to people you live with. Early treatment stops the chain.",
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-purple-600" />,
                    title: "Prevent drug resistance",
                    desc: "Starting early reduces the risk of developing drug-resistant TB, which is harder to treat.",
                  },
                  {
                    icon: <Stethoscope className="w-5 h-5 text-red-600" />,
                    title: "Avoid serious complications",
                    desc: "Late TB can damage lungs permanently. Early diagnosis prevents this.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center shrink-0 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-0.5">{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
              <h3 className="font-display font-bold text-xl text-gray-900 mb-6">
                Check Your Symptoms Now
              </h3>
              <p className="text-gray-600 text-sm mb-6">
                Use our quick symptom checker to assess your TB risk. Takes less
                than 2 minutes. Completely confidential.
              </p>
              <Link
                href="/symptom-checker"
                className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3.5 rounded-xl transition-colors"
              >
                <Activity className="w-5 h-5" />
                Take the Symptom Checker
              </Link>
              <p className="text-xs text-gray-400 text-center mt-3">
                This tool does not provide a medical diagnosis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED CLINICS ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Nearby DOT Clinics</h2>
            <p className="text-gray-500 mt-1 text-sm">
              All clinics offer free TB testing and treatment
            </p>
          </div>
          <Link
            href="/clinics"
            className="hidden sm:inline-flex items-center gap-1 text-blue-700 font-semibold text-sm hover:text-blue-900"
          >
            View all {totalClinics} clinics →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SEED_CLINICS.slice(0, 6).map((clinic) => (
            <Link
              key={clinic.id}
              href={`/clinics/${clinic.id}`}
              className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-200 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex flex-wrap gap-1.5 justify-end">
                  {clinic.genexpert_available && (
                    <span className="badge-teal">GeneXpert</span>
                  )}
                  {clinic.pediatric_tb && (
                    <span className="badge-blue">Child Friendly</span>
                  )}
                </div>
              </div>
              <h3 className="font-display font-semibold text-gray-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                {clinic.clinic_name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1.5 text-gray-500 text-sm">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                {clinic.lga} LGA
              </div>
              <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-xs">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                {clinic.opening_hours}
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-1.5">
                <span className="badge-green">Free Treatment</span>
                <span className="badge badge-blue bg-blue-50 text-blue-700">DOT Centre</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/clinics"
            className="inline-flex items-center gap-2 bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl"
          >
            View all {totalClinics} clinics
          </Link>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              {
                q: "Is TB treatment really free in Ogun State?",
                a: "Yes. All TB medications, tests, and treatment under the NTBLCP programme are provided completely free of charge at government DOT clinics.",
              },
              {
                q: "How long does TB treatment take?",
                a: "Standard TB treatment lasts 6 months (2 months of intensive phase + 4 months of continuation phase). Drug-resistant TB may require longer treatment.",
              },
              {
                q: "What is DOT (Directly Observed Therapy)?",
                a: "DOT means a trained health worker watches you take your TB medication every day. This ensures you complete treatment correctly and reduces the risk of drug resistance.",
              },
              {
                q: "Can I get TB if someone in my house has it?",
                a: "Yes. TB spreads through the air. If someone at home has TB, all close contacts should be tested. Contact tracing and preventive treatment are available free of charge.",
              },
              {
                q: "Do I need a referral letter to visit a DOT clinic?",
                a: "No. You can walk into any DOT clinic on this directory and request TB screening directly. No referral letter is required.",
              },
              {
                q: "What happens if I miss doses of my TB medication?",
                a: "Missing doses is dangerous and can lead to drug-resistant TB, which is much harder to treat. Contact your DOT clinic immediately if you miss a dose. The health worker assigned to you can also help.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="bg-white border border-gray-200 rounded-xl group"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-gray-900 text-sm list-none">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform shrink-0 ml-2" />
                </summary>
                <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="hero-gradient py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Do not wait. TB is curable when caught early.
          </h2>
          <p className="text-blue-100 mb-8">
            Find a free DOT clinic near you today. No registration required. Walk
            in and get tested.
          </p>
          <Link
            href="/clinics"
            className="inline-flex items-center gap-2 bg-white text-blue-800 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 shadow-lg transition-all"
          >
            <MapPin className="w-5 h-5" />
            Find the Nearest DOT Clinic
          </Link>
        </div>
      </section>
    </>
  );
}
