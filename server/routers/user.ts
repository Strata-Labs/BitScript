import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Prisma, User } from "@prisma/client";
import { URL, URLSearchParams } from "url";

import { createClientBasedPayment, getBaseUrl, procedure } from "../trpc";
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
        to: [user.email],
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
          teamId: user.teamId,
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

      // hash the password
      const hashedPassword = await bcrypt.hash(opts.input.password, 10);

      let user: null | any = null;
      // create the user
      if (emailCheck) {
        user = await opts.ctx.prisma.user.update({
          where: {
            id: emailCheck.id,
          },
          data: {
            hashedPassword: hashedPassword,
          },
          include: {
            Payment: {
              orderBy: {
                createdAt: Prisma.SortOrder.desc,
              },
            },
          },
        });
      } else {
        user = await opts.ctx.prisma.user.create({
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
            Payment: {
              orderBy: {
                createdAt: Prisma.SortOrder.desc,
              },
            },
          },
        });
      }

      if (user && user.Payment.length > 0) {
        const userPayment = user.Payment[0];

        const paymentTing = createClientBasedPayment(userPayment);

        const salt = process.env.TOKEN_SALT || "fry";
        var token = jwt.sign({ id: user.id, email: user.email }, salt);

        const userRes = {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          hashedPassword: user.hashedPassword,
          sessionToken: token,
          teamId: user.teamId,
        };

        return {
          user: userRes,
          payment: paymentTing,
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
            Payment: {
              orderBy: {
                createdAt: Prisma.SortOrder.desc,
              },
            },
          },
        });

        if (!user) {
          throw new Error("No user found with that session token");
        }

        const userRes = {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          hashedPassword: user.hashedPassword,
          sessionToken: null,
          teamId: user.teamId,
        };

        return {
          user: UserZod.parse(userRes),
        };
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

      console.log("check -2s");

      if (user) {
        // create jwt token
        const salt = process.env.TOKEN_SALT || "fry";
        const token = jwt.sign({ id: user.id, email: user.email }, salt);

        const userRes = {
          id: user.id,
          email: user.email,
          createdAt: user.createdAt,
          hashedPassword: user.hashedPassword,
          sessionToken: token,
          teamId: user.teamId,
        };

        return {
          user: UserZod.parse(userRes),
        };
      }

      throw new Error("Could not create login info");
    } catch (err: any) {
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

      const baseUrl = `${getBaseUrl()}/profile`;
      const url = new URL(baseUrl);

      const searchParams = new URLSearchParams({
        resetPassword: "true",
        refreshToken: token,
      });

      url.search = searchParams.toString();


      const button = createHtmlButtonForEmail("Reset Password", url.href);
      const email = createEmailTemplate(
        "Reset Password",
        "Click link to reset your password",
        button
      );

      const res = await sendEmail({
        to: [user.email],
        subject: "Reset Password",
        message: "Reset Password",
        html: email,
      });

      return true;
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const createTeamUserLink = procedure
  .output(z.boolean())
  .mutation(async (opts) => {
    try {
      // fetch all the users that are linked to a team
      const users = await opts.ctx.prisma.user.findMany({
        where: {
          id: 7,
        },
      });

      // for each user create a link to our website that auto logs them in and shows a popup to create a password
      for (const user of users) {
        const salt = process.env.TOKEN_SALT || "fry";
        // create a reset token
        const token = jwt.sign({ id: user.id, email: user.email }, salt);

        const link = `https://www.bitscript.app/?createPassword=true&refreshToken=${token}`;
      }
      return true;
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const createUser = procedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
    })
  )
  .output(UserZod)
  .mutation(async (opts) => {
    try {
      // check if the email is already in use
      const userCheck = await opts.ctx.prisma.user.findUnique({
        where: {
          email: opts.input.email,
        },
      });

      if (userCheck) {
        throw new Error("Email already in use");
      }

      // hash the password
      const hashedPassword = await bcrypt.hash(opts.input.password, 10);

      const user = await opts.ctx.prisma.user.create({
        data: {
          email: opts.input.email,
          hashedPassword: hashedPassword,
        },
      });

      // create token for created User
      const salt = process.env.TOKEN_SALT || "fry";
      const token = jwt.sign({ id: user.id, email: user.email }, salt);

      const userObj = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        hashedPassword: user.hashedPassword,
        sessionToken: token,
      };

      return UserZod.parse(userObj);
    } catch (err: any) {
      throw new Error(err);
    }
  });

