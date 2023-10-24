import { z } from "zod";

import { procedure, router } from "../trpc";
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch";
import { PaymentLength, PaymentOption, PaymentProcessor } from "@prisma/client";
import bcrypt from "bcrypt";
import { UserZod } from "@server/zod";

const prisma = new PrismaClient();

export const createAccountLogin = procedure
  .input(
    z.object({
      email: z.string(),
      password: z.string(),
      paymentId: z.number(),
    })
  )
  .output(UserZod)
  .mutation(async (opts) => {
    try {
      // check to ensure email is not already in use
      const emailCheck = await prisma.user.findUnique({
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
      const user = await prisma.user.create({
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

      const userRes = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        hashedPassword: user.hashedPassword,
        ips: [],
        Payment: user.Payment,
      };

      return userRes;
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
  .output(UserZod)
  .mutation(async (opts) => {
    try {
      // check to ensure email is not already in use
      const user = await prisma.user.findUnique({
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

      const userRes = {
        id: user.id,
        email: user.email,
        createdAt: user.createdAt,
        hashedPassword: user.hashedPassword,
        ips: [],
        Payment: user.Payment,
      };

      console.log("userRes", userRes);
      return userRes;
    } catch (err: any) {
      console.log("err", err);

      throw new Error(err);
    }
  });
