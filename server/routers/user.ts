import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { procedure } from "../trpc";
import { PaymentZod, UserZod } from "@server/zod";

export const createAccountLogin = procedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
      paymentId: z.number(),
    })
  )
  .output(
    z.object({
      user: UserZod,
      payment: PaymentZod,
    })
  )
  .mutation(async (opts) => {
    try {
      // check to ensure email is not already in use
      const emailCheck = await opts.ctx.prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
      });

      if (emailCheck) {
        throw new Error("Email already in use");
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(opts.input.password, 10);

      // create the user
      const user = await opts.ctx.prisma.user.create({
        data: {
          email: opts.input.email,
          hashedPassword: hashedPassword,
          Payment: {
            connect: {
              id: opts.input.paymentId,
            },
          },
        },
        include: {
          Payment: true,
        },
      });

      if (user && user.Payment.length > 0) {
        const userPayment = user.Payment[0];

        const paymentTing = {
          id: userPayment.id,
          createdAt: userPayment.createdAt,
          status: userPayment.status,
          amount: userPayment.amount,
          paymentOption: userPayment.paymentOption,
          paymentLength: userPayment.paymentLength,
          paymentProcessor: userPayment.paymentProcessor,
          paymentProcessorId: userPayment.paymentProcessorId,
          validUntil: userPayment.validUntil,
          startedAt: userPayment.startedAt,
          paymentDate: userPayment.paymentDate,
          hasAccess: userPayment.hasAccess,
          userId: userPayment.userId,
          hostedCheckoutUrl: userPayment.hostedCheckoutUrl,
          User: null,
          paymentProcessorMetadata: userPayment.paymentProcessorMetadata,
        };
        const userRes = {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          hashedPassword: user.hashedPassword,
          sessionToken: null,
        };

        console.log("userRes", userRes);
        console.log("paymentTing", paymentTing);

        return {
          user: userRes,
          payment: paymentTing,
          shitfuck: userRes,
        };
      }

      throw new Error("Could not create login info");
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const checkUserSession = procedure
  .output(
    z.object({
      payment: PaymentZod,
      user: UserZod,
    })
  )
  .query(async (opts) => {
    try {
      if (opts.ctx.user) {
        const user = await opts.ctx.prisma.user.findUnique({
          where: {
            id: opts.ctx.user.id,
          },
          include: {
            Payment: true,
          },
        });

        if (user && user.Payment.length > 0) {
          const userPayment = user.Payment[0];

          const paymentTing = {
            id: userPayment.id,
            createdAt: userPayment.createdAt,
            status: userPayment.status,
            amount: userPayment.amount,
            paymentOption: userPayment.paymentOption,
            paymentLength: userPayment.paymentLength,
            paymentProcessor: userPayment.paymentProcessor,
            paymentProcessorId: userPayment.paymentProcessorId,
            validUntil: userPayment.validUntil,
            startedAt: userPayment.startedAt,
            paymentDate: userPayment.paymentDate,
            hasAccess: userPayment.hasAccess,
            userId: userPayment.userId,
            hostedCheckoutUrl: userPayment.hostedCheckoutUrl,
            User: null,
            paymentProcessorMetadata: userPayment.paymentProcessorMetadata,
          };
          const userRes = {
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            hashedPassword: user.hashedPassword,
            sessionToken: null,
          };

          console.log("userRes", userRes);
          console.log("paymentTing", paymentTing);

          return {
            user: userRes,
            payment: paymentTing,
            shitfuck: userRes,
          };
        }

        throw new Error("No payment found for user");
      } else {
        throw new Error("No user found with that session token");
      }
    } catch (err: any) {
      throw new Error(err);
    }
  });
export const loginUser = procedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  )
  .output(
    z.object({
      user: UserZod,
      payment: PaymentZod,
    })
  )
  .mutation(async (opts) => {
    try {
      // check to ensure email is not already in use
      const user = await opts.ctx.prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
        include: {
          Payment: true,
        },
      });

      if (!user) {
        throw new Error("Email and password combination could not be found");
      }

      // check the password
      const valid = await bcrypt.compare(
        opts.input.password,
        user.hashedPassword
      );

      if (!valid) {
        throw new Error("Email and password combination could not be found");
      }

      if (user && user.Payment.length > 0) {
        const userPayment = user.Payment[0];

        const paymentTing = {
          id: userPayment.id,
          createdAt: userPayment.createdAt,
          status: userPayment.status,
          amount: userPayment.amount,
          paymentOption: userPayment.paymentOption,
          paymentLength: userPayment.paymentLength,
          paymentProcessor: userPayment.paymentProcessor,
          paymentProcessorId: userPayment.paymentProcessorId,
          validUntil: userPayment.validUntil,
          startedAt: userPayment.startedAt,
          paymentDate: userPayment.paymentDate,
          hasAccess: userPayment.hasAccess,
          userId: userPayment.userId,
          hostedCheckoutUrl: userPayment.hostedCheckoutUrl,
          User: null,
          paymentProcessorMetadata: userPayment.paymentProcessorMetadata,
        };

        var token = jwt.sign({ id: user.id, email: user.email }, "fry");

        const userRes = {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          hashedPassword: user.hashedPassword,
          sessionToken: token,
        };

        console.log("userRes", userRes);
        console.log("paymentTing", paymentTing);

        return {
          user: userRes,
          payment: paymentTing,
        };
      }
      throw new Error("Could not find payment tied to account");
    } catch (err: any) {
      console.log("err", err);

      throw new Error(err);
    }
  });
