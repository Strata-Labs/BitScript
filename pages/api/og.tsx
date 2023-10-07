import { ImageResponse } from "next/server";

import linkImg from "@/../public/images/linkImg.png";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${linkImg.src})`,
        }}
      ></div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
