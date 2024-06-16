import { Food } from "@/app/lib/definitions";
import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

const initialFoods: Food[] = [];

for (let i = 0; i < 8; i++) {
  initialFoods.push({
    datetime: faker.date.past(),
    ort: faker.location.city(),
    motivation: faker.lorem.words(),
    speisen: faker.lorem.words(),
    getraenke: faker.lorem.words(),
    beschwerden: faker.lorem.words()
  });
}

const seed = async () => {
  // clean up before the seeding (optional)
  await prisma.food.deleteMany();

  // you could also use createMany
  // but it is not supported for databases
  // e.g. SQLite https://github.com/prisma/prisma/issues/10710
  for (const entry of initialFoods) {
    await prisma.food.create({
      data: entry
    });
  }
};

seed();
