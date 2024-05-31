// seeds/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const faker = require('faker');

async function main() {
  // Effacer le contenu de la base de données
  await prisma.comment.deleteMany();
  await prisma.article.deleteMany();
  await prisma.user.deleteMany();
  await prisma.category.deleteMany();

  // Créer les utilisateurs
  const authors = [];
  for (let i = 0; i < 10; i++) {
    const author = await prisma.user.create({
      data: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: 'AUTHOR',
      },
    });
    authors.push(author);
  }

  const admin = await prisma.user.create({
    data: {
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      role: 'ADMIN',
    },
  });

  // Créer les catégories
  const categories = [];
  for (let i = 0; i < 10; i++) {
    const category = await prisma.category.create({
      data: {
        name: faker.commerce.department(),
      },
    });
    categories.push(category);
  }

  // Créer les articles
  for (let i = 0; i < 100; i++) {
    const randomCategories = faker.random.arrayElements(categories, faker.datatype.number({ min: 1, max: 4 }));
    const article = await prisma.article.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        image: faker.image.imageUrl(),
        published: faker.datatype.boolean(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        author: {
          connect: { id: faker.random.arrayElement(authors).id },
        },
        categories: {
          connect: randomCategories.map(cat => ({ id: cat.id })),
        },
      },
    });

    // Créer les commentaires pour chaque article
    const commentCount = faker.datatype.number({ min: 0, max: 20 });
    for (let j = 0; j < commentCount; j++) {
      await prisma.comment.create({
        data: {
          email: faker.internet.email(),
          content: faker.lorem.sentence(),
          article: {
            connect: { id: article.id },
          },
        },
      });
    }
  }
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });