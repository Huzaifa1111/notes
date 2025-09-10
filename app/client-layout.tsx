"use client";

import { useEffect } from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registered ✅"))
        .catch((err) =>
          console.error("Service Worker registration failed ❌", err)
        );
    }
  }, []);

  return <>{children}</>;
}
