import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("req", req.method);
    console.log("req", req.body);
    res.status(200).json({ received: true });
  } catch (err) {
    // Handle any other HTTP method
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
