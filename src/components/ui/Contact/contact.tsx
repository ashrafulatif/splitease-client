"use client";

import { cn } from "@/lib/utils";
import { Mail, MessageSquare, MapPin, MessageCircle } from "lucide-react";
import { motion } from "motion/react";

const CONTACT_INFO = [
  {
    title: "Email Support",
    description: "Our dedicated team typically responds within 4-6 hours.",
    icon: Mail,
    value: "ashrafulhaque08@gmail.com",
    href: "mailto:ashrafulhaque08@gmail.com",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Community Discord",
    description: "Join our active community for instant help from peers.",
    icon: MessageCircle,
    value: "Join Discord Server",
    href: "https://discord.gg/splitease",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Office Hours",
    description: "Available for business inquiries and partnerships.",
    icon: MessageSquare,
    value: "Mon–Fri: 9AM – 6PM",
    href: "#",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "Our Location",
    description: "Our team operates globally to ensure 24/7 reliability.",
    icon: MapPin,
    value: "Dhaka, Bangladesh",
    href: "#",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
} as const;

export function Contact() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-14 space-y-3"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Get in <span className="text-primary">Touch <span className="inline-block animate-bounce italic">!</span></span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-xl">
            Have questions about SplitEase? We&apos;re here to help you manage
            your shared expenses with zero friction.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {CONTACT_INFO.map((item) => (
            <motion.a
              key={item.title}
              href={item.href}
              variants={itemVariants}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group flex flex-col gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-300"
            >
              <div
                className={cn(
                  "p-3 rounded-lg w-fit transition-transform duration-300 group-hover:scale-110",
                  item.bgColor,
                  item.color
                )}
              >
                <item.icon className="size-5" />
              </div>
              <div className="space-y-1.5">
                <h3 className="font-semibold text-sm text-foreground">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
                <p className="text-xs font-medium text-primary mt-2">
                  {item.value}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 p-4 rounded-lg bg-muted/40 border border-border text-center"
        >
          <p className="text-xs text-muted-foreground">
            Prefer quick answers? Visit our{" "}
            <a
              href="/about"
              className="text-primary hover:underline font-medium"
            >
              FAQ page
            </a>{" "}
            or email us directly at{" "}
            <a
              href="mailto:ashrafulhaque08@gmail.com"
              className="text-primary hover:underline font-medium"
            >
              ashrafulhaque08@gmail.com
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
