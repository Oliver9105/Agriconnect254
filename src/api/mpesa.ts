import { Router } from 'express';
import axios from 'axios';
import prisma from './db.js';

const router = Router();

const DARAJA_BASE = process.env.NODE_ENV === 'production'
  ? 'https://api.safaricom.co.ke'
  : 'https://sandbox.safaricom.co.ke';

// Initiate STK Push purchase
router.post('/purchase/initiate', async (req, res) => {
  const { itemId, phoneNumber, amount, farmer } = req.body;

  // Read credentials at request time so dotenv has already loaded
  const consumerKey = process.env.MPESA_CONSUMER_KEY;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
  const shortcode = process.env.MPESA_SHORTCODE;
  const passkey = process.env.MPESA_PASSKEY;
  const callbackUrl = process.env.MPESA_CALLBACK_URL;

  // No credentials or placeholder callback — use mock mode for dev/testing
  if (!consumerKey || !consumerSecret || !shortcode || !passkey || !callbackUrl || callbackUrl.includes('your-ngrok-url')) {
    const checkoutId = `ws_CO_${Date.now()}`;
    await prisma.transaction.create({
      data: {
        type: 'Market Sale',
        amountKes: amount ?? 0,
        method: 'M-Pesa',
        status: 'Pending',
        farmer: farmer ?? 'Unknown',
        batchId: String(itemId),
        checkoutId
      }
    });
    return res.json({ CheckoutRequestID: checkoutId, ResponseCode: '0', status: 'PENDING' });
  }

  try {
    const creds = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const tokenRes = await axios.get(
      `${DARAJA_BASE}/oauth/v1/generate?grant_type=client_credentials`,
      { headers: { Authorization: `Basic ${creds}` } }
    );
    const token = tokenRes.data.access_token;

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').slice(0, 14);
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');

    const { data } = await axios.post(
      `${DARAJA_BASE}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: shortcode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: amount,
        PartyA: phoneNumber,
        PartyB: shortcode,
        PhoneNumber: phoneNumber,
        CallBackURL: callbackUrl,
        AccountReference: String(itemId),
        TransactionDesc: 'AgriConnect Purchase'
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    await prisma.transaction.create({
      data: {
        type: 'Market Sale',
        amountKes: amount,
        method: 'M-Pesa',
        status: 'Pending',
        farmer: farmer ?? 'Unknown',
        batchId: String(itemId),
        checkoutId: data.CheckoutRequestID
      }
    });

    res.json({ CheckoutRequestID: data.CheckoutRequestID, ResponseCode: data.ResponseCode, status: 'PENDING' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// M-Pesa callback from Daraja
router.post('/callback', async (req, res) => {
  const callback = req.body?.Body?.stkCallback;
  if (!callback) return res.json({ status: 'ok' });

  const { CheckoutRequestID, ResultCode } = callback;
  await prisma.transaction.updateMany({
    where: { checkoutId: CheckoutRequestID },
    data: { status: ResultCode === 0 ? 'Completed' : 'Failed' }
  });
  res.json({ status: 'ok' });
});

// Escrow lock
router.post('/escrow/lock', async (req, res) => {
  const { amount, phoneNumber, batchId, farmer } = req.body;
  const checkoutId = `ESC_LOCK_${Date.now()}`;

  await prisma.transaction.create({
    data: {
      type: 'Escrow Lock',
      amountKes: amount,
      method: 'M-Pesa',
      status: 'Pending',
      farmer: farmer ?? 'Unknown',
      batchId,
      checkoutId
    }
  });

  res.json({
    CheckoutRequestID: checkoutId,
    ResponseCode: '0',
    CustomerMessage: 'Escrow lock initiated',
    status: 'PENDING'
  });
});

// Escrow release
router.post('/escrow/release', async (req, res) => {
  const { batchId, farmer } = req.body;

  const txn = await prisma.transaction.create({
    data: {
      type: 'Escrow Release',
      amountKes: 0,
      method: 'M-Pesa',
      status: 'Completed',
      farmer: farmer ?? 'Unknown',
      batchId
    }
  });

  res.json({ ConversationID: txn.id, ResponseCode: '0', status: 'RELEASED' });
});

// Poll transaction status
router.get('/status/:checkoutId', async (req, res) => {
  const txn = await prisma.transaction.findUnique({
    where: { checkoutId: req.params.checkoutId }
  });
  res.json(txn ?? { status: 'NOT_FOUND' });
});

export default router;
