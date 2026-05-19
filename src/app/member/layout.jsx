import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function MemberLayout({ children }) {
  const session = await auth();

  // No session → send to login
  if (!session?.user) {
    redirect("/login");
  }

  return <>{children}</>;
}
