"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PaymentSuccessView = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [countdown, setCountdown] = useState(8);

  // Auto-redirect after countdown
  useEffect(() => {
    if (countdown <= 0) {
      router.push("/manager/dashboard/subscription");
      return;
    }
    const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6 animate-in fade-in slide-in-from-bottom-6 duration-700">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center animate-in zoom-in duration-500 delay-200">
              <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            {/* Ripple rings */}
            <span className="absolute inset-0 rounded-full bg-green-400/20 animate-ping" />
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
            Payment Successful!
          </h1>
          <p className="text-muted-foreground text-sm">
            Your subscription has been activated. You now have full access to
            your plan&#39;s features.
          </p>
          {sessionId && (
            <p className="text-xs text-muted-foreground/60 font-mono mt-1">
              Ref: {sessionId.slice(-12).toUpperCase()}
            </p>
          )}
        </div>

        {/* Card */}
        <div className="rounded-xl border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/10 p-4 text-sm text-green-800 dark:text-green-300 space-y-1">
          <p className="font-semibold">What&#39;s next?</p>
          <ul className="text-left list-disc list-inside space-y-1 text-green-700 dark:text-green-400">
            <li>Your plan is now active</li>
            <li>A receipt has been sent to your email</li>
            <li>All premium features are unlocked</li>
          </ul>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Button asChild className="w-full gap-2" size="lg">
            <Link href="/manager/dashboard/subscription">
              View My Subscription <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          <Button asChild variant="ghost" className="w-full" size="sm">
            <Link href="/manager/dashboard">Go to Dashboard</Link>
          </Button>
        </div>

        {/* Auto-redirect notice */}
        <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
          <Loader2 className="w-3 h-3 animate-spin" />
          Redirecting to your subscription in {countdown}s…
        </p>
      </div>
    </div>
  );
};

export default PaymentSuccessView;
