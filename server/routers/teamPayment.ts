import { AccountTier, PaymentLength, PrismaClient, Team } from "@prisma/client";
import { procedure } from "@server/trpc";
import { z } from "zod";
/* 
  in order to create a team payment we need a couple things before hand
  1) the stripe payment product for this team
  2) the emails of the users and the tier of each of them something like this
  [
    {
      email: 'b@setbern.com'
      tier: 'BEGINNER_BOB'
    },
    {
      email: 'wyn@setbern.com'
      tier: 'ADVANCED_ALICE'
    }
  ]
  3) the team name

*/

const createUser = async (
  teamId: number,
  email: string,
  tier: AccountTier,
  paymentLength: PaymentLength,
  prisma: PrismaClient
) => {
  try {
    // create a user with their email
    const user = await prisma.user.create({
      data: {
        email,
        hashedPassword: "",

        team: {
          connect: {
            id: teamId,
          },
        },
      },
    });

    const payment = await prisma.payment.create({
      data: {
        paymentProcessor: "STRIPE",
        status: "CREATED",
        amount: 0,
        accountTier: tier,
        paymentOption: "USD",
        paymentLength,
        hasAccess: false,
        paymentType: "TEAM",
        paymentProcessorId: "TEAM_PAYMENT",
        User: {
          connect: {
            id: user.id,
          },
        },
        team: {
          connect: {
            id: teamId,
          },
        },
      },
    });
    // create a empty payment

    return true;
  } catch (err: any) {
    throw new Error(err);
  }
};

const testUsers = [
  {
    email: "pete@liquidium.fi",
    tier: AccountTier.ADVANCED_ALICE,
  },
  {
    email: "luke@liquidium.fi ",
    tier: AccountTier.BEGINNER_BOB,
  },
];
export const createTeam = procedure
  .output(z.boolean())
  .mutation(async (opts) => {
    const stripeProductId = "price_1OK6mRL0miwPwF3TDf8y6Pa3";
    const stripeCustomerId = "cus_P8NaxiI4zJKbLQ";
    try {
      // create the team
      console.log("creating team");

      const team = await opts.ctx.prisma.team.create({
        data: {
          name: "Liquidium Team",
          stripeProductId,
          stripeCustomerId,
        },
      });

      // create the users
      console.log("creating users");
      for (const user of testUsers) {
        await createUser(
          team.id,
          user.email,
          user.tier,
          PaymentLength.ONE_MONTH,
          opts.ctx.prisma
        );
      }

      return true;
      // first need to create the users and their payments
    } catch (err: any) {
      throw new Error(err);
    }
  });

export const handleTeamPayment = async (team: Team, prisma: PrismaClient) => {
  try {
    // update the team payments to work with the new team
    // fetch the users and their most recent payment
    // fetch all the users with the team id and get the most recent payment
    const users = await prisma.user.findMany({
      where: {
        teamId: team.id,
      },
      include: {
        Payment: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    // loop through each user and either create a new paymennt or update the first payment to paid
    for (const user of users) {
      // check if the payment is in the user object
      if (user.Payment.length > 0) {
        // there has to always be a payment or else the tier for each has not been set and this breaks
        const payment = user.Payment[0];

        let validUntil = new Date();
        if (payment.paymentLength === "ONE_MONTH") {
          validUntil.setMonth(validUntil.getMonth() + 1);
        } else if (payment.paymentLength === "ONE_YEAR") {
          validUntil.setFullYear(validUntil.getFullYear() + 1);
        }

        // check the payment status
        const status = payment.status;
        if (status === "PAID") {
          // we can assume this is a renwal payment and need to create a new payment

          // need to get the valid until date

          // create a new payment for the user
          await prisma.payment.create({
            data: {
              paymentProcessor: "STRIPE",
              status: "PAID",
              amount: 0,
              accountTier: payment.accountTier,
              paymentOption: "USD",
              paymentLength: payment.paymentLength,
              hasAccess: true,
              paymentType: "TEAM",
              paymentProcessorId: "TEAM_PAYMENT",
              validUntil,
              startedAt: new Date(),
              User: {
                connect: {
                  id: user.id,
                },
              },
              team: {
                connect: {
                  id: team.id,
                },
              },
            },
          });
        } else {
          // this is the first team payment since the most recent is still unpaid ergo need to update the exisitng payment
          await prisma.payment.update({
            where: {
              id: payment.id,
            },
            data: {
              status: "PAID",
              validUntil,
              startedAt: new Date(),
              hasAccess: true,
            },
          });
        }
      }
    }
  } catch (err: any) {
    throw new Error(err);
  }
};

/* 
 then how can we determine if the payment has gone thorugh
 - we get a invoice succeded for the stripe payment
 - if we determine that the payment is a team payment we can 
 - okay so there two scenario of this payment
 - the first payment which will technically have a unpaid scenario
 - okay payment goes through
 - we determine it's a team payment
 - we get the team model 
 - we fetch the most recent payment for each user 
 - that means we need a payment and user modesl tied to the team
 -  so we fetch the most recent payment for each user
 - we check if the payment is paid or unpaid
 - if the payment is unpaid then we can assume it that it's a new renewal payment 
 1) if a renewal payment then we create a new payment for each user ensuring it's the same payment as before
 2) if it's the first payment then we just need to update the first payment for each user

*/
