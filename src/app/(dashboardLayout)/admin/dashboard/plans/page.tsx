import PlanView from "@/components/module/Plan/PlanView";
import { PlanServices } from "@/service/plans.service";
import { Metadata } from "next";


const PlanPage = async () => {
  const result = await PlanServices.getAllPlans();
  const plans = result?.data || [];

  return (
    <div className="space-y-6">
      <PlanView plans={plans} />
    </div>
  );
};

export const metadata : Metadata ={
  title: "Plans",
  description: "Admin Plans",
}

export default PlanPage;
