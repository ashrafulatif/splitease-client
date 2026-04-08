"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { User, ShieldCheck, UserCog } from "lucide-react";
import { motion } from "motion/react";

interface LoginDemoProps {
  onSelect: (email: string, password: string) => void;
}

const LoginDemo = ({ onSelect }: LoginDemoProps) => {
  const demoUsers = [
    {
      role: "Admin",
      email: "ashrafulatif111@gmail.com",
      password: "123456789",
      icon: ShieldCheck,
    },
    {
      role: "Manager",
      email: "blake@gmail.com",
      password: "12345678",
      icon: UserCog,
    },
    {
      role: "Member",
      email: "ashrafulatif08@gmail.com",
      password: "Member@cm",
      icon: User,
    },
  ];

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center gap-4 px-2">
        <div className="h-px flex-1 bg-border/60" />
        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground/60 select-none">
          Demo Access
        </span>
        <div className="h-px flex-1 bg-border/60" />
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {demoUsers.map((user, index) => (
          <motion.div
            key={user.role}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.1,
              type: "spring",
              stiffness: 260,
              damping: 20,
            }}
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 text-xs gap-2 rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/[0.03] transition-all duration-300 shadow-sm"
              onClick={() => onSelect(user.email, user.password)}
              type="button"
            >
              <user.icon className="size-3.5 text-primary/80" />
              {user.role}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LoginDemo;