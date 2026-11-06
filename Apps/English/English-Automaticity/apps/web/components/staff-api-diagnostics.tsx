"use client";
import { ApiConnectionStatus } from "@/features/components/api-connection-status";
import { useAppStore } from "@/features/store/app-store";
export function StaffApiDiagnostics() {
  const { state } = useAppStore();
  return <ApiConnectionStatus baseUrl={state.settings.apiBaseUrl} />;
}
