import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Airsoft tools by Roman Nguyen";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const poppinsSemiBold = fetch(
  new URL("/fonts/Poppins-SemiBold.ttf", import.meta.url),
).then((res) => res.arrayBuffer());

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 96,
          background: "#111",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "4rem 7rem",
          flexDirection: "column",
          color: "#fefefe",
        }}
      >
        <span>FPS Joule chart</span>
        <span
          style={{
            fontSize: 32,
            opacity: 0.6,
          }}
        >
          By Roman Nguyen
        </span>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Poppins",
          data: await poppinsSemiBold,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
