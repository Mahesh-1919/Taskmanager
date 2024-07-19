import LoginForm from "@/components/loginForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/UserDashboard");

  return (
    <main className="text-[#FEF2EA]">
      <LoginForm />
    </main>
  );
}
