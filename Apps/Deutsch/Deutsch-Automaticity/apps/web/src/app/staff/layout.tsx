import { StaffRouteGuard } from "@/components/staff-access";
export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StaffRouteGuard>{children}</StaffRouteGuard>;
}
