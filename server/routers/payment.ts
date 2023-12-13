import { z } from "zod";
import {
  createClientBasedPayment,
  getBaseUrl,
  procedure,
  router,
} from "../trpc";
import { AccountTier, PaymentStatus, PrismaClient, User } from "@prisma/client";
import fetch from "node-fetch";
import { PaymentLength, PaymentOption, PaymentProcessor } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  AccountTierZod,
  PaymentLengthZod,
  PaymentOptionZod,
  PaymentZod,
} from "@server/zod";
import jwt from "jsonwebtoken";

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export const getProductList = () => {
  const env = process.env.VERCEL_ENV === "production" ? "prod" : "test";

  if (env === "prod") {
    return STRIPE_PRODUCTION_PRODUCTS;
  } else {
    return STRIPE_STAGING_PRODUCTS;
  }
};

export const STRIPE_PRODUCTION_PRODUCTS = {
  AA: {
    ONE_DAY: "price_1OIMB3L0miwPwF3TXzycMG9W",
    ONE_MONTH: "price_1OMDSpL0miwPwF3TgDuT8O3Z",
    ONE_YEAR: "price_1OMDTeL0miwPwF3Tze5zEprb",
    LIFETIME: "price_1OMDUpL0miwPwF3TUA3Vj19G",
  },
  BB: {
    ONE_DAY: "price_1OIMNjL0miwPwF3T7SN07dHE",
    ONE_MONTH: "price_1OJ09DL0miwPwF3Ttc3RW8DL",
    ONE_YEAR: "price_1OJ0ALL0miwPwF3TWYWSYS9k",
    LIFETIME: "price_1OJ0BnL0miwPwF3Tof7oh87M",
  },
};
export const STRIPE_STAGING_PRODUCTS = {
  AA: {
    ONE_DAY: "price_1OIMB3L0miwPwF3TXzycMG9W",
    ONE_MONTH: "price_1OIMB3L0miwPwF3TXzycMG9W",
    ONE_YEAR: "price_1OIMB3L0miwPwF3TXzycMG9W",
    LIFETIME: "price_1OIcgbL0miwPwF3TLA9eBHx1",
  },
  BB: {
    ONE_DAY: "price_1OIMNjL0miwPwF3T7SN07dHE",
    ONE_MONTH: "price_1OIMNjL0miwPwF3T7SN07dHE",
    ONE_YEAR: "price_1OIMNjL0miwPwF3T7SN07dHE",
    LIFETIME: "price_1OIchpL0miwPwF3TCNvu6rAF",
  },
};

export const PRODUCTS_OPEN_NODE = {
  AA: {
    ONE_YEAR: 2893000,
    LIFETIME: 5780000,
    THREE_MONTHS: 420000,
  },
  BB: {
    ONE_YEAR: 630000,
    LIFETIME: 1800000,
  },
};

export const createCharge = procedure
  .input(
    z.object({
      paymentOption: PaymentOptionZod,
      length: PaymentLengthZod,
      tier: AccountTierZod,
      email: z.string().nullable(),
    })
  )
  .output(PaymentZod)
  .mutation(async (opts) => {
    try {
      //opts.ctx.

      let product = PRODUCTS_OPEN_NODE.BB.ONE_YEAR;

      const tier = opts.input.tier as AccountTier;

      console.log(
        "tier === AccountTier.ADVANCED_ALICE",
        tier === AccountTier.ADVANCED_ALICE
      );
      console.log(
        "tier === AccountTier.BEGINNER_BOB",
        tier === AccountTier.BEGINNER_BOB
      );
      let tierText = "";
      console.log("tier", tier);
      const length = opts.input.length as PaymentLength;
      //const length = "THREE_MONTHS" as PaymentLength;

      if (tier === AccountTier.BEGINNER_BOB) {
        if (length === "LIFETIME") {
          product = PRODUCTS_OPEN_NODE.BB.LIFETIME;
          tierText = "Beginner Bob - Lifetime";
        } else if (length === "ONE_YEAR") {
          product = PRODUCTS_OPEN_NODE.BB.ONE_YEAR;
          tierText = "Beginner Bob - One Year";
        }
      } else if (tier === AccountTier.ADVANCED_ALICE) {
        if (length === "LIFETIME") {
          product = PRODUCTS_OPEN_NODE.AA.LIFETIME;
          tierText = "Advanced Alice - Lifetime";
        } else if (length === "ONE_YEAR") {
          product = PRODUCTS_OPEN_NODE.AA.ONE_YEAR;
          tierText = "Advanced Alice - One Year";
        } else if (length === "THREE_MONTHS") {
          product = PRODUCTS_OPEN_NODE.AA.THREE_MONTHS;
          tierText = "Advanced Alice - Three Months";
        }
      }

      // ensuring there is either a temp user model or a already created model (with pw)
      let user: null | User = null;

      if (opts.ctx.user) {
        user = await opts.ctx.prisma.user.findUnique({
          where: {
            id: opts.ctx.user.id,
          },
        });
      } else if (opts.input.email !== null) {
        const userCheck = await opts.ctx.prisma.user.findUnique({
          where: {
            email: opts.input.email,
          },
        });

        if (userCheck && userCheck.hashedPassword !== "") {
          throw new Error("Email already in use");
        } else if (userCheck && userCheck.hashedPassword === "") {
          user = userCheck;
        } else {
          user = await opts.ctx.prisma.user.create({
            data: {
              email: opts.input.email,
              hashedPassword: "",
            },
          });
        }
      } else {
        throw new Error("Email to contact user could not be found ");
      }

      // assert user is not null by this point
      if (user === null) {
        throw new Error("User not found");
      }

      const prePayment = await opts.ctx.prisma.payment.create({
        data: {
          amount: product,

          paymentOption: opts.input.paymentOption,
          accountTier: opts.input.tier as AccountTier,
          paymentLength: opts.input.length as PaymentLength,
          paymentProcessorId: "",
          paymentProcessor: "OPEN_NODE",
          //paymentProcessorMetadata: cleanRes.data,
          hostedCheckoutUrl: "",
          status: PaymentStatus.PROCESSING,
          userId: user.id,
        },
      });

      const salt = process.env.TOKEN_SALT || "fry";
      // create a reset token
      const token = jwt.sign({ id: user.id, email: user.email }, salt);

      // create openode charge
      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: process.env.OPEN_NODE_API_KEY || "",
        },
        body: JSON.stringify({
          amount: product,
          currency: "BTC",
          description: tierText,
          auto_settle: false,
          success_url: `${getBaseUrl()}/profile?createLogin=true&token=${token}`,
          callback_url: `${getBaseUrl()}/api/opennodeWebhook`,
        }),
      };
      const openNodeRes = await fetch(
        "https://api.opennode.com/v1/charges",
        options
      );
      const cleanRes: any = await openNodeRes.json();

      // check the status first transaction with a btc address
      // check the memepool of all transactions from a btc address

      // save charge info to db (prisma)

      console.log("cleanRes", cleanRes);
      const payment = await opts.ctx.prisma.payment.update({
        where: {
          id: prePayment.id,
        },
        data: {
          amount: product,

          paymentProcessorId: cleanRes.data.id,

          hostedCheckoutUrl: cleanRes.data.hosted_checkout_url,
        },
      });

      const paymentRes = createClientBasedPayment(payment);

      return paymentRes;
    } catch (err: any) {
      console.log("err", err);
      // throw a trpc error
      throw new Error(err);
    }
  });

export const createStripeCharge = procedure
  .input(
    z.object({
      length: PaymentLengthZod,
      tier: AccountTierZod,
      email: z.string().nullable(),
    })
  )
  .output(PaymentZod)
  .mutation(async (opts) => {
    console.log("opts", opts.input);
    try {
      // figure out what product

      // default should be cheapest
      let product;

      let mode = "subscription";

      const tier = opts.input.tier as AccountTier;

      console.log(tier === AccountTier.ADVANCED_ALICE);

      const STRIPE_PRODUCTS = getProductList();

      let amount = 10000;
      if (tier === AccountTier.BEGINNER_BOB) {
        if (opts.input.length === "LIFETIME") {
          product = STRIPE_PRODUCTS.BB.LIFETIME;

          mode = "payment";
        } else if (opts.input.length === "ONE_YEAR") {
          product = STRIPE_PRODUCTS.BB.ONE_YEAR;
        } else if (opts.input.length === "ONE_MONTH") {
          product = STRIPE_PRODUCTS.BB.ONE_MONTH;
        } else {
          product = STRIPE_PRODUCTS.BB.ONE_MONTH;
        }
      } else if (tier === AccountTier.ADVANCED_ALICE) {
        console.log("advanced alice");
        if (opts.input.length === "LIFETIME") {
          product = STRIPE_PRODUCTS.AA.LIFETIME;

          mode = "payment";
        } else if (opts.input.length === "ONE_YEAR") {
          product = STRIPE_PRODUCTS.AA.ONE_YEAR;
        } else if (opts.input.length === "ONE_MONTH") {
          product = STRIPE_PRODUCTS.AA.ONE_MONTH;
        } else {
          product = STRIPE_PRODUCTS.AA.ONE_MONTH;
        }
      }

      console.log("product", product);
      // check if their are any previous payments for this user that may have a stripe custoemr id

      let stripeCustomerId = null;
      let user: null | User = null;
      // if the user is logged in then
      /* 
        - they already have a payment at least made which means they have a stripe customer id
      */
      if (opts.ctx.user) {
        user = await opts.ctx.prisma.user.findUnique({
          where: {
            id: opts.ctx.user.id,
          },
        });
        const lastPayment = await opts.ctx.prisma.payment.findFirst({
          where: {
            userId: opts.ctx.user.id,
            stripeCustomerId: {
              not: null,
            },
            status: "PAID",
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        if (lastPayment) {
          stripeCustomerId = lastPayment.stripeCustomerId;
        }
      } else if (opts.input.email !== null) {
        const createStripeCustomer = await stripe.customers.create({
          description: "BitScript Stripe Customer",
          email: opts.input.email,
        });
        stripeCustomerId = createStripeCustomer.id;

        // must check that the email passed dones't already exist

        const userCheck = await opts.ctx.prisma.user.findUnique({
          where: {
            email: opts.input.email,
          },
        });

        if (userCheck && userCheck.hashedPassword !== "") {
          throw new Error("Email already in use");
        } else if (userCheck && userCheck.hashedPassword === "") {
          user = userCheck;
        } else {
          user = await opts.ctx.prisma.user.create({
            data: {
              email: opts.input.email,
              hashedPassword: "",
            },
          });
        }
      } else {
        throw new Error("Email to contact user could not be found ");
      }

      // this should never run
      if (stripeCustomerId === null) {
        const createStripeCustomer = await stripe.customers.create({
          description: "BitScript Stripe Customer",
        });

        stripeCustomerId = createStripeCustomer.id;
      }

      // ensure that user is not empty
      if (user === null) {
        throw new Error("User not found");
      }

      // create a empty user model that will hold the contact email (user can changed this later when creating their account)

      // create payment first so i can have the payment in the url callback
      const initialPayment = await opts.ctx.prisma.payment.create({
        data: {
          amount: amount,
          status: PaymentStatus.PROCESSING,
          paymentOption: "USD",
          accountTier: opts.input.tier as AccountTier,
          paymentLength: opts.input.length as PaymentLength,
          paymentProcessorId: "",
          paymentProcessor: "STRIPE",

          hostedCheckoutUrl: "",
          stripeCustomerId: stripeCustomerId,
          userId: user.id,
        },
      });

      const salt = process.env.TOKEN_SALT || "fry";
      // create a reset token
      const token = jwt.sign({ id: user.id, email: user.email }, salt);

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: product,
            quantity: 1,
          },
        ],
        customer: stripeCustomerId,
        mode: mode,
        success_url: `${getBaseUrl()}/profile?createLogin=true&token=${token}`,
        cancel_url: `${getBaseUrl()}/profile/?canceled=true&paymentId=${
          initialPayment.id
        }`,
        automatic_tax: { enabled: true },
        customer_update: {
          address: "auto",
        },
      });

      console.log("stripe session", session);
      const payment = await opts.ctx.prisma.payment.update({
        where: {
          id: initialPayment.id,
        },
        data: {
          paymentProcessorId: session.id,
          paymentProcessorMetadata: session,
          hostedCheckoutUrl: session.url,
          stripePaymentIntentId: session.payment_intent,
        },
      });

      const paymentRes = createClientBasedPayment(payment);

      return paymentRes;
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const createStripeCustomerPortal = procedure
  .output(z.string())
  .mutation(async (opts) => {
    try {
      // ensure their a user tied to ctx
      if (opts.ctx.user) {
        // fetch the latest payment for this user
        const payment = await opts.ctx.prisma.payment.findFirst({
          where: {
            userId: opts.ctx.user.id,
            stripeCustomerId: {
              not: null,
            },
            status: "PAID",
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        // if the user is able to see the customer portal than they should have at least paid with stripe once before
        // other wise its' their first stripe payment & they should use the checkout session
        if (!payment) {
          throw new Error("No Stripe Customer ID found tied to user");
        }

        const stripeCustomerId = payment.stripeCustomerId;
        //fetch the customer portal

        const session = await stripe.billingPortal.sessions.create({
          customer: stripeCustomerId,
          return_url: `${getBaseUrl()}/settings`,
        });

        if (!session) {
          throw new Error("No customer portal session found");
        }

        return session.url;
      } else {
        throw new Error("No user found");
      }
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const fetchPayment = procedure
  .input(
    z.object({
      paymentId: z.number(),
    })
  )
  .output(PaymentZod)
  .query(async (opts) => {
    try {
      const payment = await opts.ctx.prisma.payment.findUnique({
        where: {
          id: opts.input.paymentId,
        },
      });

      if (!payment) {
        throw new Error("Payment not found");
      }

      const paymentRes = createClientBasedPayment(payment);

      return paymentRes;
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const checkIfEmailAlreadyExists = procedure
  .input(
    z.object({
      email: z.string(),
    })
  )
  .output(z.boolean())
  .mutation(async (opts) => {
    try {
      const user = await opts.ctx.prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
      });

      if (user && user.hashedPassword !== "") {
        throw new Error(
          "Email already in use, please login or use a different email"
        );
      } else {
        return false;
      }
    } catch (err: any) {
      throw new Error(err);
    }
  });
