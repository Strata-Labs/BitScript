import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@server/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log("req", req.method);
    console.log("req", req.body);

    // we need to get the id of charge
    // 1) fetch the payment tied to the charge
    // 2) update the status accordingly
    if (req.method === "POST") {
      // 1) fetch the payment tied to the charge
      const openNodeChargeId = req.body.data.id;
      const status = req.body.data.status;

      if (status === "paid") {
        // fetch the payment tied to this charge
        const payment = await prisma.payment.findFirst({
          where: {
            paymentProcessor: "OPEN_NODE",
            paymentProcessorId: openNodeChargeId,
          },
        });

        if (!payment) {
          console.log("payment was not found");
          return res.status(400).end();
        }

        // update the payment status
      }
    } else {
      res.status(405).end("Method Not Allowed");
    }

    res.status(200).json({ received: true });
  } catch (err) {
    // Handle any other HTTP method
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
