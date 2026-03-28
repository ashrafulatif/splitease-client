import RegisterForm from "@/components/module/Auth/Register/RegisterForm";
import { Metadata } from "next";

const RegisterPage = () => {
  return (
    <div className="min-h-screen flex items-center">
      <RegisterForm />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Register",
  description: "Create a new account",
};

export default RegisterPage;
