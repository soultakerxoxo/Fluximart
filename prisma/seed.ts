import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

async function run() {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@example.com'
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const adminSecret = process.env.ADMIN_SECRET_CODE || '00000'
  const passwordHash = await bcrypt.hash(adminPassword, 10)

  // Upsert admin user
  await prisma.user.upsert({
    where: { email: adminEmail },
    create: { email: adminEmail, passwordHash, role: 'ADMIN', name: 'Admin' },
    update: { role: 'ADMIN' },
  })
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } })
  if (admin) {
    await prisma.paymentSettings.upsert({
      where: { userId: admin.id },
      create: {
        userId: admin.id,
        paypalEmail: 'you@paypal.com',
        payoutPhone: process.env.ADMIN_PHONE || '+10000000000',
      },
      update: {},
    })
  }

  // Create customer
  await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    create: { email: 'customer@example.com', passwordHash: await bcrypt.hash('customer123', 10), role: 'CUSTOMER', name: 'Customer' },
    update: {},
  })

  // Seed 12 marketplace images
  for (let i = 0; i < 12; i++) {
    await prisma.image.upsert({
      where: { id: `seed-${i}` },
      create: {
        id: `seed-${i}`,
        title: `Trending Image ${i + 1}`,
        description: 'AI-generated visual aligned to current web trends.',
        tags: 'trending,ai,snapstockx',
        category: 'trending',
        priceCents: 990,
        licenseTier: 'standard',
        previewUrl: `https://picsum.photos/seed/market-${i}/600/400`,
        fullresUrl: `https://picsum.photos/seed/market-${i}/1200/800`,
      },
      update: {},
    })
  }

  // Seed a daily batch log
  await prisma.aIGenerationLog.create({
    data: {
      batchDate: new Date(),
      countGenerated: 15,
      status: 'success',
      notes: 'Seeded batch for demo',
    },
  })
}

run()
  .then(() => {
    console.log('Seed completed')
    process.exit(0)
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
