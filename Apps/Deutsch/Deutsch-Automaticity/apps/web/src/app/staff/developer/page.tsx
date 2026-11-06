import { StaffMethodNotes } from "@/components/staff-method-notes";
import { ApiConnectionStatus } from "@/components/api-connection-status";
export default function DeveloperPage() {
  return (
    <main style={{ maxWidth: 1100, margin: "32px auto", padding: 24 }}>
      <h1>توضیحات توسعه‌دهنده</h1>
      <ApiConnectionStatus />
      <StaffMethodNotes language="de" />
    </main>
  );
}
