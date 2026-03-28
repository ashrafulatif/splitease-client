"use client";

import {
  resendOtpAction,
  verifyEmailAction,
} from "@/app/(commonLayout)/(authRouteGroup)/verify-email/_action";
import AppSubmitButton from "@/components/module/shared/form/AppSubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const VerifyEmailForm = () => {
  const [otp, setOtp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const searchParams = useSearchParams();
  const router = useRouter();

  const email = searchParams.get("email") ?? "";
  const isOtpValid = /^\d{6}$/.test(otp);

  useEffect(() => {
    if (resendCooldown <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [resendCooldown]);

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email is missing. Please register again.");
      return;
    }

    if (resendCooldown > 0 || isResending) {
      return;
    }

    const toastId = toast.loading("Resending OTP...");
    setIsResending(true);

    try {
      const res = await resendOtpAction(email);

      if (res?.error) {
        toast.error(res.error ?? "Could not resend OTP. Please try again.", {
          id: toastId,
        });
        return;
      }

      toast.success(res?.message ?? "OTP sent successfully.", { id: toastId });
      setResendCooldown(120);
    } catch {
      toast.error("Something went wrong while resending OTP.", { id: toastId });
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is missing. Please register again.");
      return;
    }

    if (!isOtpValid) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    const toastId = toast.loading("Verifying email...");
    setIsSubmitting(true);

    try {
      const res = await verifyEmailAction(otp, email);

      if (res?.error) {
        toast.error(res?.error ?? "Verification failed. Please try again.", {
          id: toastId,
        });
        return;
      }

      toast.success(res?.message ?? "Email verified successfully!", {
        id: toastId,
      });
      router.push("/login");
    } catch {
      toast.error("Something went wrong while verifying email.", {
        id: toastId,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-md py-10 border border-primary/50">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Verify Your Email</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to{" "}
          <span className="font-medium">{email || "your email"}</span>.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={setOtp}
              containerClassName="justify-center"
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResendOtp}
              disabled={!email || isResending || resendCooldown > 0}
              className="text-primary font-medium hover:underline disabled:pointer-events-none disabled:opacity-60"
            >
              {resendCooldown > 0
                ? `Resend in ${resendCooldown}s`
                : isResending
                  ? "Resending..."
                  : "Resend OTP"}
            </button>
          </div>

          <AppSubmitButton
            isPending={isSubmitting}
            pendingLabel="Verifying..."
            disabled={!isOtpValid || !email}
          >
            Verify Email
          </AppSubmitButton>
        </form>
      </CardContent>

      <CardFooter className="justify-center border-t pt-4">
        <p className="text-sm text-muted-foreground">
          Already verified?{" "}
          <Link
            href="/login"
            className="text-primary font-medium hover:underline underline-offset-4"
          >
            Sign In
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
};

export default VerifyEmailForm;
