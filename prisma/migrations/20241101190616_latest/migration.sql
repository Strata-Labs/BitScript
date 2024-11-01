-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('INIVIDUAL', 'TEAM');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('FREE', 'BEGINNER', 'ADVANCED');

-- CreateEnum
CREATE TYPE "PaymentProcessor" AS ENUM ('STRIPE', 'OPEN_NODE');

-- CreateEnum
CREATE TYPE "AccountTier" AS ENUM ('BEGINNER_BOB', 'ADVANCED_ALICE');

-- CreateEnum
CREATE TYPE "PaymentLength" AS ENUM ('ONE_MONTH', 'ONE_YEAR', 'LIFETIME', 'ONE_DAY', 'THREE_MONTHS');

-- CreateEnum
CREATE TYPE "PaymentOption" AS ENUM ('USD', 'BTC', 'LIGHTNING');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('CREATED', 'PROCESSING', 'PAID', 'UNPAID', 'REFUNDED', 'FAILED');

-- CreateEnum
CREATE TYPE "ScriptType" AS ENUM ('FREEFORM', 'PUBKEY_SIGSCRIPT', 'PUBKEY_WITNESS');

-- AlterTable
ALTER TABLE "IPAddress" ADD COLUMN     "cooldownEnd" TIMESTAMP(3),
ADD COLUMN     "hashedUserAgent" TEXT,
ADD COLUMN     "queryCount" INTEGER NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cooldownEnd" TIMESTAMP(3),
ADD COLUMN     "emailVerified" TIMESTAMP(3),
ADD COLUMN     "queryCount" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "teamId" INTEGER,
ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT 'FREE',
ADD COLUMN     "verifiedEmail" TEXT;

-- CreateTable
CREATE TABLE "Lesson" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lessonId" INTEGER NOT NULL,

    CONSTRAINT "Lesson_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QueryTracking" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "userId" INTEGER,
    "transactionQueryCount" INTEGER NOT NULL DEFAULT 3,
    "transactionQueryCooldownEnd" TIMESTAMP(3),
    "rpcQueryCount" INTEGER NOT NULL DEFAULT 3,
    "rpcQueryCooldownEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QueryTracking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queries" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "userType" "UserType" NOT NULL DEFAULT 'BEGINNER',
    "queryCount" INTEGER NOT NULL DEFAULT 3,
    "cooldownEnd" TIMESTAMP(3),

    CONSTRAINT "Queries_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    "paymentDate" TIMESTAMP(3),
    "status" "PaymentStatus" NOT NULL DEFAULT 'CREATED',
    "amount" INTEGER NOT NULL,
    "accountTier" "AccountTier" NOT NULL DEFAULT 'BEGINNER_BOB',
    "paymentOption" "PaymentOption" NOT NULL,
    "paymentLength" "PaymentLength" NOT NULL,
    "validUntil" TIMESTAMP(3),
    "startedAt" TIMESTAMP(3),
    "hasAccess" BOOLEAN NOT NULL DEFAULT false,
    "paymentProcessor" "PaymentProcessor" NOT NULL,
    "paymentProcessorId" TEXT NOT NULL,
    "stripeCustomerId" TEXT,
    "stripeSubscriptionId" TEXT,
    "stripePaymentIntentId" TEXT,
    "paymentProcessorMetadata" JSONB,
    "hostedCheckoutUrl" TEXT,
    "paymentType" "PaymentType" NOT NULL DEFAULT 'INIVIDUAL',
    "teamId" INTEGER,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Team" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stripeProductId" TEXT NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserHistory" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "metadata" JSONB,

    CONSTRAINT "UserHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SandboxScript" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "scriptType" "ScriptType" NOT NULL,
    "freeformContent" TEXT,
    "pubkeyScript" TEXT,
    "sigScript" TEXT,
    "witnessScript" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SandboxScript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookmarkScript" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "scriptId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookmarkScript_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MailingList" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "subscribed" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MailingList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "QueryTracking_address_key" ON "QueryTracking"("address");

-- CreateIndex
CREATE INDEX "SandboxScript_userId_idx" ON "SandboxScript"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "MailingList_email_key" ON "MailingList"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QueryTracking" ADD CONSTRAINT "QueryTracking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queries" ADD CONSTRAINT "Queries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserHistory" ADD CONSTRAINT "UserHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SandboxScript" ADD CONSTRAINT "SandboxScript_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookmarkScript" ADD CONSTRAINT "BookmarkScript_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
