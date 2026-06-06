import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhone(phone: string): string {
  return phone.replace(/(\d{4})(\d{3})(\d{4})/, "$1 $2 $3");
}

export function getWhatsAppLink(number: string, message?: string): string {
  const clean = number.replace(/\D/g, "");
  const text = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${clean}${text ? `?text=${text}` : ""}`;
}

export function getDirectionsUrl(lat: number, lng: number, name: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
}

export function getMapsEmbedUrl(lat: number, lng: number): string {
  const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  if (key) {
    return `https://www.google.com/maps/embed/v1/place?key=${key}&q=${lat},${lng}&zoom=15`;
  }
  return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
}

export const OGUN_LGAS = [
  "Abeokuta North",
  "Abeokuta South",
  "Ado-Odo/Ota",
  "Ewekoro",
  "Ifo",
  "Ijebu East",
  "Ijebu North",
  "Ijebu North East",
  "Ijebu Ode",
  "Ikenne",
  "Imeko Afon",
  "Ipokia",
  "Obafemi Owode",
  "Odeda",
  "Odogbolu",
  "Ogun Waterside",
  "Remo North",
  "Sagamu",
  "Yewa North",
  "Yewa South",
];
