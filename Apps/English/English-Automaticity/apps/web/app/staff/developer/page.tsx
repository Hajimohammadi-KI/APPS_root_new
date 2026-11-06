import { StaffMethodNotes } from "@/components/staff-method-notes";
import { StaffApiDiagnostics } from "@/components/staff-api-diagnostics";
export default function DeveloperPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "32px auto", padding: 24 }}>
      <h1>توضیحات توسعه‌دهنده</h1>
      <StaffApiDiagnostics />
      <StaffMethodNotes language="en" />
    </main>
  );
}
