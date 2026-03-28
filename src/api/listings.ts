import { Router } from 'express';
import prisma from './db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { category, q } = req.query as Record<string, string>;
  const listings = await prisma.listing.findMany({
    where: {
      ...(category && category !== 'All' ? { category } : {}),
      ...(q ? {
        OR: [
          { title: { contains: q } },
          { seller: { contains: q } },
        ]
      } : {})
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(listings);
});

router.post('/', async (req, res) => {
  const listing = await prisma.listing.create({ data: req.body });
  res.status(201).json(listing);
});

export default router;
