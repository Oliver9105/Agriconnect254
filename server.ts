import 'dotenv/config';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';

import listingsRouter from './src/api/listings.js';
import inventoryRouter from './src/api/inventory.js';
import transactionsRouter from './src/api/transactions.js';
import mpesaRouter from './src/api/mpesa.js';
import agriRouter from './src/api/agri.js';
import commsRouter from './src/api/comms.js';
import dashboardRouter from './src/api/dashboard.js';

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;

  app.use(cors());
  app.use(express.json());

  // API routes
  app.use('/api/v1/listings', listingsRouter);
  app.use('/api/v1/inventory', inventoryRouter);
  app.use('/api/v1/transactions', transactionsRouter);
  app.use('/api/v1/mpesa', mpesaRouter);
  app.use('/api/v1', agriRouter);
  app.use('/api/v1', commsRouter);
  app.use('/api/v1', dashboardRouter);

  // Vite / static
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => res.sendFile(path.join(distPath, 'index.html')));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AgriConnect running on http://localhost:${PORT}`);
  });
}

startServer();
