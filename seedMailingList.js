
import {PrismaClient} from "@prisma/client"

const prisma = new PrismaClient();
const seedMailingList = async () => {
  const users = await prisma.user.findMany();
  const emails = users.map((user) => user.email);
  console.log(emails);
  const mailingList = await prisma.mailingList.createMany({
    data: emails.map((email) => ({
      email,
    })),
    skipDuplicates: true,
  });
  console.log(mailingList);
};

seedMailingList().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
