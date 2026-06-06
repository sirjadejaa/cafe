const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  // Check if data already exists
  const categoryCount = await prisma.category.count();
  if (categoryCount > 0) {
    console.log('Database already seeded. Skipping seed.');
    return;
  }

  // Clear existing data
  await prisma.review.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  await prisma.table.deleteMany();

  // Create Admin
  const hashedAdminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.create({
    data: {
      email: 'admin@cafe.com',
      name: 'Admin User',
      password: hashedAdminPassword,
      role: 'ADMIN',
    },
  });

  // Create Standard User (Customer)
  const hashedCustomerPassword = await bcrypt.hash('user123', 10);
  const customer = await prisma.user.create({
    data: {
      email: 'user@cafe.com',
      name: 'Valued Customer',
      password: hashedCustomerPassword,
      role: 'USER',
    },
  });

  // Create Tables
  await prisma.table.createMany({
    data: [
      { number: 1, capacity: 2, location: 'INDOOR' },
      { number: 2, capacity: 2, location: 'INDOOR' },
      { number: 3, capacity: 4, location: 'INDOOR' },
      { number: 4, capacity: 4, location: 'INDOOR' },
      { number: 5, capacity: 6, location: 'INDOOR' },
      { number: 6, capacity: 2, location: 'OUTDOOR' },
      { number: 7, capacity: 4, location: 'OUTDOOR' },
      { number: 8, capacity: 6, location: 'OUTDOOR' },
    ],
  });
  console.log('Tables seeded successfully');

  // Create Categories
  const coffee = await prisma.category.create({ data: { name: 'Coffee', slug: 'coffee' } });
  const burgers = await prisma.category.create({ data: { name: 'Burgers', slug: 'burgers' } });
  const mainCourse = await prisma.category.create({ data: { name: 'Main Course', slug: 'main-course' } });
  const desserts = await prisma.category.create({ data: { name: 'Desserts', slug: 'desserts' } });

  // Create Menu Items
  await prisma.menuItem.createMany({
    data: [
      {
        name: 'Artisan Espresso',
        slug: 'artisan-espresso',
        description: 'Triple-shot of our signature dark roast beans with a velvety crema.',
        price: 4.5,
        categoryId: coffee.id,
        ingredients: ['Espresso beans', 'Purified water'],
        ratings: 4.9,
        images: ['https://images.unsplash.com/photo-151097252790b-af4f90dbf97d?auto=format&fit=crop&q=80&w=800'],
      },
      {
        name: 'Truffle Burger',
        slug: 'truffle-burger',
        description: 'Wagyu beef patty, black truffle aioli, aged gruyère, and brioche bun.',
        price: 18.0,
        categoryId: burgers.id,
        ingredients: ['Wagyu beef', 'Truffle aioli', 'Gruyere', 'Brioche'],
        ratings: 4.8,
        images: ['https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'],
      },
      {
        name: 'Gold Leaf Pasta',
        slug: 'gold-leaf-pasta',
        description: 'Hand-rolled pappardelle, saffron cream sauce, and 24k edible gold flakes.',
        price: 24.0,
        categoryId: mainCourse.id,
        ingredients: ['Pappardelle', 'Saffron', 'Cream', 'Gold flakes'],
        ratings: 5.0,
        images: ['https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800'],
      },
      {
        name: 'Dark Chocolate Lava',
        slug: 'dark-chocolate-lava',
        description: 'Warm 70% dark chocolate cake with a molten center and vanilla bean gelato.',
        price: 12.0,
        categoryId: desserts.id,
        ingredients: ['70% Dark chocolate', 'Butter', 'Eggs', 'Vanilla bean gelato'],
        ratings: 4.9,
        images: ['https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=800'],
      },
    ],
  });

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
