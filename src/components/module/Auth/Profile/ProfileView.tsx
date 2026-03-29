"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Edit3, 
  Lock, 
  CheckCircle2 
} from "lucide-react";
import { cn } from "@/lib/utils";
import ChangePasswordModal from "./ChangePasswordModal";
import UpdateProfileModal from "./UpdateProfileModal";

interface ProfileViewProps {
  user: {
    id: string;
    name: string;
    email: string;
    role: "ADMIN" | "MANAGER" | "MEMBER";
    image?: string;
    createdAt?: string;
  };
}

const ProfileView = ({ user }: ProfileViewProps) => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const roleColors = {
    ADMIN: "bg-indigo-500/10 text-indigo-600 border-indigo-200",
    MANAGER: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
    MEMBER: "bg-blue-500/10 text-blue-600 border-blue-200",
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header Profile Card */}
      <Card className="border-none shadow-none bg-white rounded-3xl overflow-hidden group">
        <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent relative">
            <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,transparent)] opacity-20"></div>
        </div>
        <CardContent className="relative px-8 pb-8">
          <div className="flex flex-col md:flex-row items-end gap-6 -mt-12">
            <div className="relative group">
              <Avatar className="h-32 w-32 border-4 border-white shadow-xl rounded-full ring-4 ring-primary/5 transition-transform duration-500 group-hover:scale-105">
                <AvatarImage src={user.image} />
                <AvatarFallback className="bg-primary text-white text-3xl font-black rounded-2xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-4 border-white shadow-lg">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            
            <div className="flex-1 pb-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-3xl font-black tracking-tighter text-foreground">
                  {user.name}
                </h1>
                <Badge className={cn("px-3 py-1 font-black text-[10px] tracking-widest uppercase border transition-all duration-300", roleColors[user.role])}>
                  {user.role}
                </Badge>
              </div>
              <p className="text-muted-foreground font-semibold flex items-center gap-1.5 mt-1 opacity-70">
                <Mail className="h-3.5 w-3.5" />
                {user.email}
              </p>
            </div>

            <div className="flex gap-2">
               <Button 
                variant="outline" 
                className="rounded-xl font-bold gap-2 border-border/50 hover:bg-stone-50"
                onClick={() => setIsUpdateModalOpen(true)}
               >
                  <Edit3 className="h-4 w-4" />
                  Edit Profile
               </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* About Section */}
        <Card className="lg:col-span-2 border border-border/50 shadow-none bg-white rounded-2xl p-8 transition-all hover:shadow-lg hover:shadow-primary/5">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <User className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-black tracking-tight">Account Details</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Full Name</span>
                <p className="text-sm font-bold text-foreground">{user.name}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Email Address</span>
                <p className="text-sm font-bold text-foreground">{user.email}</p>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Authorized Role</span>
                <div className="flex items-center gap-2">
                   <Shield className="h-4 w-4 text-primary" />
                   <p className="text-sm font-bold text-foreground">{user.role}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest opacity-60">Member Since</span>
                <div className="flex items-center gap-2">
                   <Calendar className="h-4 w-4 text-primary" />
                   <p className="text-sm font-bold text-foreground">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "March 2026"}
                   </p>
                </div>
              </div>
            </div>

            <Separator className="opacity-50" />

            <div className="bg-stone-50 rounded-2xl p-6 border border-border/30">
               <div className="flex items-center justify-between">
                  <div className="space-y-1">
                     <p className="text-xs font-bold text-foreground">Account Status</p>
                     <p className="text-[10px] font-semibold text-muted-foreground opacity-70">Managed by Splitease Auth Protocol</p>
                  </div>
                  <Badge className="bg-emerald-500/10 text-emerald-600 border-none font-black text-[10px] tracking-tighter">
                    ACTIVE
                  </Badge>
               </div>
            </div>
          </div>
        </Card>

        {/* Security / Quick Links Card */}
        <Card className="border border-border/50 shadow-none bg-white rounded-2xl p-8 flex flex-col transition-all hover:shadow-lg hover:shadow-primary/5">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-500">
               <Lock className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-black tracking-tight">Security</h3>
          </div>
          
          <div className="space-y-3 flex-1">
             <Button 
              variant="ghost" 
              className="w-full justify-start rounded-xl group hover:bg-stone-50"
              onClick={() => setIsUpdateModalOpen(true)}
             >
                <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center mr-3 group-hover:bg-white transition-colors">
                   <Edit3 className="h-4 w-4 text-muted-foreground" />
                </div>
                <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground">Update Profile</span>
             </Button>
             <Button 
                variant="ghost" 
                className="w-full justify-start rounded-xl group hover:bg-stone-50 text-destructive hover:text-destructive"
                onClick={() => setIsPasswordModalOpen(true)}
             >
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center mr-3 group-hover:bg-destructive/20 transition-colors">
                   <Lock className="h-4 w-4 text-destructive" />
                </div>
                <span className="text-xs font-bold">Change Password</span>
             </Button>
          </div>
          
          <ChangePasswordModal 
            isOpen={isPasswordModalOpen} 
            onOpenChange={setIsPasswordModalOpen} 
          />

          <UpdateProfileModal 
            isOpen={isUpdateModalOpen} 
            onOpenChange={setIsUpdateModalOpen} 
            user={{
              name: user.name,
              image: user.image
            }}
          />

          <div className="mt-8 pt-8 border-t border-border/50 text-center">
             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-40">Logged in via ID</p>
             <p className="text-[8px] font-mono text-muted-foreground truncate mt-1">Splitease Browser Application</p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfileView;
