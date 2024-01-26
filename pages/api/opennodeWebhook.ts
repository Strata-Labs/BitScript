import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@server/db";
import jwt from "jsonwebtoken";
import { sendEmailNotificationHelper } from "@server/routers/email";
import { getBaseUrl } from "@server/trpc";
import { URL, URLSearchParams } from "url";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // we need to get the id of charge
    // 1) fetch the payment tied to the charge
    // 2) update the status accordingly
    if (req.method === "POST") {
      // 1) fetch the payment tied to the charge
      const openNodeChargeId = req.body.data.id;
      const status = req.body.data.status;

      console.log("req", req.method);
      console.log("req", req.body);

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
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            Authorization: process.env.OPEN_NODE_API_KEY || "",
          },
        };
        const openNodeFetchRes = await fetch(
          `https://api.opennode.com/v2/charge/${openNodeChargeId}`,
          options
        );
        const openNodeRes: any = await openNodeFetchRes.json();

        // ensure that the res status is paid
        const openNodeStatus = openNodeRes.data.status;
        if (openNodeStatus !== "paid") {
          console.log("openNodeStatus was not paid");
          return res.status(200).end();
        }

        const paymentLength = payment.paymentLength;

        let validUntil = new Date();
        const startedAt = new Date();

        if (paymentLength === "ONE_MONTH") {
          validUntil.setMonth(validUntil.getMonth() + 1);
        } else if (paymentLength === "ONE_YEAR") {
          validUntil.setFullYear(validUntil.getFullYear() + 1);
        } else if (paymentLength === "THREE_MONTHS") {
          validUntil.setMonth(validUntil.getMonth() + 3);
        } else if (paymentLength === "LIFETIME") {
        }

        const updatedPayment = await prisma.payment.update({
          where: {
            id: payment.id,
          },
          data: {
            validUntil,
            startedAt,
            status: "PAID",
            paymentProcessorMetadata: JSON.stringify(openNodeStatus),
            paymentDate: startedAt,
            paymentLength: paymentLength,
          },
          include: {
            User: true,
          },
        });

        if (updatedPayment.User) {
          const salt = process.env.TOKEN_SALT || "fry";
          // create a reset token
          const token = jwt.sign(
            {
              id: updatedPayment.User.id,
              email: updatedPayment.User.email,
            },
            salt
          );

          const baseUrl = getBaseUrl();
          const url = new URL(baseUrl);

          const searchParams = new URLSearchParams({
            createLogin: "true",
            token: token,
          });

          url.search = searchParams.toString();

          //const link = `${getBaseUrl()}/profile?createLogin=true&token=${token}`;

          sendEmailNotificationHelper({
            emailTo: [updatedPayment.User.email],
            title: "Your payment was successful",
            subject: "Thank you for your payment",

            subtitle: "Thank you joining BitScript",
            footerText:
              "Manage your subscription through your settings page on BitScript",
            button: {
              text: "Get Started",
              link: url.href,
            },
          });
        }
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
