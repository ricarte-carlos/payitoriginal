"use client";

import { PostHogPageView } from "@/app/PostHogPageView";
import type { AuthSession } from "@/lib/auth/utils";
import { AuthContextProvider } from "@/providers/auth-context-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next";
import dynamic from "next/dynamic";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useState } from "react";
import { Toaster } from "sonner";

if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY ?? "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
    autocapture: false, // Disable automatic capture of clicks, form submissions, etc
    rageclick: false, // Disable rage clicks
  });
}

const ThemeProvider = dynamic(
  () => import("next-themes").then((mod) => mod.ThemeProvider),
  { ssr: false },
);

type PropsWithChildren = {
  children: React.ReactNode;
  session: AuthSession["session"];
};

export function Providers({ session, children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({ defaultOptions: { queries: { staleTime: 5000 } } }),
  );
  return (
    <AuthContextProvider session={session}>
      <PostHogProvider client={posthog}>
        <QueryClientProvider client={client}>
          <PostHogPageView />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Toaster richColors theme="dark" />
            <SpeedInsights />
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </PostHogProvider>
    </AuthContextProvider>
  );
}
