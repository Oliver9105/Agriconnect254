import { Router } from 'express';
import prisma from './db.js';

const router = Router();

// Batches
router.get('/batches', async (req, res) => {
  const batches = await prisma.batch.findMany({
    include: { history: { orderBy: { id: 'asc' } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(batches);
});

router.patch('/batches/:id', async (req, res) => {
  const batch = await prisma.batch.update({
    where: { id: req.params.id },
    data: req.body,
    include: { history: true }
  });
  res.json(batch);
});

// Notifications
router.get('/notifications', async (req, res) => {
  const notifications = await prisma.notification.findMany({
    orderBy: { createdAt: 'desc' }
  });
  res.json(notifications);
});

router.patch('/notifications/read-all', async (req, res) => {
  await prisma.notification.updateMany({ data: { read: true } });
  res.json({ status: 'ok' });
});

// Growth data
router.get('/growth', async (req, res) => {
  const [growthData, batchMomentum] = await Promise.all([
    prisma.growthData.findMany(),
    prisma.batchMomentum.findMany()
  ]);
  res.json({ growthData, batchMomentum });
});

export default router;
