import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Image from "next/image";

interface Footer7Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
  legalLinks?: Array<{
    name: string;
    href: string;
  }>;
}

const defaultSections = [
  {
    title: "Product",
    links: [
      { name: "Overview", href: "/" },
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/#pricing" },
      { name: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Testimonials", href: "/#testimonials" },
      { name: "Register", href: "/register" },
      { name: "Login", href: "/login" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "FAQ", href: "/#faqs" },
      { name: "Support", href: "/contact" },
      { name: "Terms", href: "/privacy" },
      { name: "Privacy", href: "/privacy" },
    ],
  },
];

const defaultSocialLinks = [
  { icon: <FaGithub className="size-5" />, href: "https://github.com/ashrafulatif", label: "Github" },
  { icon: <FaFacebook className="size-5" />, href: "https://www.facebook.com/ashrafulhaque565/", label: "Facebook" },
  { icon: <FaTwitter className="size-5" />, href: "https://x.com/", label: "Twitter" },
  { icon: <FaLinkedin className="size-5" />, href: "https://www.linkedin.com/in/ashrafulhaque08/", label: "LinkedIn" },
];

const defaultLegalLinks = [
  { name: "Terms and Conditions", href: "/privacy" },
  { name: "Privacy Policy", href: "/privacy" },
];

export const Footer = ({
  logo = {
    url: "/",
    src: "/logo.svg",
    alt: "SplitEase logo",
    title: "SplitEase",
  },
  sections = defaultSections,
  description = "SplitEase helps shared houses track meals, deposits, and expenses with transparent monthly settlements.",
  socialLinks = defaultSocialLinks,
  copyright = "© 2026 SplitEase. All rights reserved.",
  legalLinks = defaultLegalLinks,
}: Footer7Props) => {
  return (
    <section className="py-20">
      <div className="max-w-5xl mx-auto">
        <div className="flex w-full flex-col justify-between gap-10 text-center lg:flex-row lg:items-start lg:text-left">
          <div className="flex w-full flex-col justify-between gap-6 items-center lg:items-start">
            {/* Logo */}
            <div className="flex items-center justify-center gap-2 lg:justify-start">
              
              <h2 className="text-xl font-semibold">{logo.title}</h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground mx-auto lg:mx-0">
              {description}
            </p>
            <ul className="flex items-center justify-center space-x-6 text-muted-foreground lg:justify-start">
              {socialLinks.map((social, idx) => (
                <li key={idx} className="font-medium hover:text-primary">
                  <a href={social.href} aria-label={social.label}>
                    {social.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid w-full gap-6 text-center md:grid-cols-3 lg:gap-20 lg:text-left">
            {sections.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.href}>{link.name}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t py-8 text-center text-xs font-medium text-muted-foreground md:flex-row md:items-center md:text-left">
          <p className="order-2 lg:order-1">{copyright}</p>
          <ul className="order-1 flex flex-col items-center gap-2 md:order-2 md:flex-row">
            {legalLinks.map((link, idx) => (
              <li key={idx} className="hover:text-primary">
                <a href={link.href}> {link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};
