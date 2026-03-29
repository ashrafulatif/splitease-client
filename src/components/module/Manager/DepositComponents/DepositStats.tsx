import { Wallet, TrendingUp } from "lucide-react";
import { IDeposit } from "@/types/deposits.types";

export const DepositStats = ({ deposits = [] }: { deposits?: IDeposit[] }) => {
  const totalAmount = deposits.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="flex flex-col gap-4">
      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
        MONTHLY SUMMARY
      </span>
      <div className="flex gap-4">
        <div className="flex flex-col items-start p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 min-w-[180px]">
          <div className="flex items-center gap-2 mb-2">
            <Wallet className="w-5 h-5 text-emerald-500" />
            <span className="text-xs font-medium text-emerald-600 uppercase tracking-tight">Total Deposits</span>
          </div>
          <span className="text-2xl font-bold text-emerald-600 block">
            ৳{totalAmount.toLocaleString()}
          </span>
          <div className="flex items-center gap-1 mt-1 text-[10px] text-emerald-600/70 font-medium uppercase tracking-tighter">
             <TrendingUp className="w-3 h-3" />
             Verified Collections
          </div>
        </div>
        
        <div className="flex flex-col items-start p-4 rounded-2xl bg-blue-500/10 border border-blue-500/20 min-w-[140px]">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-medium text-blue-600 uppercase tracking-tight">Active Contributors</span>
          </div>
          <span className="text-2xl font-bold text-blue-600 block">
             {new Set(deposits.map(d => d.userId)).size}
          </span>
          <div className="mt-1 text-[10px] text-blue-600/70 font-medium uppercase tracking-tighter">
             Member Count
          </div>
        </div>
      </div>
    </div>
  );
};
