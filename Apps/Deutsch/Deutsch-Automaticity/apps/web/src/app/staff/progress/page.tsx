import { AutomaticityEvidenceSummary } from "@/features/progress/automaticity-evidence-summary";
import { StaffMethodNotes } from "@/components/staff-method-notes";
/** بدون ورودی؛ گزارش تفصیلی هسته و یادداشت روش را در مسیر خصوصی معلم با زبان اپ ترکیب می‌کند. */
export default function StaffProgressPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "32px auto", padding: 24 }}>
      <h1>Fortschrittsbericht für Lehrkräfte</h1>
      <AutomaticityEvidenceSummary />
      <StaffMethodNotes language="de" />
    </main>
  );
}
