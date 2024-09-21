"use client";

import { MotionDiv } from "@/lib/framer";
import { useHashChange } from "@/store/router";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { Icons } from "./icons";

const navItems = [
  {
    label: "Home",
    href: "home",
  },
  {
    label: "Sobre",
    href: "sobre",
  },
  {
    label: "Gestores",
    href: "gestores",
  },
  {
    label: "Ser Payit",
    href: "ser-payit",
  },
  {
    label: "Parceiros",
    href: "parceiros",
  },
  {
    label: "Novidades",
    href: "novidades",
  },
];

const socialMedia = [
  {
    icon: Icons.Facebook,
    link: "https://www.facebook.com",
    namePostHog: "button_facebook",
  },
  {
    icon: Icons.Instagram,
    link: "https://www.instagram.com",
    namePostHog: "button_instagram",
  },
  {
    icon: Icons.LinkedIn,
    link: "https://www.linkedin.com",
    namePostHog: "button_linkedin",
  },
  {
    icon: Icons.XTwitter,
    link: "https://www.twitter.com",
    namePostHog: "button_twitter",
  },
];

const year = new Date().getFullYear();

export function SiteFooter() {
  const posthog = usePostHog();
  const router = useHashChange((state) => state.addRouter);
  function navigationClick(link: string) {
    const href = document.getElementById(link);
    router(link);
    href?.scrollIntoView({
      behavior: "smooth",
    });
  }
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 50 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay: 0.2 },
      }}
      viewport={{ once: true, margin: "-64px" }}
      className="bg-[#FBFBFB] dark:bg-[#030711] py-10"
    >
      <div className="container grid sm:grid-cols-[1fr,auto] gap-y-8">
        <div className="grid sm:grid-cols-[1fr,2fr] sm:grid-rows-[min-content] gap-8 sm:gap-0">
          <div className="flex flex-col items-center sm:items-stretch gap-6 sm:gap-0">
            <Link href="/" className="sm:mr-6">
              <Icons.Logo className="h-auto w-36" />
            </Link>
            <p className="text-sm text-center sm:text-start text-balance">
              Our vision is to provide convenience and help increase your sales
              business.
            </p>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 sm:grid-cols-2 sm:grid-rows-3 sm:justify-self-start sm:justify-items-stretch gap-x-10 gap-y-3">
            {navItems.map((item) => (
              <button
                type="button"
                key={item.href}
                className="font-semibold text-center sm:text-left"
                onClick={() => navigationClick(item.href)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 justify-items-center sm:justify-items-start">
          <div className="flex gap-9 items-center *:h-auto *:w-8  *:cursor-pointer hover:*:text-purple-300">
            {socialMedia.map(({ icon: Icon, link, namePostHog }) => (
              <Link
                key={link}
                target="_blank"
                onClick={() => posthog?.capture(namePostHog)}
                href={link}
              >
                <Icon />
              </Link>
            ))}
          </div>
          <div className="hidden sm:block">
            <p>Central de Atendimento</p>
            <p>Telefone: 0020-2000</p>
            <p>WhatsApp: +55 11 99999-9999</p>
            <p>Email: atendimento@payitbrasil.com.br</p>
          </div>
        </div>

        <div className="grid text-center sm:text-left gap-y-4 text-sm sm:flex sm:justify-between sm:col-span-full border-t pt-4">
          <p>&copy;{year} Pay It Brasil. Todos os direitos reservados</p>
          <div className="flex justify-between gap-14">
            <p>Politica e Privacidade</p>
            <p>Termos e condições</p>
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
