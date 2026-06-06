import { Metadata } from "next";
import SymptomCheckerClient from "./SymptomCheckerClient";

export const metadata: Metadata = {
  title: "TB Symptom Checker",
  description: "Check your TB symptoms with our quick, confidential tool.",
};

export default function SymptomCheckerPage() {
  return <SymptomCheckerClient />;
}
