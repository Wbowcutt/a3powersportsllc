"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function BookingEmbed({ calLink }: { calLink: string }) {
  useEffect(() => {
    let active = true;

    (async function () {
      const cal = await getCalApi({ namespace: "a3" });
      if (!active) return;
      cal("ui", {
        theme: "light",
        cssVarsPerTheme: {
          light: { "cal-brand": "#111111" },
          dark: { "cal-brand": "#e10600" },
        },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <Cal
      namespace="a3"
      calLink={calLink}
      style={{ width: "100%", height: "100%", overflow: "auto" }}
      config={{ layout: "month_view", theme: "light" }}
    />
  );
}
