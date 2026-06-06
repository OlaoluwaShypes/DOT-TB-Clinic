import { NextRequest, NextResponse } from "next/server";
import { SEED_CLINICS } from "@/lib/seed-data";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const clinic = SEED_CLINICS.find((c) => c.id === id);
  if (!clinic) return NextResponse.json({ error: "Clinic not found" }, { status: 404 });
  return NextResponse.json({ clinic });
}
