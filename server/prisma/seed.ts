import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Limpar dados existentes
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Criar categorias
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Ursos' },
    }),
    prisma.category.create({
      data: { name: 'Coelhos' },
    }),
    prisma.category.create({
      data: { name: 'Unicórnios' },
    }),
    prisma.category.create({
      data: { name: 'Dinossauros' },
    }),
    prisma.category.create({
      data: { name: 'Gatos' },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // Criar produtos
  const products = await Promise.all([
    // Ursos
    prisma.product.create({
      data: {
        name: 'Urso Ted',
        price: 45.99,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[0].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Urso Panda',
        price: 52.99,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[0].id,
      },
    }),
    // Coelhos
    prisma.product.create({
      data: {
        name: 'Coelho Saltitante',
        price: 38.99,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[1].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Coelho Fofinho',
        price: 42.50,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[1].id,
      },
    }),
    // Unicórnios
    prisma.product.create({
      data: {
        name: 'Unicórnio Arco-íris',
        price: 55.00,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[2].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Unicórnio Estrela',
        price: 58.99,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[2].id,
      },
    }),
    // Dinossauros
    prisma.product.create({
      data: {
        name: 'T-Rex Verde',
        price: 48.50,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[3].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Triceratops Azul',
        price: 46.99,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[3].id,
      },
    }),
    // Gatos
    prisma.product.create({
      data: {
        name: 'Gatinho Fofo',
        price: 39.99,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[4].id,
      },
    }),
    prisma.product.create({
      data: {
        name: 'Gato Persa',
        price: 44.50,
        imageUrl: '/placeholder.svg?height=300&width=300',
        categoryId: categories[4].id,
      },
    }),
  ]);

  console.log(`✅ Created ${products.length} products`);
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
