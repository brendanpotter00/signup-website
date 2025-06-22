"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DEFAULT_PROJECT } from "@/projectConfig";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the default project
    router.replace(`/projects/${DEFAULT_PROJECT}`);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p>Redirecting...</p>
      </div>
    </div>
  );
}
