import { AutomaticityEvidenceSummary } from "@/features/components/automaticity-evidence-summary";
import { StaffMethodNotes } from "@/components/staff-method-notes";
export default function StaffProgressPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "32px auto", padding: 24 }}>
      <h1>گزارش معلم ناظر</h1>
      <AutomaticityEvidenceSummary />
      <StaffMethodNotes language="en" />
    </main>
  );
}
