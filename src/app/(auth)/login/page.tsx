import { LoginForm } from "@/components/login-form"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const myCookies = await cookies();
  const access = myCookies.get("accessToken")?.value;
  if (access) {
    redirect("/");
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}
