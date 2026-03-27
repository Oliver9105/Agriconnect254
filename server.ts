import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import cors from 'cors';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // AgriConnect API v1
  
  // 1. NeuralAgri Prediction Engine
  // Uses Euler's number (e) for growth probability modeling
  app.get('/api/v1/predict/:batchId', (req, res) => {
    const { batchId } = req.params;
    
    // Mocking the Euler-based growth math
    // P(t) = K / (1 + ((K - P0) / P0) * e^(-rt))
    const t = Math.random() * 10; // time factor
    const r = 0.3; // growth rate
    const e = Math.E;
    const growthProbability = (1 / (1 + e ** (-r * t))) * 100;

    const graphData = Array.from({ length: 7 }, (_, i) => ({
      day: `Day ${i + 1}`,
      momentum: Math.min(100, growthProbability + (Math.random() * 10 - 5) + i * 5),
      target: 85
    }));

    res.json({
      batchId,
      crop: "Hass Avocado",
      probability: growthProbability.toFixed(2),
      status: growthProbability > 75 ? "Optimal" : "Monitoring",
      graphData,
      matrix: [
        { label: "Soil NPK", value: "High", color: "text-emerald-400" },
        { label: "GDD Index", value: "240.5", color: "text-amber-400" },
        { label: "ICPAC Forecast", value: "Light Rain", color: "text-blue-400" }
      ]
    });
  });

  // 2. KEPHIS Verification
  app.get('/api/v1/verify/:certId', (req, res) => {
    res.json({
      certId: req.params.certId,
      status: "VERIFIED",
      issuedAt: new Date().toISOString(),
      expiry: "2026-12-31",
      inspector: "KEPHIS-NBO-042"
    });
  });

  // 3. M-Pesa Escrow Lock (C2B STK Push)
  app.post('/api/v1/escrow/lock', (req, res) => {
    const { amount, phoneNumber, batchId } = req.body;
    // Mocking Daraja STK Push response
    res.json({
      MerchantRequestID: "29115-34620-1",
      CheckoutRequestID: "ws_CO_191220191020363925",
      ResponseCode: "0",
      ResponseDescription: "Success. Request accepted for processing",
      CustomerMessage: "Success. Request accepted for processing",
      status: "PENDING_USER_INPUT"
    });
  });

  // 4. M-Pesa Escrow Release (B2C)
  app.post('/api/v1/escrow/release', (req, res) => {
    const { batchId, farmerId } = req.body;
    res.json({
      ConversationID: "AG_20260320_000045b678",
      OriginatorConversationID: "AG_20260320_000045b678",
      ResponseCode: "0",
      ResponseDescription: "Accept the service request successfully.",
      status: "RELEASED"
    });
  });

  // 5. M-Pesa Purchase Flow
  const transactionStore = new Map<string, { status: string, itemId: string }>();

  app.post('/api/v1/purchase/initiate', (req, res) => {
    const { itemId, phoneNumber } = req.body;
    const checkoutRequestId = `ws_CO_${Date.now()}`;
    
    transactionStore.set(checkoutRequestId, { status: 'PENDING', itemId });
    
    // Mocking Daraja STK Push initiation
    console.log(`Initiating STK Push for ${phoneNumber} for item ${itemId}`);
    
    res.json({
      CheckoutRequestID: checkoutRequestId,
      ResponseCode: "0",
      CustomerMessage: "Success. Request accepted for processing",
      status: "PENDING"
    });
  });

  app.post('/api/v1/mpesa/callback', (req, res) => {
    const { Body } = req.body;
    const checkoutRequestId = Body.stkCallback.CheckoutRequestID;
    const resultCode = Body.stkCallback.ResultCode;
    
    if (transactionStore.has(checkoutRequestId)) {
      transactionStore.set(checkoutRequestId, { 
        ...transactionStore.get(checkoutRequestId)!, 
        status: resultCode === 0 ? 'SUCCESS' : 'FAILED' 
      });
    }
    
    res.json({ status: "success" });
  });

  app.get('/api/v1/purchase/status/:checkoutRequestId', (req, res) => {
    const { checkoutRequestId } = req.params;
    const transaction = transactionStore.get(checkoutRequestId);
    res.json(transaction || { status: 'NOT_FOUND' });
  });

  // 6. User Feedback System
  const feedbackStore: any[] = [];
  app.post('/api/v1/feedback', (req, res) => {
    const { type, comment, userEmail } = req.body;
    const newFeedback = {
      id: Date.now(),
      type,
      comment,
      userEmail,
      timestamp: new Date().toISOString()
    };
    feedbackStore.push(newFeedback);
    console.log('New feedback received:', newFeedback);
    res.status(201).json({ status: "success", message: "Feedback received", feedback: newFeedback });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AgriConnect Server running on http://localhost:${PORT}`);
  });
}

startServer();
