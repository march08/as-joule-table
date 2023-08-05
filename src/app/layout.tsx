import { ClientCookiesProvider } from "@/cookies/ClientCookiesProvider";
import { fontInter } from "lib/fonts";
import StyledComponentsRegistry from "lib/registry";
import type { Metadata } from "next";
import "./globals.css";

import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={fontInter.className}>
        <ClientCookiesProvider value={cookies().getAll()}>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </ClientCookiesProvider>
      </body>
    </html>
  );
}
