"use client";

import SignupForm from "@/components/SignupForm";
import PhysicsScene from "@/components/PhysicsScene";
import { SITE_TITLE, SITE_DESCRIPTION, PROJECT_TAG } from "@/config";
import { useState, useEffect } from "react";

export default function Home() {
  const [wireframe, setWireframe] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PhysicsScene wireframe={wireframe} />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="content-overlay">
          <div className="text-center space-y-8 w-full">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-text">{SITE_TITLE}</h1>
              <p className="text-xl text-text-muted mx-auto">
                {SITE_DESCRIPTION}
              </p>
            </div>

            <SignupForm tag={PROJECT_TAG} />
          </div>
        </div>

        {/* Wireframe toggle button */}
        {showButton && (
          <button
            onClick={() => setWireframe(!wireframe)}
            className="wireframe-toggle"
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "12px 20px",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              color: "white",
              border: "2px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "50px",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              transition: "all 0.3s ease",
              opacity: 0,
              animation: "fadeIn 0.5s ease forwards",
              zIndex: 1000,
              pointerEvents: "auto",
              width: "auto",
              minWidth: "140px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
              e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.3)";
            }}
          >
            {wireframe ? "Solid Mode" : "Wireframe Mode"}
          </button>
        )}

        <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
        `}</style>
      </main>
    </>
  );
}
