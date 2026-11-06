import { StaffRouteGuard } from "@/components/staff-access";
export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <StaffRouteGuard>{children}</StaffRouteGuard>;
}
