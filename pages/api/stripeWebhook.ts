import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { PrismaClient } from "@prisma/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("does it make it here");
  const STRIPE_WEBHOOK_SECRET =
    "whsec_d8da6be3910e74b07c36bf148ce7bfe6ce271f1580d37f80d9ebbed5f1579d19";

  console.log("req", req.method);
  // console.log("req", req.body);

  if (req.method === "POST") {
    // Handle the event

    const event = await stripe.events.retrieve(req.body.id);

    // const event = stripe.webhooks.constructEvent(
    //   JSON.stringify(req.body),
    //   req.headers["stripe-signature"],
    //   STRIPE_WEBHOOK_SECRET
    // );

    const prisma = new PrismaClient();
    console.log("event", event);
    switch (event.type) {
      case "checkout.session.completed":
        // there are two scneario where a checkout session is completed
        // 1) a user first time paying through the portal with a subscription or a one time payment
        // 2) a user subscription ended & they use the portal to make a new payment
        // 2.1) actually that's not true because on the second payment when the create a checkout session it makes a new one

        // we will only get this once when the user manually makes the first payment

        // Handle checkout session completion
        // so if we can a event here for a completed session we can then update the payment that this is tied to
        // we can use the checkout session id which should be

        // ensure event has teh checkout session id
        if (event.data.object.object === "checkout.session") {
          // can assume id is there
          const checkOutSessionId = event.data.object.id;

          const payment = await prisma.payment.findFirst({
            where: {
              paymentProcessor: "STRIPE",
              paymentProcessorId: checkOutSessionId,
            },
          });

          if (!payment) {
            console.log("payment was not found");
            return res.status(400).end();
          }
          // there ar
          const paymentDate = new Date();
          const paymentStatus = payment.status;

          if (paymentStatus === "PAID") {
            // if the payment is already paid then we can just return
            return res.status(200).json({ received: true });
          }

          // we need to update the payment
          // send email to the user - they should have added it to stripe

          // update payment
          const updatedPayment = await prisma.payment.update({
            where: {
              id: payment.id,
            },
            data: {
              status: "PAID",
              paymentDate: paymentDate,
              hasAccess: true,
              //stripePaymentIntentId:
            },
          });
        }
        // find the payment tied to the checkout session id

        break;
      case "checkout.session.async_payment_succeeded":
        // Handle new subscription
        break;
      case "checkout.session.async_payment_failed":
        break;
      case "customer.subscription.created":
        // Handle subscription creation
        break;
      case "customer.subscription.updated":
        // Handle subscription update
        break;
      case "customer.subscription.deleted":
        // Handle subscription deletion
        break;
      case "invoice.payment_succeeded":
        // Handle invoice payment success
        break;
      case "invoice.payment_failed":
        // Handle invoice payment success
        break;
      case "invoice.upcoming":
        // Handle invoice payment success
        break;
      default:
        // Unexpected event type
        return res.status(400).end();
    }
    res.status(200).json({ received: true });
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
