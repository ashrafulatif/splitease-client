import LoginForm from "@/components/module/Auth/Login/LoginForm";
import { Metadata } from "next";

type LoginPageProps = {
  searchParams?: Promise<{
    redirect?: string;
  }>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const params = await searchParams;

  return (
    <div className="min-h-screen flex items-center">
      <LoginForm redirectPath={params?.redirect} />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default LoginPage;
