"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface SignupFormProps {
  tag: string;
  description?: string;
}

// Google Analytics event tracking
const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

export default function SignupForm({ tag, description }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "duplicate"
  >("idle");
  const [message, setMessage] = useState("");

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setStatus("error");
      setMessage("Invalid email");
      trackEvent("signup_error", {
        error_type: "invalid_email",
        project_tag: tag,
      });
      return;
    }

    if (!supabase) {
      setStatus("error");
      setMessage("Database connection not configured");
      trackEvent("signup_error", {
        error_type: "database_connection",
        project_tag: tag,
      });
      return;
    }

    setStatus("loading");
    setMessage("");

    // Track form submission
    trackEvent("signup_attempt", {
      project_tag: tag,
    });

    try {
      // First check if this email+tag combination already exists
      const { data: existingSignup } = await supabase
        .from("signups")
        .select("email")
        .eq("email", email)
        .eq("tag", tag)
        .single();

      if (existingSignup) {
        setStatus("duplicate");
        setMessage("You've already signed up for this project!");
        trackEvent("signup_error", {
          error_type: "duplicate_email_tag",
          project_tag: tag,
        });
        return;
      }

      const { error } = await supabase.from("signups").insert({ email, tag });

      if (error) {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
        trackEvent("signup_error", {
          error_type: "database_error",
          project_tag: tag,
        });
      } else {
        setStatus("success");
        setMessage("Thanks! You're on the list.");
        setEmail("");
        trackEvent("signup_success", {
          project_tag: tag,
        });
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      trackEvent("signup_error", {
        error_type: "network_error",
        project_tag: tag,
      });
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
            className="input-field"
            disabled={status === "loading"}
            required
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-primary"
        >
          {status === "loading" ? "joining..." : "only be notified of launch"}
        </button>
      </form>

      {message && <div className={`message ${status}`}>{message}</div>}
    </div>
  );
}
