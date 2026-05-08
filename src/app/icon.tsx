import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#7c3aed",
          color: "white",
          fontSize: 18,
          fontWeight: 800,
          fontFamily: "system-ui",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        🐾
      </div>
    ),
    size,
  );
}
