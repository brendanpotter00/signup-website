"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { GA_MEASUREMENT_ID } from "@/config";

export default function Analytics() {
  // Only render if we have a valid GA measurement ID
  if (!GA_MEASUREMENT_ID || GA_MEASUREMENT_ID === "G-XXXXXXXXXX") {
    return null;
  }

  return <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />;
}
