import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") || "InkFlow Story";
  const author = searchParams.get("author") || "InkFlow Writer";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#0f1115", // Ink-900
          padding: "80px",
        }}
      >
        <div
          style={{
            color: "#d97706",
            fontSize: 24,
            fontWeight: "bold",
            marginBottom: 20,
          }}
        >
          INKFLOW EDITORIAL
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: "bold",
            color: "white",
            lineHeight: 1.1,
            marginBottom: 40,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 28 }}>
            by {author}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
