import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Verify from "@/components/verify";

export default async function Register() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/UserDashboard");

  return <Verify type="register " description="  Sign Up to our platform" />;
}
