import { ImageResponse } from "next/server";

import linkImg from "@/../public/images/linkImg.png";
import Image from "next/image";

export const config = {
  runtime: "edge",
};

export default async function handler() {
  return new ImageResponse(
    <Image src={linkImg} width={1200} height={630} alt={"Link"} />,

    {
      width: 1200,
      height: 630,
    }
  );
}
