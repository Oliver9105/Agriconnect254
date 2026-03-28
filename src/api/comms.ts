import { Router } from 'express';
import prisma from './db.js';

const router = Router();

// Feedback
router.post('/feedback', async (req, res) => {
  const { type, comment, userEmail } = req.body;
  const feedback = await prisma.feedback.create({ data: { type, comment, userEmail } });
  res.status(201).json({ status: 'success', feedback });
});

// Messages
router.get('/messages/:chatId', async (req, res) => {
  const messages = await prisma.message.findMany({
    where: { chatId: req.params.chatId },
    orderBy: { createdAt: 'asc' }
  });
  res.json(messages);
});

router.post('/messages', async (req, res) => {
  const { chatId, text, sender } = req.body;
  const message = await prisma.message.create({ data: { chatId, text, sender } });
  res.status(201).json(message);
});

export default router;
