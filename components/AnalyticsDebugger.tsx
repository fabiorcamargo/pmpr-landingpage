"use client";

import { useEffect } from "react";

const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID as string;

const AnalyticsDebugger = () => {
  useEffect(() => {
    const gtag = (window as any).gtag;

    if (gtag) {
      gtag("get", GA_TRACKING_ID, "client_id", (clientId: string) => {
        console.log("GA4 client_id:", clientId);
      });
    } else {
      console.warn("gtag ainda não está disponível.");
    }
  }, []);

  return null;
};

export default AnalyticsDebugger;
