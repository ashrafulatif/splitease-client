import VerifyEmailForm from "@/components/module/Auth/VerifyEmail/VerifyEmailForm";
import { Metadata } from "next";
import React from "react";

const VerifyEmailPage = () => {
  return (
    <div className="min-h-screen flex items-center">
      <VerifyEmailForm />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address",
};

export default VerifyEmailPage;
