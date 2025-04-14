import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
import { AccountTier, PaymentLength } from "@prisma/client";
import { getProductList } from "@server/routers/payment";

import prisma from "@server/db";
import { handleTeamPayment } from "@server/routers/teamPayment";
import { sendEmailNotificationHelper } from "@server/routers/email";
import { getBaseUrl } from "@server/trpc";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const STRIPE_WEBHOOK_SECRET =
    "whsec_d8da6be3910e74b07c36bf148ce7bfe6ce271f1580d37f80d9ebbed5f1579d19";

  if (req.method === "POST") {

    const event = await stripe.events.retrieve(req.body.id);


    switch (event.type) {
      /*
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

          // create the validUntil param and start

          // since we have the payment we can get the length
          const paymentLength = payment.paymentLength;

          let validUntil = new Date();
          const startedAt = new Date();
          if (paymentLength === "ONE_DAY") {
            // add 1 day to the valid until date
            validUntil.setDate(validUntil.getDate() + 1);
          } else if (paymentLength === "ONE_MONTH") {
            // add 1 month to the valid until date
            validUntil.setMonth(validUntil.getMonth() + 1);
          } else if (paymentLength === "ONE_YEAR") {
            // add 1 year to the valid until date
            validUntil.setFullYear(validUntil.getFullYear() + 1);
          }

          // if it's lifetime than validUntil is null

          // update payment
          const updatedPayment = await prisma.payment.update({
            where: {
              id: payment.id,
            },
            data: {
              status: "PAID",
              paymentDate: paymentDate,
              hasAccess: true,
              stripePaymentIntentId: event.data.object.payment_intent,
              startedAt,
              validUntil,
            },
          });
        }
        // find the payment tied to the checkout session id

        break;
        */
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
        // okay so this only goes off if the user subscription has been renewed offline
        // we get the customer id & payment intent
        // this technically should not have a checkout session since there was no check out session
        // but we have the payment intent & customer id

        // 1) create a payment obj with the same info tied to the user of the customer item

        const invoice = await stripe.invoices.retrieve(event.data.object.id);
        if (!invoice) {
          return res.status(400).end();
        }
        const customerId = event.data.object.customer;
        const productId = invoice.lines.data[0].price.id;
        // check if the product id is a team product id or not
        const team = await prisma.team.findFirst({
          where: {
            stripeProductId: productId,
          },
        });


        if (team) {
          // we can assume it's a team prodcut and need to update everything accordingly
          const test = await handleTeamPayment(team, prisma);
        } else {
          // we can assume an individual is paying for their own subscription

          const paymentIntentId = event.data.object.payment_intent;
          const totalPaid = event.data.object.amount_paid;
          const paymentDate = new Date();

          // check if the payment intent is present in past payments/
          // this would mean they paid through the portal and it wasn't a rewnewal
          const payment = await prisma.payment.findFirst({
            where: {
              paymentProcessor: "STRIPE",
              stripeCustomerId: customerId,
              status: {
                not: "PAID",
              },
            },
          });

          if (payment) {
            // we can assume this is a payment from the portal so the payment model that reprsent this action is already here

            let accountTier: AccountTier = AccountTier.BEGINNER_BOB;
            let paymentLength: PaymentLength = PaymentLength.ONE_DAY;

            let validUntil = new Date();
            const startedAt = new Date();

            const STRIPE_PRODUCTS = getProductList();

            switch (productId) {
              case STRIPE_PRODUCTS.BB.ONE_DAY:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.ONE_DAY;
                validUntil.setDate(validUntil.getDate() + 1);
                break;
              case STRIPE_PRODUCTS.BB.ONE_MONTH:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.ONE_MONTH;
                validUntil.setMonth(validUntil.getMonth() + 1);
                break;
              case STRIPE_PRODUCTS.BB.ONE_YEAR:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.ONE_YEAR;
                validUntil.setFullYear(validUntil.getFullYear() + 1);
                break;
              case STRIPE_PRODUCTS.BB.LIFETIME:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.LIFETIME;
                break;
              case STRIPE_PRODUCTS.AA.ONE_YEAR:
                accountTier = AccountTier.ADVANCED_ALICE;
                paymentLength = PaymentLength.ONE_YEAR;
                validUntil.setFullYear(validUntil.getFullYear() + 1);
                break;

              case STRIPE_PRODUCTS.AA.ONE_MONTH:
                accountTier = AccountTier.ADVANCED_ALICE;
                paymentLength = PaymentLength.ONE_MONTH;
                validUntil.setMonth(validUntil.getMonth() + 1);
                break;
              case STRIPE_PRODUCTS.AA.ONE_YEAR:
                accountTier = AccountTier.ADVANCED_ALICE;
                paymentLength = PaymentLength.ONE_YEAR;
                validUntil.setFullYear(validUntil.getFullYear() + 1);
                break;
              case STRIPE_PRODUCTS.AA.LIFETIME:
                accountTier = AccountTier.ADVANCED_ALICE;
                paymentLength = PaymentLength.LIFETIME;
                break;
              default:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.ONE_DAY;
            }

            const updatedPayment = await prisma.payment.update({
              where: {
                id: payment.id,
              },
              data: {
                validUntil,
                startedAt,
                status: "PAID",
                paymentProcessorMetadata: JSON.stringify(event.data.object),
                paymentDate: startedAt,
                stripeSubscriptionId: event.data.object.subscription,
                stripePaymentIntentId: paymentIntentId,
                paymentLength: paymentLength,
                accountTier: accountTier,
              },
              include: {
                User: true,
              },
            });

            // need to create a link for the user to access their account

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

              const link = `${getBaseUrl()}/profile?createLogin=true&token=${token}`;

              sendEmailNotificationHelper({
                emailTo: [updatedPayment.User.email],
                title: "Your payment was successful",
                subject: "Thank you for your payment",

                subtitle: "Thank you joining BitScript",
                footerText:
                  "Manage your subscription through your settings page on BitScript",
                button: {
                  text: "Get Started",
                  link: link,
                },
              });
            }

            // update the payment as paid
          } else {
            // this is a renewal payment and this was not created through the portal

            // need to fetch the invoice to get the product id to know what tier this is
            const invoice = await stripe.invoices.retrieve(
              event.data.object.id
            );
            if (!invoice) {
              return res.status(400).end();
            }

            const productId = invoice.lines.data[0].price.id;

            let accountTier: AccountTier = AccountTier.BEGINNER_BOB;
            let paymentLength: PaymentLength = PaymentLength.ONE_DAY;

            let validUntil = new Date();

            const STRIPE_PRODUCTS = getProductList();

            switch (productId) {
              case STRIPE_PRODUCTS.BB.ONE_DAY:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.ONE_DAY;
                validUntil.setDate(validUntil.getDate() + 1);
                break;
              case STRIPE_PRODUCTS.BB.ONE_MONTH:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.ONE_MONTH;
                validUntil.setMonth(validUntil.getMonth() + 1);
                break;
              case STRIPE_PRODUCTS.BB.ONE_YEAR:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.ONE_YEAR;
                validUntil.setFullYear(validUntil.getFullYear() + 1);
                break;
              case STRIPE_PRODUCTS.BB.LIFETIME:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.LIFETIME;
                break;
              case STRIPE_PRODUCTS.AA.ONE_YEAR:
                accountTier = AccountTier.ADVANCED_ALICE;
                paymentLength = PaymentLength.ONE_YEAR;
                validUntil.setFullYear(validUntil.getFullYear() + 1);
                break;

              case STRIPE_PRODUCTS.AA.ONE_MONTH:
                accountTier = AccountTier.ADVANCED_ALICE;
                paymentLength = PaymentLength.ONE_MONTH;
                validUntil.setMonth(validUntil.getMonth() + 1);
                break;
              case STRIPE_PRODUCTS.AA.ONE_YEAR:
                accountTier = AccountTier.ADVANCED_ALICE;
                paymentLength = PaymentLength.ONE_YEAR;
                validUntil.setFullYear(validUntil.getFullYear() + 1);
                break;
              case STRIPE_PRODUCTS.AA.LIFETIME:
                accountTier = AccountTier.ADVANCED_ALICE;
                paymentLength = PaymentLength.LIFETIME;
                break;
              default:
                accountTier = AccountTier.BEGINNER_BOB;
                paymentLength = PaymentLength.ONE_DAY;
            }

            const lastPayment = await prisma.payment.findMany({
              where: {
                paymentProcessor: "STRIPE",
                stripeCustomerId: customerId,
              },
              orderBy: {
                createdAt: "desc",
              },
              include: {
                User: true,
              },
            });

            if (!lastPayment) {
              // we have a problem
              return res.status(400).end();
            }

            const newPayment = await prisma.payment.create({
              data: {
                status: "PAID",
                paymentDate: paymentDate,
                hasAccess: true,
                stripeCustomerId: customerId,
                stripePaymentIntentId: paymentIntentId,
                amount: totalPaid,
                paymentOption: "USD",
                paymentLength: paymentLength,
                accountTier: accountTier,
                paymentProcessor: "STRIPE",
                paymentProcessorId: "",
                userId: lastPayment[0].userId,
                startedAt: new Date(),
                validUntil: validUntil,
                paymentProcessorMetadata: JSON.stringify(event.data.object),
              },
            });

            if (lastPayment[0].User) {
              sendEmailNotificationHelper({
                emailTo: [lastPayment[0].User.email],
                title: "Your payment was successful",
                subject: "Thank you for your payment",
                subtitle: "Your Renewal Payment was Successful",
                footerText:
                  "Manage your subscription through your settings page on BitScript",
              });
            }
          }
        }

        // make a new payment object tied to the user and customer id

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
