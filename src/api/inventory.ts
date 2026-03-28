import { Router } from 'express';
import prisma from './db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { q } = req.query as Record<string, string>;
  const items = await prisma.inventoryItem.findMany({
    where: q ? {
      OR: [
        { name: { contains: q } },
        { sku: { contains: q } },
        { category: { contains: q } },
      ]
    } : {},
    orderBy: { updatedAt: 'desc' }
  });
  res.json(items);
});

router.post('/', async (req, res) => {
  const item = await prisma.inventoryItem.create({ data: req.body });
  res.status(201).json(item);
});

router.patch('/:id', async (req, res) => {
  const item = await prisma.inventoryItem.update({
    where: { id: Number(req.params.id) },
    data: req.body
  });
  res.json(item);
});

router.delete('/:id', async (req, res) => {
  await prisma.inventoryItem.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
});

export default router;
