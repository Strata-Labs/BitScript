import { NextApiRequest, NextApiResponse } from "next";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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

    console.log("event", event);
    switch (event.type) {
      case "checkout.session.completed":
        // Handle checkout session completion
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
