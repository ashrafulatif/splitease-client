"use client";

import { useState } from "react";
import { CreatePlanModal } from "./CreatePlanModal";
import { UpdatePlanModal } from "./UpdatePlanModal";
import { DeletePlanDialog } from "./DeletePlanDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash2, Zap, Clock, CheckCircle2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IPlan } from "@/types/plan.types";

interface PlanViewProps {
  plans: IPlan[];
}

const PlanView = ({ plans = [] }: PlanViewProps) => {
  const [selectedPlan, setSelectedPlan] = useState<IPlan | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const onEdit = (plan: IPlan) => {
    setSelectedPlan(plan);
    setIsUpdateOpen(true);
  };

  const onDelete = (plan: IPlan) => {
    setSelectedPlan(plan);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-8 rounded-3xl border border-border/50 shadow-sm gap-6 transition-all hover:shadow-md">
        <div className="space-y-1">
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            Subscription Plans
          </h2>
          <p className="text-muted-foreground font-medium text-sm max-w-md">
            Manage your service tiers, pricing, and feature offerings from this centralized dashboard.
          </p>
        </div>
        <CreatePlanModal />
      </div>

      {/* Table Section */}
      <div className="rounded-3xl border border-border/50 bg-white shadow-sm overflow-hidden transition-all hover:shadow-md">
        <Table>
          <TableHeader className="bg-stone-50/50">
            <TableRow className="hover:bg-transparent border-border/50">
              <TableHead className="w-[250px] pl-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
                Plan Details
              </TableHead>
              <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
                Pricing & Duration
              </TableHead>
              <TableHead className="py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
                Available Features
              </TableHead>
              <TableHead className="w-[100px] text-right pr-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/70">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center h-64 text-muted-foreground">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="rounded-2xl bg-stone-100 p-4">
                      <Zap className="w-8 h-8 text-muted-foreground/50" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-bold text-foreground">No plans found</p>
                      <p className="text-xs font-medium">Get started by creating your first subscription tier.</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              plans.map((plan) => (
                <TableRow key={plan.id} className="hover:bg-stone-50/50 transition-colors border-border/40 group">
                  <TableCell className="pl-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                         <span className="font-black text-lg tracking-tight text-foreground group-hover:text-primary transition-colors">
                           {plan.name}
                         </span>
                         {plan.price === 0 && (
                            <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[9px] tracking-tighter rounded-lg">
                               FREE
                            </Badge>
                         )}
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider opacity-60">
                         <Zap className="w-3 h-3" />
                         ID: {plan.id.slice(0, 8)}...
                      </div>
                    </div>
                  </TableCell>
                  
                  <TableCell className="py-6">
                    <div className="space-y-2">
                       <div className="flex items-center gap-2 font-black text-foreground">
                          <span className="text-xl tracking-tight">${plan.price}</span>
                       </div>
                       <Badge variant="outline" className="flex items-center gap-1.5 font-bold text-[10px] bg-stone-50 border-border/50 py-1 rounded-lg">
                          <Clock className="w-3 h-3 text-primary" />
                          {plan.durationDays} Days Validity
                       </Badge>
                    </div>
                  </TableCell>

                  <TableCell className="py-6 max-w-[400px]">
                    <div className="flex flex-wrap gap-2">
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="flex items-center gap-1.5 font-bold text-[10px] bg-indigo-500/5 text-indigo-600 border-indigo-500/10 py-1 rounded-lg">
                          <CheckCircle2 className="w-3 h-3" />
                          {feature}
                        </Badge>
                      ))}
                      {plan.features.length > 3 && (
                        <Badge variant="ghost" className="font-bold text-[10px] text-muted-foreground py-1">
                          +{plan.features.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="text-right pr-8 py-6">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-10 w-10 p-0 hover:bg-stone-100 rounded-xl transition-all">
                          <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-[180px] rounded-2xl p-2 border-border/50 shadow-xl">
                        <DropdownMenuItem 
                          onClick={() => onEdit(plan)} 
                          className="cursor-pointer rounded-xl font-bold py-2.5 focus:bg-stone-50"
                        >
                          <Edit className="mr-2.5 h-4 w-4 text-primary" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive focus:text-destructive cursor-pointer rounded-xl font-bold py-2.5 focus:bg-destructive/5"
                          onClick={() => onDelete(plan)}
                        >
                          <Trash2 className="mr-2.5 h-4 w-4" />
                          Delete Plan
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {selectedPlan && (
        <>
          <UpdatePlanModal
            open={isUpdateOpen}
            setOpen={setIsUpdateOpen}
            plan={selectedPlan}
          />
          <DeletePlanDialog
            open={isDeleteOpen}
            setOpen={setIsDeleteOpen}
            planId={selectedPlan.id}
          />
        </>
      )}
    </div>
  );
};

export default PlanView;
