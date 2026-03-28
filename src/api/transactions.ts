import { Router } from 'express';
import prisma from './db.js';

const router = Router();

router.get('/', async (req, res) => {
  const { type, status, q } = req.query as Record<string, string>;
  const transactions = await prisma.transaction.findMany({
    where: {
      ...(type && type !== 'All' ? { type } : {}),
      ...(status && status !== 'All' ? { status } : {}),
      ...(q ? {
        OR: [
          { id: { contains: q } },
          { farmer: { contains: q } },
          { type: { contains: q } },
        ]
      } : {})
    },
    orderBy: { createdAt: 'desc' }
  });
  res.json(transactions);
});

router.get('/status/:checkoutId', async (req, res) => {
  const txn = await prisma.transaction.findUnique({
    where: { checkoutId: req.params.checkoutId }
  });
  res.json(txn ?? { status: 'NOT_FOUND' });
});

export default router;
