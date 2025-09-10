import "./globals.css";
import ClientLayout from "./client-layout";

export const metadata = {
  title: "Notes App",
  description: "Simple Notes App PWA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className="bg-gray-100 text-gray-900">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
