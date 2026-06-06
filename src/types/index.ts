export interface Clinic {
  id: string;
  clinic_name: string;
  lga: string;
  ward?: string;
  town: string;
  address: string;
  latitude: number;
  longitude: number;
  phone?: string;
  email?: string;
  opening_hours?: string;
  services?: string[];
  genexpert_available: boolean;
  hiv_tb_integrated: boolean;
  pediatric_tb: boolean;
  drug_refill_days?: string;
  contact_officer?: string;
  whatsapp_number?: string;
  image_url?: string;
  facility_location_type?: string;
  status: "active" | "inactive" | "pending";
  created_at: string;
  updated_at?: string;
}

export interface SearchFilters {
  lga?: string;
  query?: string;
  genexpert?: boolean;
  pediatric?: boolean;
  hivTb?: boolean;
}

export interface SymptomResult {
  score: number;
  riskLevel: "low" | "moderate" | "high";
  message: string;
}

export interface Referral {
  id: string;
  patient_reference: string;
  clinic_id: string;
  status: "pending" | "completed" | "cancelled";
  created_at: string;
}

export type LGA =
  | "Abeokuta North"
  | "Abeokuta South"
  | "Ado-Odo/Ota"
  | "Ewekoro"
  | "Ifo"
  | "Ijebu East"
  | "Ijebu North"
  | "Ijebu North East"
  | "Ijebu Ode"
  | "Ikenne"
  | "Imeko Afon"
  | "Ipokia"
  | "Obafemi Owode"
  | "Odeda"
  | "Odogbolu"
  | "Ogun Waterside"
  | "Remo North"
  | "Sagamu"
  | "Yewa North"
  | "Yewa South";
