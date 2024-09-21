"use client";
import Link from "next/link";
import { usePostHog } from "posthog-js/react";
import { Icons } from "./icons";

export function WhatsappButton() {
  const posthog = usePostHog();
  return (
    <Link
      className="fixed md:bottom-10 md:right-10 bottom-6 right-4 z-50"
      href="https://wa.me/+5527988523626?text=Ol%C3%A1%2C+quero+obter+mais+informa%C3%A7%C3%B5es%21"
      target="_blank"
      onClick={() => posthog?.capture("button_whatsapp")}
    >
      <div className="flex items-center w-fit gap-3 bg-green-600 md:animate-touch animate-bounce rounded-full p-2 md:p-4">
        <Icons.Whatsapp className="md:w-8 w-9 h-auto text-white" />
        <p className="text-white hidden md:block">Entre em contato</p>
      </div>
    </Link>
  );
}
