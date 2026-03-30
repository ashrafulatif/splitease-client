import { Badge } from "@/components/ui/badge";
import { ShieldCheck, UserCheck, ShieldQuestion } from "lucide-react";

export const getRoleBadge = (role: string) => {
  switch (role) {
    case "ADMIN":
      return <Badge className="bg-red-50 text-red-600 border-none font-black text-[10px] tracking-widest rounded-lg flex items-center gap-1.5 px-2.5 py-1 uppercase"><ShieldCheck className="w-3 h-3" /> ADMIN</Badge>;
    case "MANAGER":
      return <Badge className="bg-indigo-50 text-indigo-600 border-none font-black text-[10px] tracking-widest rounded-lg flex items-center gap-1.5 px-2.5 py-1 uppercase"><UserCheck className="w-3 h-3" /> MANAGER</Badge>;
    case "MEMBER":
      return <Badge className="bg-stone-50 text-stone-600 border-stone-100 font-black text-[10px] tracking-widest rounded-lg flex items-center gap-1.5 px-2.5 py-1 uppercase border"><UserCheck className="w-3 h-3" /> MEMBER</Badge>;
    default:
      return <Badge variant="outline" className="font-black text-[10px] tracking-widest rounded-lg px-2.5 py-1 uppercase"><ShieldQuestion className="w-3 h-3 mr-1.5" />{role}</Badge>;
  }
};

export const getStatusBadge = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[9px] tracking-tighter rounded-full px-2.5">ACTIVE</Badge>;
    case "INACTIVE":
      return <Badge className="bg-destructive/10 text-destructive border-none font-black text-[9px] tracking-tighter rounded-full px-2.5">INACTIVE</Badge>;
    case "SUSPENDED":
      return <Badge className="bg-orange-500/10 text-orange-600 border-none font-black text-[9px] tracking-tighter rounded-full px-2.5">SUSPENDED</Badge>;
    default:
      return <Badge variant="outline" className="font-black text-[9px] tracking-tighter rounded-full px-2.5">{status}</Badge>;
  }
};