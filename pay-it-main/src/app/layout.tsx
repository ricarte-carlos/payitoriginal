import { Providers } from "@/components/providers";
import { getUserAuth } from "@/lib/auth/utils";

import type { GenerateMetadata } from "@/@types/metadata";
import { fonts } from "@/config/fonts";
import "@/styles/globals.css";
import type { Viewport } from "next";

export const generateMetadata: GenerateMetadata = () => ({
  title: {
    default: "Pay It",
    template: "%s | Pay It",
  },
  description:
    "Mais que só maquininha, somos o conjunto de soluções que seu negócio precisa para crescer.",
  keywords:
    "maquininha, cartão, crédito, débito, vendas, pagamento, negócio, empreendedor, empreendedorismo, soluções, crescimento, Pay It",
  authors: [
    { name: "Kriguer Freitas" },
    { name: "Richard Kyori Lucas" },
    { name: "Matheus Lukas" },
    { name: "Fellipe Utaka" },
    { name: "Junior Ribeiro" },
  ],
  creator: "Ascent Software Development",
  publisher: "Ascent Software Development",
  robots: "index, follow",
  applicationName: "Pay It",
  metadataBase: new URL("https://pay-it.vercel.app/"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Pay It",
    url: "https://pay-it.vercel.app/",
    title: "Pay It",
    description:
      "Mais que só maquininha, somos o conjunto de soluções que seu negócio precisa para crescer.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pay It",
    description:
      "Mais que só maquininha, somos o conjunto de soluções que seu negócio precisa para crescer.",
    creator: "@ascent_software",
  },
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({ children }: PropsWithChildren) {
  const { session } = await getUserAuth();

  return (
    <html lang="pt-BR" className="!scroll-smooth">
      <body style={fonts.sans.style}>
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
