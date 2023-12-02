/*
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  // Create a dummy hashed password
  const dummyPassword = "dummy_password";
  const hashedPassword = await bcrypt.hash(dummyPassword, 10); // Hash the dummy password

  const freeUser = await prisma.user.create({
    data: {
      email: "free_user@example.com",
      hashedPassword: hashedPassword,
    },
  });

  console.log(`Created free user with ID ${freeUser.id}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  */
