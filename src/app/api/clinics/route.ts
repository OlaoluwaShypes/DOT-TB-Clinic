import { NextRequest, NextResponse } from "next/server";
import { SEED_CLINICS } from "@/lib/seed-data";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase();
  const lga = searchParams.get("lga")?.toLowerCase();
  const genexpert = searchParams.get("genexpert");
  const pediatric = searchParams.get("pediatric");
  const hiv = searchParams.get("hiv");

  let clinics = SEED_CLINICS;

  if (q) {
    clinics = clinics.filter(
      (c) =>
        c.clinic_name.toLowerCase().includes(q) ||
        c.town.toLowerCase().includes(q) ||
        c.address.toLowerCase().includes(q)
    );
  }
  if (lga) clinics = clinics.filter((c) => c.lga.toLowerCase() === lga);
  if (genexpert === "1") clinics = clinics.filter((c) => c.genexpert_available);
  if (pediatric === "1") clinics = clinics.filter((c) => c.pediatric_tb);
  if (hiv === "1") clinics = clinics.filter((c) => c.hiv_tb_integrated);

  return NextResponse.json({ clinics, total: clinics.length });
}
