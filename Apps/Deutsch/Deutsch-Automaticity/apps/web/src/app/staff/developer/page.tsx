import { StaffMethodNotes } from "@/components/staff-method-notes";
import { ApiConnectionStatus } from "@/components/api-connection-status";
/** بدون ورودی؛ نمای فنیِ زبان اپ را زیر محافظ مسیر توسعه‌دهنده با یادداشت روش مشترک نمایش می‌دهد. */
export default function DeveloperPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "32px auto", padding: 24 }}>
      <h1>Hinweise für die Entwicklung</h1>
      <ApiConnectionStatus />
      <StaffMethodNotes language="de" />
    </main>
  );
}
