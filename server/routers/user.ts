import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma } from "@prisma/client";

import { getBaseUrl, procedure } from "../trpc";
import { PaymentZod, UserZod } from "@server/zod";
import {
  createEmailTemplate,
  createHtmlButtonForEmail,
  sendEmail,
} from "@server/emailHelper";
export const updateUserPassword = procedure
  .input(
    z.object({
      password: z.string(),
    })
  )
  .output(UserZod)
  .mutation(async (opts) => {
    try {
      // ensure the user is logged in
      if (!opts.ctx.user) {
        throw new Error("You must be logged in to perform this action");
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(opts.input.password, 10);

      // update the user
      const user = await opts.ctx.prisma.user.update({
        where: {
          id: opts.ctx.user.id,
        },
        data: {
          hashedPassword: hashedPassword,
        },
      });

      const email = createEmailTemplate(
        "Your Password Has Been Changed",
        "Please contact us if you did not change your password",
        ""
      );

      const res = await sendEmail({
        to: user.email,
        subject: "Your Password Has Been Changed",
        message: "Your Password Has Been Changed",
        html: email,
      });

      if (user) {
        return {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          hashedPassword: user.hashedPassword,
          sessionToken: null,
        };
      }

      throw new Error("Could not update password");
    } catch (err: any) {
      throw new Error(err);
    }
  });

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

        const paymentTing = createClientBasedPayment(userPayment);
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

          const paymentTing = createClientBasedPayment(userPayment);

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

// idea is to parse the payment obj returned by prisma and clean it up to ensure the client always gets the right data
// 1) is `hasAccess` correct since this is based on the payment type & payment length
// 2) ensure data wrapping is correct on dates, remove the relationship from the user model if returned
export const createClientBasedPayment = (
  payment: any
): z.infer<typeof PaymentZod> => {
  //const payment = _payment.scalars;

  const paymentLength = payment.paymentLength;
  const startedAt = payment.startedAt;

  let hasAccess = false;
  if (paymentLength === "LIFETIME") {
    hasAccess = true;
  } else if (paymentLength === "ONE_MONTH") {
    // ensure startedAt was less than a month ago
    // check if startedAt date was less than a month ago
    if (startedAt) {
      const now = new Date();
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1));
      if (startedAt < monthAgo) {
        hasAccess = true;
      }
    }
  } else if (paymentLength === "ONE_YEAR") {
    // same as above but with a year
    if (startedAt) {
      const now = new Date();
      const yearAgo = new Date(now.setFullYear(now.getFullYear() - 1));
      if (startedAt < yearAgo) {
        hasAccess = true;
      }
    }
  }

  const paymentTing = createClientBasedPayment(payment);
  return paymentTing;
};
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
          Payment: {
            orderBy: {
              createdAt: Prisma.SortOrder.desc,
            },
          },
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

        const paymentTing = createClientBasedPayment(userPayment);

        // create jwt
        const salt = process.env.TOKEN_SALT || "fry";
        var token = jwt.sign({ id: user.id, email: user.email }, salt);

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

//forgot password
export const forgotPassword = procedure
  .input(
    z.object({
      email: z.string(),
    })
  )
  .output(z.boolean())
  .mutation(async (opts) => {
    try {
      // ensure their is a user tied to the email
      const user = await opts.ctx.prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
      });

      if (!user) {
        throw new Error("Email not found");
      }

      const salt = process.env.TOKEN_SALT || "fry";
      // create a reset token
      const token = jwt.sign({ id: user.id, email: user.email }, salt);

      const link = `${getBaseUrl()}resetPassword=true&refreshToken=${token}`;

      const button = createHtmlButtonForEmail("Reset Password", link);
      const email = createEmailTemplate(
        "Reset Password",
        "Click link to reset your password",
        button
      );

      const res = await sendEmail({
        to: user.email,
        subject: "Reset Password",
        message: "Reset Password",
        html: email,
      });

      return true;
    } catch (err: any) {
      throw new Error(err);
    }
  });

// const createAccountsManually = procedure
// .query(async (opts) => {
//   try {

//   } catch(err: any) {
//     throw new Error(err)
//   }
// })
