import { ImageResponse } from "next/og";
import { SITE_TITLE, SITE_DESCRIPTION } from "@/config";

export const runtime = "edge";

export const alt = "Rankr - Show interest in rankr";
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Rainbow cube icon */}
        <div
          style={{
            width: "120px",
            height: "120px",
            marginBottom: "40px",
            position: "relative",
          }}
        >
          <svg width="120" height="120" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="rainbow1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#ff0000" }} />
                <stop offset="16.67%" style={{ stopColor: "#ff8000" }} />
                <stop offset="33.33%" style={{ stopColor: "#ffff00" }} />
                <stop offset="50%" style={{ stopColor: "#00ff00" }} />
                <stop offset="66.67%" style={{ stopColor: "#0080ff" }} />
                <stop offset="83.33%" style={{ stopColor: "#8000ff" }} />
                <stop offset="100%" style={{ stopColor: "#ff0080" }} />
              </linearGradient>
              <linearGradient id="rainbow2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#ff0080" }} />
                <stop offset="16.67%" style={{ stopColor: "#ff0000" }} />
                <stop offset="33.33%" style={{ stopColor: "#ff8000" }} />
                <stop offset="50%" style={{ stopColor: "#ffff00" }} />
                <stop offset="66.67%" style={{ stopColor: "#00ff00" }} />
                <stop offset="83.33%" style={{ stopColor: "#0080ff" }} />
                <stop offset="100%" style={{ stopColor: "#8000ff" }} />
              </linearGradient>
              <linearGradient id="rainbow3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: "#8000ff" }} />
                <stop offset="16.67%" style={{ stopColor: "#ff0080" }} />
                <stop offset="33.33%" style={{ stopColor: "#ff0000" }} />
                <stop offset="50%" style={{ stopColor: "#ff8000" }} />
                <stop offset="66.67%" style={{ stopColor: "#ffff00" }} />
                <stop offset="83.33%" style={{ stopColor: "#00ff00" }} />
                <stop offset="100%" style={{ stopColor: "#0080ff" }} />
              </linearGradient>
            </defs>

            <polygon
              points="6,22 16,18 26,22 16,26"
              fill="url(#rainbow1)"
              opacity="0.7"
            />
            <polygon
              points="26,22 26,10 16,6 16,18"
              fill="url(#rainbow2)"
              opacity="0.9"
            />
            <polygon points="6,10 16,6 26,10 16,18" fill="url(#rainbow3)" />
            <polygon
              points="6,10 6,22 16,18 16,6"
              fill="url(#rainbow1)"
              opacity="0.8"
            />
          </svg>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: "64px",
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
            margin: "0 0 20px 0",
            lineHeight: "1.2",
          }}
        >
          {SITE_TITLE}
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: "32px",
            color: "rgba(255, 255, 255, 0.9)",
            textAlign: "center",
            margin: "0",
            maxWidth: "800px",
            lineHeight: "1.4",
          }}
        >
          {SITE_DESCRIPTION}
        </p>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "40px",
            right: "40px",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "40px",
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
