"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

interface SignupFormProps {
  tag: string;
}

export default function SignupForm({ tag }: SignupFormProps) {
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
      return;
    }

    if (!supabase) {
      setStatus("error");
      setMessage("Database connection not configured");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const { error } = await supabase.from("signups").insert({ email, tag });

      if (error) {
        if (error.code === "23505") {
          // Unique constraint violation
          setStatus("duplicate");
          setMessage("You've already signed up!");
        } else {
          setStatus("error");
          setMessage("Something went wrong. Please try again.");
        }
      } else {
        setStatus("success");
        setMessage("Thanks! You're on the list.");
        setEmail("");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
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
          {status === "loading" ? "joining..." : "show interest"}
        </button>
      </form>

      {message && <div className={`message ${status}`}>{message}</div>}
    </div>
  );
}
