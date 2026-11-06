import { StaffMethodNotes } from "@/components/staff-method-notes";
import { StaffApiDiagnostics } from "@/components/staff-api-diagnostics";
/** بدون ورودی؛ نمای فنیِ زبان اپ را زیر محافظ مسیر توسعه‌دهنده با یادداشت روش مشترک نمایش می‌دهد. */
export default function DeveloperPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "32px auto", padding: 24 }}>
      <h1>Developer notes</h1>
      <StaffApiDiagnostics />
      <StaffMethodNotes language="en" />
    </main>
  );
}
