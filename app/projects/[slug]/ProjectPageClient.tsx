"use client";

import { useState, useEffect } from "react";
import SignupForm from "@/components/SignupForm";
import PhysicsScene from "@/components/PhysicsScene";
import { type ProjectMeta, type ProjectSlug } from "@/projectConfig";

// Google Analytics event tracking
const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, parameters);
  }
};

interface ProjectPageClientProps {
  slug: ProjectSlug;
  projectMeta: ProjectMeta;
}

export default function ProjectPageClient({ slug, projectMeta }: ProjectPageClientProps) {
  const [wireframe, setWireframe] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleWireframeToggle = () => {
    const newWireframeState = !wireframe;
    setWireframe(newWireframeState);

    trackEvent("wireframe_toggle", {
      wireframe_mode: newWireframeState,
      project_tag: slug,
    });
  };

  return (
    <>
      <PhysicsScene wireframe={wireframe} />
      <main className="min-h-screen flex items-center justify-center px-4">
        <div className="content-overlay">
          <div className="text-center space-y-8 w-full">
            <div className="space-y-4">
              <h1 className="text-4xl font-bold text-text">{projectMeta.title}</h1>
              <p className="text-xl text-text-muted mx-auto">
                {projectMeta.description}
              </p>
            </div>

            <SignupForm tag={slug} description={projectMeta.description} />
          </div>
        </div>

        {/* Wireframe toggle button */}
        {showButton && (
          <button
            onClick={handleWireframeToggle}
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