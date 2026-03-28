import { Router } from 'express';

const router = Router();

router.get('/predict/:batchId', (req, res) => {
  const { batchId } = req.params;
  const t = Math.random() * 10;
  const r = 0.3;
  const growthProbability = (1 / (1 + Math.E ** (-r * t))) * 100;

  res.json({
    batchId,
    crop: 'Hass Avocado',
    probability: growthProbability.toFixed(2),
    status: growthProbability > 75 ? 'Optimal' : 'Monitoring',
    graphData: Array.from({ length: 12 }, (_, i) => ({
      day: i,
      momentum: Math.min(100, growthProbability + (Math.random() * 10 - 5) + i * 2)
    })),
    matrix: [
      { label: 'Soil pH', value: '6.4', color: 'text-emerald-500' },
      { label: 'Moisture', value: '78%', color: 'text-blue-500' },
      { label: 'Nutrients', value: 'High', color: 'text-amber-500' }
    ]
  });
});

router.get('/verify/:certId', (req, res) => {
  res.json({
    certId: req.params.certId,
    status: 'VERIFIED',
    issuedAt: new Date().toISOString(),
    expiry: '2026-12-31',
    inspector: 'KEPHIS-NBO-042'
  });
});

export default router;
