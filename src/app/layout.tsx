import "~/styles/globals.css";
import { TRPCReactProvider } from "~/lib/trpc";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  description: "A dashboard for developers to monitor project activity",
  icons: [{ url: "/favicon.ico", rel: "icon" }],
  title: "Devboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html className={`${GeistSans.variable}`} lang="en">
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
