import PaymentSuccessView from "@/components/module/Common/payment/PaymentSuccessView";
import { Spinner } from "@/components/ui/spinner";
import { Suspense } from "react";

const PaymentSuccessPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          {" "}
          <Spinner className="text-primary" />
        </div>
      }
    >
      <PaymentSuccessView />
    </Suspense>
  );
};

export default PaymentSuccessPage;
