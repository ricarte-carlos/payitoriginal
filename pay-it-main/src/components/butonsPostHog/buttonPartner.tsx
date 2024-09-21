"use client";
import { usePostHog } from "posthog-js/react";
import { Button } from "../ui/button";

export function ButtonPartner() {
  const posthog = usePostHog();
  return (
    <Button
      className="rounded-full max-w-md w-full h-12 shadow-lg ring-offset-primary"
      onClick={() => posthog.capture("button_partner_section")}
    >
      Call to action
    </Button>
  );
}
