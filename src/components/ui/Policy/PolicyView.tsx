import { Shield, Eye, Database, Lock, Users, RefreshCw, Mail } from "lucide-react";
import { DecorIcon } from "@/components/ui/decor-icon";
import Link from "next/link";

const POLICY_SECTIONS = [
  {
    id: "data-collected",
    icon: Database,
    title: "1. Data We Collect",
    content: [
      "Account information: name, email address, and role (Admin, Manager, or Member).",
      "House & month records: houses you create or belong to, month configurations, and related metadata.",
      "Expense & deposit entries: amounts, dates, and descriptions submitted by managers.",
      "Meal logs: meal counts recorded per member per day.",
      "Payment information: subscription plan selections and transaction status (processed securely via our payment provider — we do not store card details).",
      "Usage data: page visits and actions taken within the dashboard, used to improve the product.",
    ],
  },
  {
    id: "data-use",
    icon: Eye,
    title: "2. How We Use Your Data",
    content: [
      "To create and maintain your SplitEase account.",
      "To calculate meal rates, monthly settlements, and expense summaries.",
      "To provide role-based access to house records (Admin → Manager → Member).",
      "To process subscription payments and manage plan entitlements.",
      "To send transactional emails such as account verification and password reset.",
      "To analyze aggregate usage patterns and improve platform performance.",
    ],
  },
  {
    id: "data-sharing",
    icon: Users,
    title: "3. Data Sharing",
    content: [
      "We do not sell, rent, or trade your personal data to third parties.",
      "House data is visible only to members and the manager of that specific house.",
      "Admins can manage platform-wide users and houses for operational purposes.",
      "We work with trusted service providers (e.g., payment processors, hosting) under strict data-processing agreements.",
      "We may disclose data if required by law or to protect the rights and safety of our users.",
    ],
  },
  {
    id: "data-security",
    icon: Lock,
    title: "4. Data Security",
    content: [
      "All data is transmitted over HTTPS with TLS encryption.",
      "Passwords are hashed using industry-standard algorithms and never stored in plain text.",
      "Authentication tokens are short-lived and signed securely.",
      "Access to production systems is restricted to authorised personnel only.",
      "We regularly review our security practices to address evolving threats.",
      "In the event of a data breach, we will notify affected users promptly in compliance with applicable regulations.",
    ],
  },
  {
    id: "data-retention",
    icon: RefreshCw,
    title: "5. Data Retention & Deletion",
    content: [
      "Your account data is retained for as long as your account is active.",
      "On account deletion, personal data is removed within 30 days, except where retention is required by law.",
      "House records, expense entries, and meal logs may be retained in anonymised form for audit purposes.",
      "You can request deletion of your data at any time by contacting our support team.",
    ],
  },
  {
    id: "your-rights",
    icon: Shield,
    title: "6. Your Rights",
    content: [
      "Access: you may request a copy of the personal data we hold about you.",
      "Correction: you can update your name and email from your profile settings.",
      "Deletion: you may request deletion of your account and associated data.",
      "Portability: you may request an export of your data in a machine-readable format.",
      "Objection: you may object to certain types of data processing where applicable.",
      "To exercise any of these rights, contact us at ashrafulhaque08@gmail.com.",
    ],
  },
  {
    id: "contact",
    icon: Mail,
    title: "7. Contact & Updates",
    content: [
      "This policy was last updated on April 2025.",
      "We may revise this policy periodically. Significant changes will be communicated via email or an in-app notice.",
      "Continued use of SplitEase after changes take effect constitutes acceptance of the updated policy.",
      "For any privacy-related questions or concerns, reach us at ashrafulhaque08@gmail.com.",
    ],
  },
];

export function PolicyView() {
  return (
    <section className="mx-auto w-full max-w-5xl lg:border-x">
      {/* Header */}
      <div className="relative border-b px-6 py-12 md:px-10 md:py-16">
        <DecorIcon position="bottom-left" />
        <DecorIcon position="bottom-right" />
        <div className="space-y-3 max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Legal
          </p>
          <h1 className="text-4xl font-bold md:text-5xl lg:font-black tracking-tight">
            Privacy &amp; Policy
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed">
            At SplitEase, we take your privacy seriously. This policy explains
            what data we collect, how we use it, and how we protect it within
            our shared-house management platform.
          </p>
        </div>
        <p className="mt-6 text-xs text-muted-foreground/60">
          Effective Date: April 2025 &nbsp;·&nbsp; SplitEase Platform
        </p>
      </div>

      {/* Sections */}
      <div className="divide-y">
        {POLICY_SECTIONS.map((section) => (
          <div
            key={section.id}
            className="group relative grid grid-cols-1 md:grid-cols-[220px_1fr] border-b last:border-0"
          >
            {/* Sidebar label */}
            <div className="relative flex items-start gap-3 px-6 py-8 md:px-10 md:border-r">
              <DecorIcon position="bottom-left" className="group-last:hidden" />
              <div className="flex items-center gap-2.5 md:flex-col md:items-start md:gap-2">
                <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                  <section.icon className="size-4" />
                </div>
                <h2 className="text-sm font-semibold text-foreground leading-snug">
                  {section.title}
                </h2>
              </div>
            </div>

            {/* Content list */}
            <ul className="px-6 py-8 md:px-10 space-y-3">
              {section.content.map((point, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 size-1.5 rounded-full bg-primary/60 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer strip */}
      <div className="relative border-t px-6 py-8 md:px-10">
        <DecorIcon position="top-left" />
        <DecorIcon position="top-right" />
        <p className="text-xs text-muted-foreground text-center">
          Questions about this policy?{" "}
          <Link
            href="mailto:ashrafulhaque08@gmail.com"
            className="text-primary hover:underline font-medium"
          >
            Contact us
          </Link>{" "}
          or visit our{" "}
          <Link href="/contact" className="text-primary hover:underline font-medium">
            Contact page
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
